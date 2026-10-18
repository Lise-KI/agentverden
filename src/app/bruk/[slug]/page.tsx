import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import NewsletterSignup from "@/components/NewsletterSignup";
import JsonLd from "@/components/JsonLd";
import { agents } from "@/data/agents";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { useCases, hasPage, isReviewed } from "@/data/useCases";
import CopyButton from "@/components/CopyButton";

export function generateStaticParams() {
  return useCases.filter(hasPage).map((u) => ({ slug: u.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = useCases.find((u) => u.id === slug);
  if (!item || !hasPage(item)) return {};
  return {
    title: item.title,
    description: articles[slug]?.lead ?? item.description,
    alternates: { canonical: `/bruk/${slug}/` },
    // Ikke gjennomgått av eier ennå: holdes utenfor søkemotorer.
    ...(isReviewed(item) ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = useCases.find((u) => u.id === slug);
  if (!item || !hasPage(item)) notFound();
  const article = articles[slug] ?? {
    lead: item.description,
    sections: [
      { heading: "Hva de gjorde", paragraphs: [item.whatTheyDid] },
      { heading: "Hvordan det gikk", paragraphs: [item.howItWent] },
      { heading: "Verdt å vite", paragraphs: [item.worthKnowing] },
    ]
      .filter((s) => s.paragraphs[0])
      .map((s) => ({ heading: s.heading, paragraphs: s.paragraphs as string[] })),
  };

  const category = categories.find((c) => c.slug === item.category);
  const itemAgents = item.agents
    .map((a) => agents.find((x) => x.slug === a))
    .filter((a): a is (typeof agents)[number] => Boolean(a));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: article.lead,
    inLanguage: "nb-NO",
    mainEntityOfPage: `https://agentverden.no/bruk/${slug}/`,
    author: { "@type": "Organization", name: "Agentverden" },
    publisher: { "@type": "Organization", name: "Agentverden", url: "https://agentverden.no/" },
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl text-neutral-300">
        <JsonLd data={jsonLd} />
        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="hover:text-neutral-200">
            Forsiden
          </Link>
          {category && (
            <>
              {" / "}
              <Link href={`/emner/${category.slug}`} className="hover:text-neutral-200">
                {category.name}
              </Link>
            </>
          )}
        </nav>

        <article>
          <h1 className="heading-stripe text-3xl mb-4 text-neutral-50">
            {item.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-5 text-xs">
            {itemAgents.map((a) => (
              <Link
                key={a.slug}
                href={`/agenter/${a.slug}`}
                className="bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5 font-medium text-neutral-300 hover:text-white"
              >
                {a.name}
              </Link>
            ))}
          </div>

          <p className="text-lg text-neutral-200 mb-6">{article.lead}</p>

          {article.sections.map((s) => (
            <section key={s.heading} className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-neutral-50">
                {s.heading}
              </h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mb-3">
                  {p}
                </p>
              ))}
            </section>
          ))}

          {item.promptTemplate && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-neutral-50">
                  Prøv selv: prompt-mal
                </h2>
                <CopyButton text={item.promptTemplate} />
              </div>
              <pre className="glass rounded-lg p-3 text-sm whitespace-pre-wrap text-neutral-300">
                {item.promptTemplate}
              </pre>
            </section>
          )}

          <p className="text-sm text-neutral-500 border-t border-white/10 pt-4 mt-8">
            Artikkelen er skrevet av Agentverden med egne ord, basert på
            offentlig informasjon fra {item.source}
            {item.sourceDate ? ` (${item.sourceDate})` : ""}. Funksjoner og
            tilgjengelighet endrer seg raskt, så sjekk hva som gjelder nå.
            Innholdet er generell informasjon og ikke rådgivning. Les{" "}
            <Link
              href="/ansvarsfraskrivelse"
              className="underline text-violet-300 hover:text-violet-200"
            >
              ansvarsfraskrivelsen
            </Link>
            .
          </p>
        </article>

        <NewsletterSignup />
      </main>
    </div>
  );
}
