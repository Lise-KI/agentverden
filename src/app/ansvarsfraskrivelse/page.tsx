import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Ansvarsfraskrivelse",
  description: "Ansvarsfraskrivelse for innhold på Agentverden.",
  alternates: { canonical: "/ansvarsfraskrivelse/" },
};

export default function AnsvarsfraskrivelsePage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl space-y-4 text-neutral-700">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-900">
          Ansvarsfraskrivelse
        </h1>

        <p>
          Agentverden er en kuratert katalog over eksempler på hvordan folk
          bruker AI-agenter, samlet og omskrevet fra åpne kilder som X,
          Reddit og Hacker News. Innholdet er ment som inspirasjon og
          underholdning — ikke som en anbefaling eller garanti for at noe vil
          fungere for deg.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2 text-neutral-900">
          Ingen finansiell, juridisk eller helsefaglig rådgivning
        </h2>
        <p>
          Noen use cases beskriver bruk av AI-agenter til ting som
          aksjehandel, forsikring, refusjoner eller andre økonomiske
          beslutninger. Dette er gjenfortellinger av hva andre har gjort,
          ikke råd fra Agentverden. Vi gir ingen finansiell, juridisk,
          skattemessig, forsikringsmessig eller helsefaglig rådgivning. Hvis
          en use case gjelder økonomi, jus, forsikring, skatt eller helse,
          bør du selv vurdere risikoen og eventuelt rådføre deg med en
          kvalifisert fagperson før du gjør noe tilsvarende. Resultater
          beskrevet i use cases (f.eks. avkastning, besparelser) er enkelttilfeller
          og ingen garanti for samme utfall for deg.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2 text-neutral-900">
          Nøyaktighet av innhold
        </h2>
        <p>
          Use cases er skrevet om med egne ord basert på offentlig
          tilgjengelige innlegg, og vi forsøker å oppgi kilde
          («curated from») der det er naturlig. Vi kan ikke garantere at
          hver beskrivelse er 100 % korrekt eller oppdatert — innholdet
          gjenspeiler hva som var publisert på kildeplattformen på det
          tidspunktet det ble observert.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2 text-neutral-900">
          Sponsorer og reklame
        </h2>
        <p>
          Enkelte felt på siden (sponsorfeltet nederst, og eventuelle
          merkede plasseringer) er betalt reklame eller sponsorinnhold, og
          merkes som «Reklame» der det forekommer. Dette er uavhengig av det
          redaksjonelle use case-innholdet, og en sponsoravtale påvirker
          ikke hvilke use cases som publiseres.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2 text-neutral-900">
          Eksterne lenker
        </h2>
        <p>
          Lenker til kildeplattformer (X, Reddit, Hacker News m.fl.) og til
          eventuelle sponsorer går til tredjeparts nettsider som
          Agentverden ikke har kontroll over eller ansvar for innholdet på.
        </p>

        <p className="text-sm text-neutral-500 mt-8">
          Sist oppdatert: oktober 2026.
        </p>
      </main>
    </div>
  );
}
