import Link from "next/link";
import { categories } from "@/data/categories";
import { agents } from "@/data/agents";
import { useCases, hasPage } from "@/data/useCases";
import AgentIcon from "@/components/AgentIcon";
import Logo from "@/components/Logo";

function ChipRow({
  label,
  items,
}: {
  label: string;
  items: { href: string; name: string; icon?: string; count?: number }[];
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
          {typeof i.count === "number" && (
            <span className="inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-neutral-100 text-[10px] font-semibold text-neutral-500">
              {i.count}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

export default function Sidebar() {
  // Antall artikler (sider som faktisk finnes) per agent — samme telling
  // som på /agenter-siden, vist her slik at tallene synes overalt, ikke
  // bare når man har klikket inn på én agent.
  const agentCounts: Record<string, number> = {};
  for (const a of agents) {
    agentCounts[a.slug] = useCases.filter(
      (u) => hasPage(u) && u.agents.includes(a.slug)
    ).length;
  }

  return (
    <>
      {/* Mobil: kompakt topp, så innholdet kommer rett etter. Agenter og emner
        ligger som sveipbare rader i stedet for lange lister. */}
      <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-2 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" aria-label="Agentverden – til forsiden" className="flex items-center gap-2 rounded-lg transition-opacity hover:opacity-80 active:opacity-60">
            <Logo size={34} />
            <span className="font-semibold text-lg tracking-tight text-neutral-900">
              Agentverden
            </span>
          </Link>
          <nav className="flex gap-3 text-xs font-medium text-neutral-700">
            <Link href="/ebok" className="hover:text-neutral-950">
              Gratis e-bok
            </Link>
          </nav>
        </div>
        <p className="text-xs text-neutral-600">
          Har du en erfaring du ønsker å dele?{" "}
          <Link
            href="/send-inn"
            className="font-medium text-violet-700 underline hover:text-violet-900"
          >
            Send inn til oss her
          </Link>
        </p>
        <ChipRow
          label="Agenter"
          items={agents.map((a) => ({
            href: `/agenter/${a.slug}`,
            name: a.name,
            icon: a.slug,
            count: agentCounts[a.slug],
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
        <Link href="/" aria-label="Agentverden – til forsiden" className="flex items-center gap-3 mb-3 rounded-lg transition-opacity hover:opacity-80 active:opacity-60">
          <Logo size={44} />
          <span className="font-semibold text-2xl tracking-tight text-neutral-900">
            Agentverden
          </span>
        </Link>
        <p className="text-sm text-neutral-600 mb-4">
          Lær å bruke AI-agenter i hverdagen, med konkrete eksempler forklart
          på norsk.
        </p>

        <div className="glass rounded-lg p-3 mb-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
            Få 5 use cases i uken
          </p>
          <p className="text-sm text-neutral-700">
            Gratis nyhetsbrev med fem nye eksempler hver uke. Du får e-boken
            «10 ting nordmenn kan gjøre med AI i hverdagen» som takk.
          </p>
          <Link
            href="/ebok/#nyhetsbrev"
            className="btn-stripe-primary block text-center text-sm px-3 py-2"
          >
            Meld meg på
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-xs text-neutral-500 mb-1.5 px-1 leading-snug">
            Har du en erfaring du ønsker å dele?
          </p>
          <Link
            href="/send-inn"
            className="glass glass-hover block w-full text-center rounded-lg px-3 py-2 text-sm font-medium text-neutral-800"
          >
            Send inn til oss her
          </Link>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">
            Agenter
          </h3>
          <ul className="space-y-1 text-sm">
            {agents.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/agenter/${a.slug}`}
                  className="flex items-center justify-between gap-2.5 py-0.5 text-neutral-700 hover:text-neutral-950 transition-colors"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <AgentIcon slug={a.slug} />
                    <span className="truncate">{a.name}</span>
                  </span>
                  <span className="shrink-0 text-xs font-medium text-neutral-400">
                    {agentCounts[a.slug]}
                  </span>
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
