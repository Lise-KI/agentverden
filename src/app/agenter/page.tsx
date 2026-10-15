import Link from "next/link";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { agents } from "@/data/agents";
import { useCases } from "@/data/useCases";

export const metadata: Metadata = {
  title: "Alle agenter",
  description: "Alle AI-agenter vi dekker på Agentbruk.",
  alternates: { canonical: "/agenter/" },
};

export default function AgenterPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <h1 className="text-lg font-semibold mb-4 text-neutral-50">Agenter</h1>
        <div className="grid sm:grid-cols-2 gap-3">
          {agents.map((a) => {
            const n = useCases.filter((u) => u.agents.includes(a.slug)).length;
            return (
              <Link
                key={a.slug}
                href={`/agenter/${a.slug}`}
                className="glass glass-hover rounded-xl p-4 flex items-center justify-between"
              >
                <span className="font-medium text-neutral-100">{a.name}</span>
                <span className="text-sm text-neutral-500">
                  {n} use case{n === 1 ? "" : "s"}
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
