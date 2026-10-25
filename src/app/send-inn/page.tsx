import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Send inn et eksempel på bruk av AI-agenter",
  description:
    "Har du brukt AI-agenter til noe nyttig i hverdagen? Send oss eksempelet ditt, så kan det bli en artikkel på Agentverden.",
  alternates: { canonical: "/send-inn/" },
};

const EMAIL = "kontakt@agentverden.no";
const SUBJECT = "Eksempel til Agentverden";
const TEMPLATE = `Hva brukte du AI til?

Hvilket verktøy brukte du (f.eks. ChatGPT, Claude, Gemini)?

Hva skrev du til verktøyet? (lim gjerne inn instruksen)

Hva ble resultatet?

Var det noe som ikke fungerte, eller som du måtte rette opp?

Vil du krediteres med fornavn? (ja/nei, og i så fall hvilket navn)`;

const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(TEMPLATE)}`;

export default function SendInnPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl text-neutral-700 space-y-4">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-900">
          Send inn et eksempel
        </h1>
        <p>
          Har du brukt en AI-agent eller en KI-chatbot til noe nyttig i
          hverdagen? Send oss eksempelet ditt. De beste blir til artikler på
          Agentverden, skrevet med våre egne ord.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-neutral-900">
          Slik sender du inn
        </h2>
        <p>
          Trykk på knappen under. E-postprogrammet ditt åpnes med noen
          spørsmål ferdig utfylt. Svar så godt du kan og send.
        </p>
        <a
          href={mailto}
          className="btn-stripe-primary inline-block rounded-lg px-4 py-2 text-sm font-medium"
        >
          Skriv e-post til oss
        </a>
        <p className="text-sm text-neutral-500">
          Åpnes ikke e-postprogrammet? Send en e-post til{" "}
          <span className="text-neutral-700">{EMAIL}</span> og kopier spørsmålene
          under.
        </p>
        <pre className="glass rounded-lg p-3 text-sm whitespace-pre-wrap text-neutral-700">
          {TEMPLATE}
        </pre>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-neutral-900">
          Ikke send dette
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Passord, koder eller innloggingsinformasjon.</li>
          <li>Opplysninger om andre personer, som navn, adresser eller bilder.</li>
          <li>
            Sensitive opplysninger om deg selv, for eksempel om helse eller
            økonomi.
          </li>
          <li>Skjermbilder som viser private samtaler eller kontoer.</li>
          <li>Tekst eller bilder som noen andre har laget.</li>
        </ul>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-neutral-900">
          Hva skjer med eksempelet ditt
        </h2>
        <p>
          Vi leser alle innsendinger, men kan ikke love at alt blir publisert.
          Hvis vi bruker eksempelet, skriver vi det om med egne ord. Vi
          publiserer ikke e-posten din eller teksten din ordrett uten å spørre
          deg først. Du blir kreditert med fornavn bare hvis du ønsker det.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-neutral-900">
          Rettigheter
        </h2>
        <p>
          Du beholder opphavsretten til det du sender. Ved å sende inn gir du
          Agentverden en ikke-eksklusiv og vederlagsfri rett til å bruke,
          redigere og publisere innholdet på agentverden.no og i
          nyhetsbrevet. Du bekrefter samtidig at du har rett til å dele det du
          sender.
        </p>

        <h2 className="text-lg font-semibold mt-8 mb-2 text-neutral-900">
          Personvern
        </h2>
        <p>
          Vi bruker e-postadressen din bare til å svare deg og følge opp
          innsendingen. Les mer i{" "}
          <Link
            href="/personvern"
            className="underline text-brand hover:text-brand-dark"
          >
            personvernerklæringen
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
