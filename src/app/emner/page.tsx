import Link from "next/link";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { categories } from "@/data/categories";
import { useCases } from "@/data/useCases";

export const metadata: Metadata = {
  title: "Alle emner",
  description: "Alle emnekategorier for AI-agent-use cases på Agentverden.",
  alternates: { canonical: "/emner/" },
};

export default function EmnerPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <h1 className="text-lg font-semibold mb-4 text-neutral-900">Emner</h1>
        <div className="grid sm:grid-cols-2 gap-3">
          {categories.map((c) => {
            const n = useCases.filter((u) => u.category === c.slug).length;
            return (
              <Link
                key={c.slug}
                href={`/emner/${c.slug}`}
                className="glass glass-hover rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-neutral-900">{c.name}</span>
                  <span className="text-sm text-neutral-500">{n}</span>
                </div>
                <p className="text-sm text-neutral-600">{c.description}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
