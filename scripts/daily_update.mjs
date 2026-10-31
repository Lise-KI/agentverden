#!/usr/bin/env node
// Deterministisk daglig oppdatering av agentverden.no.
// LLM-en (nettmannen) skal BARE finne saker og skrive dem til en JSON-fil.
// Alt mekanisk (innsetting, isNew-opprydding, trending-rotasjon, logg, build,
// commit og trygg fast-forward-push) gjøres her, uten å skrive om eksisterende saker.
//
// Bruk:  node scripts/daily_update.mjs <nye-saker.json> [--dry-run]
//        node scripts/daily_update.mjs --none [--dry-run]   (ingen nye saker, bare rotasjon)
// JSON-fila: en liste med objekter: id, title, description, agents, category,
// source, sourceDate, sourceUrl, whatTheyDid, howItWent, worthKnowing,
// valgfritt promptTemplate og curatedFromListingUrl.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";

const REPO = "/Users/liseai/projects/agentbruk";
const WT = "/tmp/agentbruk-daily";
const UC = "src/data/useCases.ts";
const LOG = "daily-update/log.json";
const PENDING = "daily-update/pending-review.json";
const START = "export const useCases: UseCase[] = ";
const RISK = /aksje|krypto|coin|invest|trading|handel|børs|forsikring|skatt|avgift|lege|helse|medisin|juridisk|advokat|ukrevd/i;
const NEW_DAYS = 5, TREND_GAP_DAYS = 5, TREND_COUNT = 2;

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const input = args.find((a) => !a.startsWith("--"));
if (!input && !args.includes("--none")) {
  console.error("Bruk: node scripts/daily_update.mjs <nye-saker.json>|--none [--dry-run]");
  process.exit(2);
}
const report = { ok: false, dryRun: DRY, added: [], pendingReview: [], rejected: [], isNewCleared: [], trendingSelected: [], trendingReplaced: [], commit: null, notes: [] };
const die = (msg) => { report.error = msg; console.log(JSON.stringify(report, null, 2)); console.log(`STATUS: FEILET – ${msg}`); process.exit(1); };
const sh = (cmd, a, opts = {}) => execFileSync(cmd, a, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 64 << 20, ...opts });
const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Oslo" });
const daysBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

// --- les nye saker før vi rører git ---
let incoming = [];
if (input) {
  try { incoming = JSON.parse(fs.readFileSync(input, "utf8")); } catch (e) { die(`kan ikke lese ${input}: ${e.message}`); }
  if (incoming && !Array.isArray(incoming)) incoming = incoming.cases || incoming.useCases || [];
  if (!Array.isArray(incoming)) die("JSON-fila må være en liste med saker");
}

// --- fersk worktree fra origin/main ---
try {
  sh("git", ["-C", REPO, "fetch", "-q", "origin"]);
  try { sh("git", ["-C", REPO, "worktree", "remove", "--force", WT]); } catch {}
  sh("git", ["-C", REPO, "worktree", "prune"]);
  fs.rmSync(WT, { recursive: true, force: true });
  sh("git", ["-C", REPO, "worktree", "add", "-q", "--detach", WT, "origin/main"]);
} catch (e) { die(`git worktree: ${e.stderr || e.message}`); }
const cleanup = () => { try { sh("git", ["-C", REPO, "worktree", "remove", "--force", WT]); sh("git", ["-C", REPO, "worktree", "prune"]); } catch {} };
const fail = (msg) => { cleanup(); die(msg); };
const P = (f) => path.join(WT, f);

// --- parse useCases.ts uten å endre prefiks/suffiks ---
function splitUseCases(src) {
  const i = src.indexOf(START);
  if (i < 0) throw new Error("fant ikke 'export const useCases'");
  const a = i + START.length;
  const m = /\n\];?\n/.exec(src.slice(a));
  if (!m) throw new Error("fant ikke slutten av useCases-arrayet");
  const b = a + m.index + 2; // etter ']'
  const arr = vm.runInNewContext(`(${src.slice(a, b)})`, {}, { timeout: 2000 });
  if (!Array.isArray(arr)) throw new Error("useCases er ikke et array");
  return { head: src.slice(0, a), tail: src.slice(b), arr };
}
const src = fs.readFileSync(P(UC), "utf8");
let parsed;
try { parsed = splitUseCases(src); } catch (e) { fail(`parse ${UC}: ${e.message}`); }
const before = parsed.arr;
const beforeIds = before.map((u) => u.id);
const articlesSrc = fs.readFileSync(P("src/data/articles.ts"), "utf8");
const hasArticle = (id) => articlesSrc.includes(`"${id}"`) || new RegExp(`^\\s*["']?${id.replace(/-/g, "\\-")}["']?\\s*:`, "m").test(articlesSrc);
const hasPage = (u) => Boolean(hasArticle(u.id) || u.whatTheyDid);
const risky = (u) => u.category === "penger-regninger" || RISK.test(`${u.title} ${u.description}`);
const agentSlugs = new Set([...fs.readFileSync(P("src/data/agents.ts"), "utf8").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]));
const catSlugs = new Set([...fs.readFileSync(P("src/data/categories.ts"), "utf8").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]));
const log = JSON.parse(fs.readFileSync(P(LOG), "utf8"));
log.runs = log.runs || [];
const pending = fs.existsSync(P(PENDING)) ? JSON.parse(fs.readFileSync(P(PENDING), "utf8")) : [];

