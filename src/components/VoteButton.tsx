"use client";

import { useEffect, useState } from "react";

// Ekte stemmer lagret hos Cloudflare (se worker/index.ts). Hver nettleser kan
// stemme én gang per oppføring; trykker du igjen, trekkes stemmen tilbake.
// Svarer ikke API-et (f.eks. før databasen er koblet til), vises ingen knapp.
let allVotes: Promise<Record<string, number> | null> | null = null;
function loadVotes() {
  if (!allVotes) {
    allVotes = fetch("/api/votes", { cache: "no-store" })
      .then((r) =>
        r.ok && (r.headers.get("content-type") ?? "").includes("json")
          ? r.json()
          : null,
      )
      .catch(() => null);
  }
  return allVotes;
}

const key = (id: string) => `av_vote_${id}`;

function readVoted(id: string) {
  try {
    return localStorage.getItem(key(id)) === "1";
  } catch {
    return false; // lagring utilgjengelig: knappen virker fortsatt
  }
}

export default function VoteButton({ id }: { id: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    loadVotes().then((v) => {
      if (!alive || !v) return;
      setCount(v[id] ?? 0);
      setVoted(readVoted(id));
    });
    return () => {
      alive = false;
    };
  }, [id]);

  async function toggle() {
    if (busy) return;
    const delta = voted ? -1 : 1;
    setBusy(true);
    setVoted(!voted);
    setCount((c) => Math.max(0, (c ?? 0) + delta));
    try {
      const r = await fetch("/api/vote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, delta }),
      });
      if (!r.ok) throw new Error(String(r.status));
      const data = (await r.json()) as { n: number };
      setCount(data.n);
      try {
        localStorage.setItem(key(id), delta === 1 ? "1" : "0");
      } catch {
        /* ignorer */
      }
    } catch {
      // Tilbakestill hvis lagringen feilet.
      setVoted(voted);
      setCount((c) => Math.max(0, (c ?? 0) - delta));
    } finally {
      setBusy(false);
    }
  }

  if (count === null) return <div className="w-10" aria-hidden="true" />;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={voted}
      aria-label={voted ? "Fjern stemmen din" : "Stem opp denne"}
      title={voted ? "Fjern stemmen din" : "Stem opp"}
      className={`relative z-10 flex flex-col items-center w-10 rounded-lg py-1 transition-colors ${
        voted
          ? "bg-brand text-[var(--on-brand)]"
          : "text-brand hover:bg-neutral-100"
      }`}
    >
      <span className="text-sm leading-none">▲</span>
      <span
        className={`text-sm font-semibold mt-0.5 ${voted ? "" : "text-neutral-800"}`}
      >
        {count}
      </span>
    </button>
  );
}
