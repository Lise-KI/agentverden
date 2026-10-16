"use client";

import { UseCase } from "@/data/useCases";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";

function agentName(slug: string) {
  return agents.find((a) => a.slug === slug)?.name ?? slug;
}

function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export default function UseCaseCard({
  item,
  onOpen,
}: {
  item: UseCase;
  onOpen?: (id: string) => void;
}) {
  const clickable = typeof onOpen === "function";

  return (
    <article
      className={`glass glass-hover rounded-xl p-4 flex gap-3 ${
        clickable ? "cursor-pointer" : ""
      }`}
      onClick={clickable ? () => onOpen!(item.id) : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen!(item.id);
              }
            }
          : undefined
      }
    >
      <div className="flex flex-col items-center shrink-0 w-10 pt-0.5 text-violet-300">
        <span className="text-sm leading-none">▲</span>
        <span className="text-sm font-semibold text-neutral-200 mt-0.5">
          {item.votes}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
            {categoryName(item.category)}
          </span>
          {item.isNew && (
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 rounded px-1.5 py-0.5">
              Ny
            </span>
          )}
        </div>
        <h3 className="font-semibold text-base leading-snug text-neutral-50 mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-neutral-400 mb-3">{item.description}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          {item.agents.map((a) => (
            <span
              key={a}
              className="bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5 font-medium text-neutral-300"
            >
              {agentName(a)}
            </span>
          ))}
          <span>
            {item.source} · {item.sourceDate}
          </span>
          {item.accounts && <span>· {item.accounts}</span>}
          {clickable && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen!(item.id);
              }}
              className="ml-auto text-xs font-semibold text-violet-300 hover:text-violet-200"
            >
              Les mer →
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
