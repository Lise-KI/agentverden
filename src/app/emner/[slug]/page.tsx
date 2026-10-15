import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import UseCaseCard from "@/components/UseCaseCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import JsonLd from "@/components/JsonLd";
import { categories } from "@/data/categories";
import { useCases } from "@/data/useCases";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/emner/${slug}/` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = useCases.filter((u) => u.category === slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name}: eksempler på bruk av AI-agenter`,
    description: category.description,
    url: `https://agentverden.no/emner/${slug}/`,
    inLanguage: "nb-NO",
    isPartOf: { "@type": "WebSite", name: "Agentverden", url: "https://agentverden.no/" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((u, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: u.title,
      })),
    },
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <JsonLd data={jsonLd} />
        <h1 className="text-lg font-semibold mb-1 text-neutral-50">
          {category.name}
        </h1>
        <p className="text-sm text-neutral-500 mb-4">{category.description}</p>
        <div className="space-y-4">
          {items.map((u) => (
            <UseCaseCard key={u.id} item={u} />
          ))}
          {items.length === 0 && (
            <p className="text-sm text-neutral-500">
              Ingen use cases registrert i dette emnet ennå.
            </p>
          )}
        </div>
        <NewsletterSignup />
      </main>
    </div>
  );
}
