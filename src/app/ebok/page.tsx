import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import NewsletterSignup from "@/components/NewsletterSignup";
import { BREVO_EBOOK_FORM_URL } from "@/config/brevo";
import { loadEbok } from "@/lib/ebok";

export const metadata: Metadata = {
  title: "Gratis e-bok om AI i hverdagen",
  description:
    "10 ting nordmenn kan gjøre med AI i hverdagen. Gratis e-bok fra Agentverden, tilsendt på e-post.",
  alternates: { canonical: "/ebok/" },
  // Skjules fra søkemotorer til Brevo-skjemaet er på plass.
  ...(BREVO_EBOOK_FORM_URL ? {} : { robots: { index: false, follow: false } }),
};

// Innholdet i e-boken vises ikke på siden: den leveres bare via e-post.
// Tittelen hentes fra docs/ebok.md.
export default function EbokPage() {
  const { title } = loadEbok();

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl text-neutral-700">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-900">
          {title}
        </h1>
        <p className="mb-4">
          En gratis e-bok med ti konkrete, hverdagslige oppgaver der AI kan
          hjelpe deg som privatperson i Norge, med ferdige forslag til hva du
          kan skrive. Legg inn e-postadressen din, så får du den tilsendt.
        </p>
        <NewsletterSignup variant="ebook" />
      </main>
    </div>
  );
}
