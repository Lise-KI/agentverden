import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { sponsors } from "@/data/sponsors";

export const metadata: Metadata = {
  title: "Bli sponsor",
  description: "Sponsing av Agentverden — reklame merket tydelig.",
  alternates: { canonical: "/sponsor/" },
  robots: { index: false, follow: false },
};

export default function SponsorPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-900">
          Bli sponsor
        </h1>
        <p className="text-neutral-700 mb-4">
          Logoen og en kort tekst vises i sponsorfeltet nederst på hver side,
          synlig på alle visninger av Agentverden.
        </p>
        <p className="text-neutral-700 mb-6">
          Priser og betalingsløsning kommer når siden er live og i drift —
          ingen betalte avtaler inngås før da, i tråd med planen om å bygge
          lokalt og kostnadsfritt først.
        </p>
        <p className="text-neutral-700 mb-6">
          Alle sponsorplasseringer merkes tydelig med «Reklame» der de vises
          på siden, og er uavhengige av det redaksjonelle use case-innholdet.
          Se{" "}
          <a
            href="/ansvarsfraskrivelse"
            className="underline text-brand hover:text-brand-dark"
          >
            ansvarsfraskrivelsen
          </a>{" "}
          for detaljer.
        </p>
        <div className="glass rounded-xl p-4">
          <h2 className="font-semibold mb-2 text-neutral-900">
            Nåværende sponsorplasser
          </h2>
          <ul className="text-sm text-neutral-600 space-y-1">
            {sponsors.map((s) => (
              <li key={s.initials}>
                {s.name} — {s.pitch} (plassholder)
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
