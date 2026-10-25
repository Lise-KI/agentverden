import Link from "next/link";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import AgentIcon from "@/components/AgentIcon";
import { agents } from "@/data/agents";
import { useCases, hasPage } from "@/data/useCases";

export const metadata: Metadata = {
  title: "Alle agenter",
  description: "Alle AI-agenter vi dekker på Agentverden.",
  alternates: { canonical: "/agenter/" },
};

export default function AgenterPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <h1 className="text-lg font-semibold mb-4 text-neutral-900">Agenter</h1>
        <div className="grid sm:grid-cols-2 gap-3">
          {agents.map((a) => {
            const n = useCases.filter(
              (u) => hasPage(u) && u.agents.includes(a.slug)
            ).length;
            return (
              <Link
                key={a.slug}
                href={`/agenter/${a.slug}`}
                className="glass glass-hover rounded-xl p-4 flex items-center justify-between"
              >
                <span className="flex items-center gap-3 font-medium text-neutral-900">
                  <AgentIcon slug={a.slug} size={32} />
                  {a.name}
                </span>
                <span
                  aria-label={`${n} artikler`}
                  className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700"
                >
                  {n}
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
