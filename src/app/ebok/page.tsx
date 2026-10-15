import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Gratis e-bok om AI i hverdagen",
  description:
    "10 ting nordmenn kan gjøre med AI i hverdagen. Gratis e-bok fra Agentverden, tilsendt på e-post.",
  alternates: { canonical: "/ebok/" },
  // Midlertidig: skjules fra søkemotorer til Brevo-skjemaet er på plass.
  robots: { index: false, follow: false },
};

export default function EbokPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-50">
          10 ting nordmenn kan gjøre med AI i hverdagen
        </h1>
        {/* PLASSHOLDER: ingen docs/ebok.md finnes. Bytt ut med faktisk
            innhold/omtale av e-boken når den er skrevet. */}
        <p className="text-neutral-300 mb-4">
          En gratis e-bok med ti konkrete måter å bruke AI på i hverdagen.
          Skrevet for privatpersoner i Norge.
        </p>
        <NewsletterSignup variant="ebook" />
      </main>
    </div>
  );
}
