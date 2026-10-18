import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Personvern",
  description:
    "Personvernerklæring for Agentverden: hvilke opplysninger vi behandler, hvorfor, og hvilke rettigheter du har.",
  alternates: { canonical: "/personvern/" },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold mt-8 mb-2 text-neutral-900">
      {children}
    </h2>
  );
}

const linkCls = "underline text-brand hover:text-brand-dark";

export default function PersonvernPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl space-y-3 text-neutral-700">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-900">
          Personvern
        </h1>

        <p>
          Har du spørsmål om personvern, skriv til{" "}
          <a href="mailto:support@agentverden.no" className={linkCls}>
            support@agentverden.no
          </a>
          .
        </p>

        <H2>Når du bare leser på siden</H2>
        <p>
          Vi bruker ingen analyseverktøy, ingen annonsenettverk og ingen
          sporingspiksler, og vi setter ingen informasjonskapsler (cookies)
          selv. Siden velger lyst eller mørkt tema ut fra når solen står opp og
          går ned i Oslo. Det beregnes i nettleseren din, uten at vi henter
          posisjonen din.
        </p>
        <p>
          Sider med påmeldingsskjema laster et skript fra e-posttjenesten
          Brevo. Da mottar Brevo teknisk informasjon fra nettleseren din, som
          IP-adresse, slik alle nettsteder gjør når de leverer en fil.
        </p>

        <H2>Nyhetsbrev og e-bok</H2>
        <p>
          <strong className="text-neutral-900">Hva du melder deg på.</strong>{" "}
          Når du fyller ut skjemaet og krysser av, melder du deg på
          nyhetsbrevet fra Agentverden, med norske eksempler på hva folk gjør
          med AI-agenter. Som takk får du e-boken «10 ting nordmenn kan gjøre
          med AI i hverdagen». Dette står i skjemaet før du sender det. Melder
          du deg av, beholder du e-boken.
        </p>
        <p>
          <strong className="text-neutral-900">Hvilke opplysninger.</strong>{" "}
          E-postadressen din, tidspunktet du meldte deg på, hvilket skjema du
          brukte, og teknisk informasjon som e-posttjenesten registrerer som
          dokumentasjon på samtykket (som IP-adresse).
        </p>
        <p>
          <strong className="text-neutral-900">Rettslig grunnlag.</strong>{" "}
          Samtykke, jf. personvernforordningen (GDPR) artikkel 6 nr. 1 bokstav
          a. Du gir samtykket ved å krysse av i en boks som ikke er
          forhåndsavkrysset, og sende skjemaet.
        </p>
        <p>
          <strong className="text-neutral-900">Avmelding.</strong> Du kan når
          som helst melde deg av via lenken nederst i hver e-post, eller ved å
          skrive til{" "}
          <a href="mailto:support@agentverden.no" className={linkCls}>
            support@agentverden.no
          </a>
          . Å trekke tilbake samtykket påvirker ikke lovligheten av det vi
          gjorde før du trakk det tilbake.
        </p>
        <p>
          <strong className="text-neutral-900">Lagringstid.</strong> Vi
          beholder e-postadressen din så lenge du er påmeldt. Melder du deg av,
          sender vi deg ikke flere nyhetsbrev. E-posttjenesten kan beholde
          adressen på en sperreliste, slik at du ikke får e-post fra oss igjen
          ved en feil. Ber du om sletting, sletter vi adressen helt.
        </p>
        <p>
          <strong className="text-neutral-900">Mottakere.</strong> Vi selger
          eller deler aldri e-postadresser med andre. Vi bruker én
          databehandler for nyhetsbrevet:
        </p>
        <p>
          <strong className="text-neutral-900">Brevo</strong> (Sendinblue SAS,
          Frankrike) står for påmeldingsskjema, lagring av adresser og utsending
          av e-post på våre vegne, etter en databehandleravtale. Brevo lagrer
          data i EU.
        </p>

        <H2>Når du sender inn et eksempel</H2>
        <p>
          Sender du oss et eksempel via{" "}
          <Link href="/send-inn" className={linkCls}>
            Send inn
          </Link>
          , behandler vi e-postadressen din, navnet ditt hvis det står i
          e-posten, og det du skriver. Formålet er å vurdere innsendingen,
          svare deg og eventuelt skrive en artikkel. Rettslig grunnlag er vår
          berettigede interesse i å kunne svare på henvendelser (GDPR artikkel
          6 nr. 1 bokstav f). E-posten lagres i e-postkontoen vår hos Webhuset,
          og vi sletter den senest 12 måneder etter siste kontakt. Publiserte
          artikler inneholder aldri e-postadressen din.
        </p>

        <H2>Dine rettigheter</H2>
        <p>
          Du har rett til innsyn i, retting og sletting av opplysningene om deg,
          til å begrense behandlingen, til å få utlevert opplysningene
          (dataportabilitet) og til å trekke tilbake samtykke. Send en e-post
          til{" "}
          <a href="mailto:support@agentverden.no" className={linkCls}>
            support@agentverden.no
          </a>
          , så svarer vi innen 30 dager. Mener du at vi behandler opplysninger
          i strid med regelverket, kan du klage til{" "}
          <a
            href="https://www.datatilsynet.no"
            className={linkCls}
            rel="noopener noreferrer"
          >
            Datatilsynet
          </a>
          .
        </p>

        <H2>Behandlingsansvarlig</H2>
        <p>
          Fairnie Bil (enkeltpersonforetak). Kontakt:{" "}
          <a href="mailto:support@agentverden.no" className={linkCls}>
            support@agentverden.no
          </a>
          .
        </p>

        <H2>Endringer</H2>
        <p>
          Vi oppdaterer denne siden når vi endrer hvordan vi behandler
          personopplysninger. Sist oppdatert: 18. oktober 2026.
        </p>
      </main>
    </div>
  );
}
