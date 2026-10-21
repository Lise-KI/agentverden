import Link from "next/link";
import { UseCase, hasPage } from "@/data/useCases";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";
import AgentIcon from "@/components/AgentIcon";
import VoteButton from "@/components/VoteButton";

function agentName(slug: string) {
  return agents.find((a) => a.slug === slug)?.name ?? slug;
}

function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export default function UseCaseCard({ item }: { item: UseCase }) {
  const href = hasPage(item) ? `/bruk/${item.id}` : null;

  return (
    <article className="relative glass-article glass-article-hover rounded-xl p-4 flex gap-3">
      <div className="shrink-0">
        {href ? <VoteButton id={item.id} /> : null}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-neutral-500">
            {categoryName(item.category)}
          </span>
          {item.isNew && (
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-1.5 py-0.5">
              Ny
            </span>
          )}
        </div>
        <h3 className="font-semibold text-base leading-snug text-neutral-900 mb-1">
          {href ? (
            // Lenken dekker hele kortet (after:inset-0), så hele kortet er klikkbart.
            <Link
              href={href}
              className="hover:text-brand-dark after:absolute after:inset-0 after:content-['']"
            >
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h3>
        <p className="text-sm text-neutral-600 mb-3">{item.description}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          {item.agents.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 bg-neutral-100 border border-neutral-200 rounded px-1.5 py-0.5 font-medium text-neutral-700"
            >
              <AgentIcon slug={a} size={14} />
              {agentName(a)}
            </span>
          ))}
          <span>
            {item.source}
            {item.sourceDate ? ` · ${item.sourceDate}` : ""}
          </span>
          {item.accounts && <span>· {item.accounts}</span>}
          {href && (
            <span className="ml-auto text-xs font-semibold text-brand">
              Les mer →
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
