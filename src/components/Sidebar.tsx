import Link from "next/link";
import { categories } from "@/data/categories";
import { agents } from "@/data/agents";

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-72 shrink-0 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl px-4 py-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <Link href="/" className="flex items-center gap-2 mb-3">
        <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-teal-400 text-white flex items-center justify-center font-bold text-sm shadow-[0_0_18px_rgba(139,123,255,0.55)]">
          AV
        </span>
        <span className="font-semibold text-lg tracking-tight text-neutral-50">
          Agentverden
        </span>
      </Link>
      <p className="text-sm text-neutral-400 mb-4">
        Ekte ting folk gjør med AI-agenter, samlet fra hele nettet hver dag.
        Stjel en idé.
      </p>

      <div className="glass rounded-lg p-3 mb-4 space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Få 5 use cases hver morgen
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            disabled
            placeholder="din@epost.no"
            className="flex-1 min-w-0 rounded border border-white/10 bg-white/[0.03] px-2 py-1.5 text-sm text-neutral-300 placeholder:text-neutral-500"
          />
          <button
            disabled
            title="Kommer når nyhetsbrevet er satt opp"
            className="btn-stripe-primary opacity-40 text-sm px-3 py-1.5"
          >
            Meld meg på
          </button>
        </div>
        <p className="text-[11px] text-neutral-500">
          Nyhetsbrev kommer etter lansering — se{" "}
          <Link href="/om" className="underline hover:text-neutral-300">
            planen
          </Link>
          .
        </p>
      </div>

      <Link
        href="/ebok"
        className="glass glass-hover block w-full text-center rounded-lg px-3 py-2 text-sm font-medium mb-3 text-neutral-200"
      >
        Gratis e-bok
      </Link>

      <div className="mb-3">
        <p className="text-xs text-neutral-400 mb-1.5 px-1 leading-snug">
          Bruker du en agent på en lur måte selv? Vi vil gjerne høre
          historien din.
        </p>
        <Link
          href="/om"
          className="glass glass-hover block w-full text-center rounded-lg px-3 py-2 text-sm font-medium text-neutral-200"
        >
          Del din erfaring
        </Link>
      </div>

      <Link
        href="/verktoy"
        className="glass glass-hover block w-full text-center rounded-lg px-3 py-2 text-sm font-medium mb-6 text-neutral-200"
      >
        Verktøy vi anbefaler
      </Link>

      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">
          Agenter
        </h3>
        <ul className="space-y-1 text-sm">
          {agents.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/agenter/${a.slug}`}
                className="flex justify-between text-neutral-300 hover:text-white transition-colors"
              >
                <span>{a.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">
          Emner
        </h3>
        <ul className="space-y-1 text-sm">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/emner/${c.slug}`}
                className="text-neutral-300 hover:text-white transition-colors"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
