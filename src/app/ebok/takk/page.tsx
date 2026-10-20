import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

// Takkeside etter påmelding i Brevo-skjemaet (midlertidig leveringsmåte til
// Brevo har aktivert bekreftelses-e-post). Ikke lenket fra siden, ikke i sitemap.
export const metadata: Metadata = {
  title: "Takk for påmeldingen",
  description: "Last ned e-boken fra Agentverden.",
  robots: { index: false, follow: false },
};

const PDF = "/ebok.pdf";

export default function TakkPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl text-neutral-700">
        <p className="font-mono text-xs uppercase tracking-wider text-brand mb-3">
          Påmelding mottatt
        </p>
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-900">
          Takk! Her er e-boken din
        </h1>
        <p className="mb-6">
          Du er nå med på nyhetsbrevet fra Agentverden. Last ned e-boken «10
          ting nordmenn kan gjøre med AI i hverdagen» her:
        </p>
        <a
          href={PDF}
          download
          className="btn-stripe-primary inline-block px-6 py-3 text-base"
        >
          Last ned e-boken (PDF)
        </a>
        <p className="text-sm text-neutral-500 mt-6">
          Du kan melde deg av nyhetsbrevet når som helst via lenken nederst i
          hver e-post. Les mer i{" "}
          <Link
            href="/personvern"
            className="underline text-brand hover:text-brand-dark"
          >
            personvernerklæringen
          </Link>
          .
        </p>
        <p className="mt-8">
          <Link href="/" className="text-brand hover:text-brand-dark font-medium">
            ← Til forsiden
          </Link>
        </p>
      </main>
    </div>
  );
}
