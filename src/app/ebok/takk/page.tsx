import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

// Takkeside etter påmelding i Brevo-skjemaet. E-boken sendes på e-post, så
// siden har ingen nedlastingslenke. Ikke lenket fra siden, ikke i sitemap.
export const metadata: Metadata = {
  title: "Takk for påmeldingen",
  description: "Sjekk innboksen din for e-boken fra Agentverden.",
  robots: { index: false, follow: false },
};

export default function TakkPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl text-neutral-700">
        <p className="font-mono text-xs uppercase tracking-wider text-brand mb-3">
          Påmelding mottatt
        </p>
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-900">
          Takk! Sjekk innboksen din
        </h1>
        <p className="mb-4">
          Du er nå med på nyhetsbrevet fra Agentverden. Vi har sendt deg en
          e-post med lenke til e-boken «10 ting nordmenn kan gjøre med AI i
          hverdagen».
        </p>
        <div className="glass rounded-xl p-4 mb-6">
          <p className="font-semibold text-neutral-900 mb-1">
            Har du ikke fått e-posten?
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Vent et par minutter og sjekk innboksen på nytt.</li>
            <li>
              Se i <strong>søppelpost</strong> (spam), og i fanen{" "}
              <strong>Kampanjer</strong> hvis du bruker Gmail.
            </li>
            <li>
              Fant du den i søppelposten? Merk den som «ikke søppel», så får
              du fremtidige e-poster i innboksen.
            </li>
          </ul>
        </div>
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
