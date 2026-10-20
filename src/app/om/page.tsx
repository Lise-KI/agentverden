import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Om",
  description: "Hva Agentverden er, og hvorfor det finnes.",
  alternates: { canonical: "/om/" },
};

export default function OmPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl space-y-4 text-neutral-300">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-50">
          Om Agentverden
        </h1>
        <p>
          Agentverden er en kuratert katalog over ekte ting folk gjør med
          AI-agenter — samlet fra X, Reddit, Hacker News og resten av det
          åpne nettet hver eneste dag. Målet er enkelt: vise konkrete,
          etterprøvbare eksempler du kan stjele en idé fra, i stedet for enda
          en liste med generiske «AI use cases».
        </p>
        <p>
          Dette er en norsk, lokalt bygget prototype inspirert av{" "}
          <a
            href="https://agentusecases.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-violet-300 hover:text-violet-200"
          >
            agentusecases.ai
          </a>
          . Strukturen er lik, men innholdet er skrevet om på norsk og
          logoene er egne.
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2 text-neutral-50">
          Del din egen erfaring
        </h2>
        <p>
          Har du funnet en god måte å bruke en AI-agent på — i jobben, på
          skolen, i husholdningen eller noe helt annet? Vi vil gjerne høre om
          det. Det trenger ikke være avansert eller perfekt; det viktigste er
          at det er noe du faktisk har gjort selv, og at andre kan lære noe av
          fremgangsmåten din.
        </p>
        <p>
          Beskriv gjerne kort hva du ville løse, hvilken agent eller verktøy
          du brukte, og hva resultatet ble. Vi leser gjennom alt som sendes
          inn, og legger de beste bidragene inn på siden — med kreditering til
          deg hvis du ønsker det.
        </p>
        <p>
          Innsendingsskjema kommer når siden er live. Inntil videre: skriv til
          oss, så legger vi det inn manuelt etter gjennomgang — akkurat som
          originalen gjør det.
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2 text-neutral-50">
          Nyhetsbrev og drift
        </h2>
        <p>
          Nyhetsbrev («5 use cases hver morgen»), SEO/chatbot-optimalisering,
          overvåking av tilbakemeldinger og sponsorpleie settes opp som egne
          driftsrutiner etter at siden er lansert — i tråd med planen.
        </p>
      </main>
    </div>
  );
}
