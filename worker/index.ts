// Cloudflare Worker foran de statiske filene. Håndterer bare stemme-API-et
// (/api/*); alt annet sendes videre til de statiske filene i ./out.
// Stemmene lagres i D1 (tabell votes: id, n). Ingen personopplysninger lagres.

interface D1Result<T> {
  results: T[];
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T>(): Promise<D1Result<T>>;
  first<T>(): Promise<T | null>;
  run(): Promise<unknown>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface Env {
  ASSETS: { fetch(input: Request | string): Promise<Response> };
  DB: D1Database;
}

const ID_RE = /^[a-z0-9-]{3,80}$/;
let tableReady = false;

async function ensureTable(db: D1Database) {
  if (tableReady) return;
  await db
    .prepare(
      "CREATE TABLE IF NOT EXISTS votes (id TEXT PRIMARY KEY, n INTEGER NOT NULL DEFAULT 0)",
    )
    .run();
  tableReady = true;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

// Godta bare stemmer fra egne sider (enkel beskyttelse mot misbruk fra andre nettsteder).
function sameOrigin(req: Request, url: URL) {
  const origin = req.headers.get("origin");
  return !origin || origin === url.origin;
}

const worker = {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/api/votes" && req.method === "GET") {
      await ensureTable(env.DB);
      const { results } = await env.DB
        .prepare("SELECT id, n FROM votes")
        .all<{ id: string; n: number }>();
      return json(Object.fromEntries(results.map((r) => [r.id, r.n])));
    }

    if (url.pathname === "/api/vote" && req.method === "POST") {
      if (!sameOrigin(req, url)) return json({ error: "forbidden" }, 403);
      let body: { id?: unknown; delta?: unknown };
      try {
        body = await req.json();
      } catch {
        return json({ error: "bad request" }, 400);
      }
      const id = typeof body.id === "string" ? body.id : "";
      const delta = body.delta === -1 ? -1 : body.delta === 1 ? 1 : 0;
      if (!ID_RE.test(id) || delta === 0) return json({ error: "bad request" }, 400);

      // Bare oppføringer som faktisk har en side kan få stemmer.
      const page = await env.ASSETS.fetch(new URL(`/bruk/${id}/`, url).toString());
      if (page.status !== 200) return json({ error: "not found" }, 404);

      await ensureTable(env.DB);
      const row = await env.DB
        .prepare(
          "INSERT INTO votes (id, n) VALUES (?1, MAX(?2, 0)) ON CONFLICT(id) DO UPDATE SET n = MAX(0, n + ?2) RETURNING n",
        )
        .bind(id, delta)
        .first<{ n: number }>();
      return json({ id, n: row?.n ?? 0 });
    }

    if (url.pathname.startsWith("/api/")) return json({ error: "not found" }, 404);

    return env.ASSETS.fetch(req);
  },
};

export default worker;
