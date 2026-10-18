import Link from "next/link";
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
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-2xl space-y-4 text-neutral-700">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-900">
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
            className="underline text-brand hover:text-brand-dark"
          >
            agentusecases.ai
          </a>
          . Strukturen er lik, men innholdet er skrevet om på norsk og
          logoene er egne.
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2 text-neutral-900">
          Send inn en use case
        </h2>
        <p>
          Har du brukt AI til noe nyttig i hverdagen?{" "}
          <Link
            href="/send-inn"
            className="underline text-brand hover:text-brand-dark"
          >
            Send oss eksempelet ditt
          </Link>
          .
        </p>
        <h2 className="text-lg font-semibold mt-8 mb-2 text-neutral-900">
          Nyhetsbrev og drift
        </h2>
        <p>
          Nyhetsbrevet kommer én gang i uken med fem nye eksempler.{" "}
          <Link
            href="/ebok/#nyhetsbrev"
            className="underline text-brand hover:text-brand-dark"
          >
            Meld deg på her
          </Link>
          , så får du også e-boken gratis.
        </p>
      </main>
    </div>
  );
}