// --- valider nye saker ---
const norm = (s) => String(s || "").trim().toLowerCase().replace(/\/+$/, "");
const knownIds = new Set([...beforeIds, ...pending.map((p) => p.id), ...log.runs.flatMap((r) => (r.addedUseCases || []).map((x) => x.id))]);
const knownTitles = new Set(before.map((u) => norm(u.title)));
const knownUrls = new Set([...before.map((u) => norm(u.sourceUrl)), ...pending.map((p) => norm(p.sourceUrl))].filter(Boolean));
const TEXT = { title: 10, description: 60, whatTheyDid: 80, howItWent: 40, worthKnowing: 40, source: 2, sourceDate: 4 };
const accepted = [];
for (const raw of incoming) {
  const c = { ...raw };
  const why = [];
  c.id = String(c.id || "").trim();
  if (!/^[a-z0-9]+(-[a-z0-9]+)+$/.test(c.id)) why.push("id må være kebab-case");
  if (knownIds.has(c.id) || accepted.some((x) => x.id === c.id)) why.push("id finnes fra før");
  if (knownTitles.has(norm(c.title))) why.push("tittel finnes fra før");
  for (const [k, n] of Object.entries(TEXT)) if (typeof c[k] !== "string" || c[k].trim().length < n) why.push(`${k} mangler/for kort`);
  let url;
  try { url = new URL(c.sourceUrl); } catch { why.push("sourceUrl er ikke en gyldig URL"); }
  if (url && !/^https?:$/.test(url.protocol)) why.push("sourceUrl må være http(s)");
  if (url && /(^|\.)agentusecases\.ai$/.test(url.hostname)) why.push("sourceUrl må være primærkilden, ikke agentusecases.ai");
  if (url && knownUrls.has(norm(c.sourceUrl))) why.push("kilden er brukt fra før");
  if (JSON.stringify(c).includes("'https'")) why.push("ødelagt lenke ('https')");
  if (!catSlugs.has(c.category)) why.push(`ukjent kategori '${c.category}'`);
  const agents = (Array.isArray(c.agents) ? c.agents : []).filter((a) => agentSlugs.has(a));
  if (why.length) { report.rejected.push({ id: c.id || null, title: c.title || null, why }); continue; }
  const uc = {
    id: c.id, title: c.title.trim(), description: c.description.trim(),
    agents: agents.length ? agents : ["egen-agent"], category: c.category,
    source: c.source.trim(), sourceDate: c.sourceDate.trim(), sourceUrl: c.sourceUrl.trim(),
    sourceChecked: true, isNew: true, dateAdded: today, votes: 0,
    curatedFrom: (c.curatedFrom || "agentusecases.ai").trim(),
    whatTheyDid: c.whatTheyDid.trim(), howItWent: c.howItWent.trim(), worthKnowing: c.worthKnowing.trim(),
    ...(typeof c.promptTemplate === "string" && c.promptTemplate.trim() ? { promptTemplate: c.promptTemplate.trim() } : {}),
  };
  const meta = { id: uc.id, title: uc.title, category: uc.category, sourcePrimaryUrl: uc.sourceUrl, curatedFromListingUrl: c.curatedFromListingUrl || null };
  if (risky(uc)) {
    // Regel 9: skatt/økonomi/jus/forsikring/helse publiseres ikke automatisk.
    pending.push({ ...uc, isNew: undefined, queuedAt: today, curatedFromListingUrl: meta.curatedFromListingUrl });
    report.pendingReview.push(meta);
  } else { accepted.push(uc); report.added.push(meta); }
  knownIds.add(uc.id); knownTitles.add(norm(uc.title)); knownUrls.add(norm(uc.sourceUrl));
}

// --- endringer: nye først, isNew-opprydding, trending-rotasjon ---
const after = [...accepted, ...before.map((u) => ({ ...u }))];
for (const u of after) {
  if (u.isNew && u.dateAdded && daysBetween(u.dateAdded, today) > NEW_DAYS) { u.isNew = false; report.isNewCleared.push(u.id); }
}
const recent = new Set(log.runs.filter((r) => r.date && daysBetween(String(r.date).slice(0, 10), today) < TREND_GAP_DAYS).flatMap((r) => r.trendingSelected || []));
const current = after.filter((u) => u.trending).map((u) => u.id);
const eligible = after.filter((u) => hasPage(u) && !risky(u));
let pool = eligible.filter((u) => !recent.has(u.id) && !current.includes(u.id));
if (pool.length < TREND_COUNT) { pool = eligible.filter((u) => !current.includes(u.id)); report.notes.push("for få saker utenfor 5-dagers-vinduet; trakk blant alle med egen side"); }
const picks = [];
while (picks.length < TREND_COUNT && pool.length) picks.push(pool.splice(crypto.randomInt(pool.length), 1)[0].id);
for (const u of after) {
  if (picks.includes(u.id)) u.trending = true;
  else if ("trending" in u) u.trending = false;
}
report.trendingSelected = picks;
report.trendingReplaced = current.filter((id) => !picks.includes(id));

