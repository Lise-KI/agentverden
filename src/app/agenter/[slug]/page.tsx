import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import UseCaseCard from "@/components/UseCaseCard";
import { agents } from "@/data/agents";
import { useCases } from "@/data/useCases";

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) return {};

  const items = useCases.filter((u) => u.agents.includes(slug));
  const description = `${items.length} eksempel${
    items.length === 1 ? "" : "er"
  } på ekte ting folk gjør med ${agent.name}.`;

  return {
    title: agent.name,
    description,
    alternates: { canonical: `/agenter/${slug}/` },
  };
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) notFound();

  const items = useCases.filter((u) => u.agents.includes(slug));

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <h1 className="text-lg font-semibold mb-1 text-neutral-50">
          {agent.name}
        </h1>
        <p className="text-sm text-neutral-500 mb-4">
          {items.length} use case{items.length === 1 ? "" : "s"}
        </p>
        <div className="space-y-4">
          {items.map((u) => (
            <UseCaseCard key={u.id} item={u} />
          ))}
          {items.length === 0 && (
            <p className="text-sm text-neutral-500">
              Ingen use cases registrert for denne agenten ennå.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
