import type { Metadata } from "next";
import { Fragment } from "react";
import Sidebar from "@/components/Sidebar";
import NewsletterSignup from "@/components/NewsletterSignup";
import { loadEbok } from "@/lib/ebok";

export const metadata: Metadata = {
  title: "Gratis e-bok om AI i hverdagen",
  description:
    "10 ting nordmenn kan gjøre med AI i hverdagen. Gratis e-bok fra Agentverden med konkrete forslag og ferdige prompts.",
  alternates: { canonical: "/ebok/" },
};

function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-neutral-100">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

export default function EbokPage() {
  const ebok = loadEbok();

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl text-neutral-300">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-50">
          {ebok.title}
        </h1>
        {ebok.intro.map((p, i) => (
          <p key={i} className="mb-4">
            <Inline text={p} />
          </p>
        ))}

        <NewsletterSignup variant="ebook" />

        {ebok.sections.map((s) => (
          <section key={s.heading} className="mt-8">
            <h2 className="text-lg font-semibold mb-2 text-neutral-50">
              {s.heading}
            </h2>
            {s.paragraphs.map((p, i) =>
              p.startsWith("**Prompt:**") ? (
                <p
                  key={i}
                  className="glass rounded-lg p-3 text-sm text-neutral-300 mb-3"
                >
                  <Inline text={p} />
                </p>
              ) : (
                <p key={i} className="mb-3">
                  <Inline text={p} />
                </p>
              )
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