// --- skriv og verifiser at ingenting forsvant eller ble endret utilsiktet ---
const body = JSON.stringify(after, null, 2);
fs.writeFileSync(P(UC), parsed.head + body + parsed.tail);
let check;
try { check = splitUseCases(fs.readFileSync(P(UC), "utf8")).arr; } catch (e) { fail(`verifisering: ${e.message}`); }
const strip = (u) => { const { isNew, trending, ...rest } = u; return JSON.stringify(rest); };
const byId = new Map(check.map((u) => [u.id, u]));
const lost = beforeIds.filter((id) => !byId.has(id));
const changed = before.filter((u) => byId.has(u.id) && strip(byId.get(u.id)) !== strip(u)).map((u) => u.id);
if (lost.length || changed.length || check.length !== before.length + accepted.length || new Set(check.map((u) => u.id)).size !== check.length)
  fail(`verifisering feilet: tapt=${lost.join(",")} endret=${changed.join(",")} antall=${check.length}`);
report.counts = { before: before.length, after: check.length };

log.runs.push({
  date: today, addedUseCases: report.added, pendingReview: report.pendingReview, rejected: report.rejected,
  changesOther: `isNew-opprydding: ${report.isNewCleared.length} saker. Trending rotert.`,
  trendingSelected: picks, trendingReplaced: report.trendingReplaced,
  selfApprovalChecks: Object.fromEntries(report.added.map((a) => [a.id, { duplicateCheck: "pass", sourceUrlCheck: "pass", fieldsCheck: "pass" }])),
  gitCommit: null, emailedReportTo: "andreassf1@gmail.com", by: "scripts/daily_update.mjs",
});
fs.writeFileSync(P(LOG), JSON.stringify(log, null, 2) + "\n");
if (report.pendingReview.length) fs.writeFileSync(P(PENDING), JSON.stringify(pending, null, 2) + "\n");

// --- build og sjekk de nye sidene ---
try {
  // APFS-klon (cp -c) går raskt; Turbopack godtar ikke symlink ut av prosjektet.
  if (!fs.existsSync(P("node_modules"))) sh("cp", ["-cR", path.join(REPO, "node_modules"), P("node_modules")]);
  sh("npm", ["run", "build"], { cwd: WT });
} catch (e) { fail(`build feilet: ${String(e.stdout || "").slice(-1500)}${String(e.stderr || "").slice(-1500)}`); }
for (const a of report.added) {
  const f = P(`out/bruk/${a.id}/index.html`);
  if (!fs.existsSync(f)) fail(`mangler side out/bruk/${a.id}/index.html etter build`);
}
report.newPages = report.added.map((a) => `https://agentverden.no/bruk/${a.id}/`);

// --- commit og trygg push ---
const files = [UC, LOG, ...(report.pendingReview.length ? [PENDING] : [])];
if (DRY) {
  report.diffStat = sh("git", ["-C", WT, "diff", "--stat"]).trim();
  report.ok = true; cleanup();
  console.log(JSON.stringify(report, null, 2));
  console.log("STATUS: DRY-RUN OK – ingenting committet eller pushet");
  process.exit(0);
}
try {
  sh("git", ["-C", WT, "add", "--", ...files]);
  const msg = `Daglig oppdatering ${today}: ${report.added.length} nye saker` +
    (report.added.length ? ` (${report.added.map((a) => a.title).join("; ")})` : "") +
    `, trending: ${picks.join(", ")}` + (report.pendingReview.length ? `, ${report.pendingReview.length} venter på gjennomgang` : "");
  sh("git", ["-C", WT, "commit", "-q", "-m", msg]);
  sh("git", ["-C", WT, "fetch", "-q", "origin", "main"]);
  try { sh("git", ["-C", WT, "merge-base", "--is-ancestor", "origin/main", "HEAD"]); }
  catch { fail("origin/main har endret seg under kjøringen – ikke fast-forward, pushet IKKE"); }
  report.push = sh("git", ["-C", WT, "push", "origin", "HEAD:main"]).trim() || "ok";
  report.commit = sh("git", ["-C", WT, "rev-parse", "--short", "HEAD"]).trim();
} catch (e) { fail(`commit/push: ${e.stderr || e.message}`); }
cleanup();
try { sh("git", ["-C", REPO, "fetch", "-q", "origin"]); } catch {}
report.ok = true;
console.log(JSON.stringify(report, null, 2));
console.log(`STATUS: LYKTES – ${report.added.length} nye saker, ${report.pendingReview.length} til gjennomgang, ${report.rejected.length} avvist, commit ${report.commit}`);
