import Link from "next/link";
import { categories } from "@/data/categories";
import { agents } from "@/data/agents";
import AgentIcon from "@/components/AgentIcon";

function ChipRow({
  label,
  items,
}: {
  label: string;
  items: { href: string; name: string; icon?: string }[];
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 [scrollbar-width:none]">
      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
        {label}
      </span>
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700 hover:text-neutral-950"
        >
          {i.icon && <AgentIcon slug={i.icon} size={16} />}
          {i.name}
        </Link>
      ))}
    </div>
  );
}

export default function Sidebar() {
  return (
    <>
      {/* Mobil: kompakt topp, så innholdet kommer rett etter. Agenter og emner
        ligger som sveipbare rader i stedet for lange lister. */}
      <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-2 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-brand text-[#fff] flex items-center justify-center font-bold text-xs">
              AV
            </span>
            <span className="font-semibold tracking-tight text-neutral-900">
              Agentverden
            </span>
          </Link>
          <nav className="flex gap-3 text-xs font-medium text-neutral-700">
            <Link href="/ebok" className="hover:text-neutral-950">
              Gratis e-bok
            </Link>
            <Link href="/send-inn" className="hover:text-neutral-950">
              Send inn
            </Link>
          </nav>
        </div>
        <ChipRow
          label="Agenter"
          items={agents.map((a) => ({
            href: `/agenter/${a.slug}`,
            name: a.name,
            icon: a.slug,
          }))}
        />
        <ChipRow
          label="Emner"
          items={categories.map((c) => ({
            href: `/emner/${c.slug}`,
            name: c.name,
          }))}
        />
      </div>

      <aside className="hidden lg:block lg:w-72 shrink-0 border-r border-neutral-200 bg-white px-4 py-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <Link href="/" className="flex items-center gap-2 mb-3">
          <span className="h-8 w-8 rounded-lg bg-brand text-[#fff] flex items-center justify-center font-bold text-sm">
            AV
          </span>
          <span className="font-semibold text-lg tracking-tight text-neutral-900">
            Agentverden
          </span>
        </Link>
        <p className="text-sm text-neutral-600 mb-4">
          Ekte ting folk gjør med AI-agenter, samlet fra hele nettet hver dag.
          Stjel en idé.
        </p>

        <div className="glass rounded-lg p-3 mb-4 space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-600">
            Få 5 use cases hver morgen
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              disabled
              placeholder="din@epost.no"
              className="flex-1 min-w-0 rounded border border-neutral-200 bg-white px-2 py-1.5 text-sm text-neutral-700 placeholder:text-neutral-400"
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
            <Link href="/om" className="underline hover:text-neutral-900">
              planen
            </Link>
            .
          </p>
        </div>

        <Link
          href="/ebok"
          className="glass glass-hover block w-full text-center rounded-lg px-3 py-2 text-sm font-medium mb-3 text-neutral-800"
        >
          Gratis e-bok
        </Link>

        <Link
          href="/send-inn"
          className="glass glass-hover block w-full text-center rounded-lg px-3 py-2 text-sm font-medium mb-6 text-neutral-800"
        >
          Send inn et eksempel
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
                  className="flex items-center gap-2.5 py-0.5 text-neutral-700 hover:text-neutral-950 transition-colors"
                >
                  <AgentIcon slug={a.slug} />
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
                  className="text-neutral-700 hover:text-neutral-950 transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
