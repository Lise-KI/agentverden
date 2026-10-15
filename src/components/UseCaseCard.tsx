import { UseCase } from "@/data/useCases";
import { agents } from "@/data/agents";

function agentName(slug: string) {
  return agents.find((a) => a.slug === slug)?.name ?? slug;
}

export default function UseCaseCard({ item }: { item: UseCase }) {
  return (
    <article className="glass glass-hover rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="font-semibold text-base leading-snug text-neutral-50">
          {item.title}
        </h3>
        {item.isNew && (
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 rounded px-1.5 py-0.5">
            Ny
          </span>
        )}
      </div>
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
        <span className="ml-auto flex items-center gap-1 font-semibold text-violet-300">
          ▲ {item.votes}
        </span>
      </div>
    </article>
  );
}
