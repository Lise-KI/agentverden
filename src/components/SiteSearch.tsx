"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCases, hasPage } from "@/data/useCases";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";

function agentName(slug: string) {
  return agents.find((a) => a.slug === slug)?.name ?? slug;
}

function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

// Enkelt klient-søk mot alle use cases som faktisk har en egen side.
// Ingen backend nødvendig — nettsiden bygges statisk, så dataene ligger
// allerede i nettleseren.
export default function SiteSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();
  const results =
    trimmed.length >= 2
      ? useCases
          .filter(hasPage)
          .filter((u) => {
            const haystack = [
              u.title,
              u.description,
              ...u.agents.map(agentName),
              categoryName(u.category),
            ]
              .join(" ")
              .toLowerCase();
            return haystack.includes(trimmed);
          })
          .slice(0, 8)
      : [];

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Søk i alle use cases …"
        aria-label="Søk i alle use cases"
        className="w-full rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand"
      />
      {open && trimmed.length >= 2 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 glass rounded-xl p-2 max-h-96 overflow-y-auto shadow-lg bg-white">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-neutral-500">
              Ingen treff for «{query.trim()}»
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((u) => (
                <li key={u.id}>
                  <Link
                    href={`/bruk/${u.id}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="block rounded-lg px-3 py-2 hover:bg-neutral-100"
                  >
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {u.title}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {u.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
