"use client";

import { useEffect, useState } from "react";
import type { UseCase } from "@/data/useCases";
import UseCaseGrid from "@/components/UseCaseGrid";
import { loadVotes } from "@/components/VoteButton";

// «Trender i dag» viser de to sakene med flest stemmer akkurat nå.
// Siden er statisk, så første visning (og visning uten stemme-API) er de to
// håndplukkede sakene (trending: true). Når stemmene er hentet, byttes de ut
// med de to mest stemte. Likt antall stemmer: håndplukket først, så nyeste.
export default function TrendingGrid({
  candidates,
  fallbackIds,
  listClassName,
}: {
  candidates: UseCase[];
  fallbackIds: string[];
  listClassName?: string;
}) {
  const [votes, setVotes] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    let alive = true;
    loadVotes().then((v) => alive && setVotes(v));
    return () => {
      alive = false;
    };
  }, []);

  const byId = new Map(candidates.map((u) => [u.id, u]));
  let items = fallbackIds
    .map((id) => byId.get(id))
    .filter((u): u is UseCase => Boolean(u));

  if (votes && Object.values(votes).some((n) => n > 0)) {
    items = [...candidates]
      .sort(
        (a, b) =>
          (votes[b.id] ?? 0) - (votes[a.id] ?? 0) ||
          Number(fallbackIds.includes(b.id)) - Number(fallbackIds.includes(a.id)) ||
          (b.dateAdded ?? "").localeCompare(a.dateAdded ?? ""),
      )
      .slice(0, 2);
  }

  return <UseCaseGrid items={items} listClassName={listClassName} />;
}
