import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Personvern",
  description: "Personvernerklæring for Agentverden.",
  alternates: { canonical: "/personvern/" },
};

export default function PersonvernPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl space-y-4 text-neutral-300">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-50">
          Personvern
        </h1>

        <p>
          Agentverden samler i dag ingen personopplysninger om besøkende. Vi
          bruker ingen analyseverktøy, ingen tredjeparts sporingspiksler og
          ingen cookies utover det som eventuelt er strengt tekniske nødvendig
          for at nettsiden skal fungere (f.eks. sideoppsett). Siden hostes som
          statiske filer, uten database og uten innlogging.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2 text-neutral-50">
          Nyhetsbrev (når det aktiveres)
        </h2>
        <p>
          Når påmelding til nyhetsbrevet («5 use cases hver morgen») blir
          tilgjengelig, vil vi be om e-postadressen din. Ber du om e-boken,
          melder du deg samtidig på nyhetsbrevet, og det står tydelig i
          skjemaet. Adressen brukes utelukkende til å sende deg e-boken og
          nyhetsbrevet, lagres hos vår
          e-postleverandør, og du kan melde deg av når du vil via lenke i
          hver utsendelse. Vi selger eller deler aldri e-postadresser med
          tredjepart.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2 text-neutral-50">
          Innsending av use cases
        </h2>
        <p>
          Når innsendingsskjemaet er klart, vil informasjonen du sender inn
          (tekst og eventuell lenke til kilde) bli brukt til å vurdere og
          eventuelt publisere saken på siden. Vi lagrer ikke mer enn det som
          er nødvendig for den vurderingen.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2 text-neutral-50">
          Dine rettigheter
        </h2>
        <p>
          Hvis vi på et tidspunkt lagrer personopplysninger om deg (f.eks.
          e-postadressen din i nyhetsbrevlisten), har du rett til å få vite
          hva vi har lagret, få det korrigert, eller be om at det slettes.
          Ta kontakt via kontaktinformasjonen på{" "}
          <a href="/om" className="underline text-violet-300 hover:text-violet-200">
            Om-siden
          </a>{" "}
          for slike forespørsler.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2 text-neutral-50">
          Endringer
        </h2>
        <p>
          Denne siden oppdateres når funksjonalitet som faktisk samler data
          (nyhetsbrev, innsendingsskjema, analyse) tas i bruk. Sist oppdatert:
          oktober 2026.
        </p>
      </main>
    </div>
  );
}
