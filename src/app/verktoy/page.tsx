import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { toolRecommendations } from "@/data/toolRecommendations";

export const metadata: Metadata = {
  title: "Verktøy vi anbefaler",
  description:
    "AI- og automasjonsverktøy vi selv bruker eller har vurdert, rangert etter relevans for norske/nordiske brukere.",
  alternates: { canonical: "/verktoy/" },
};

export default function VerktoyPage() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-10 lg:px-8 max-w-3xl">
        <h1 className="heading-stripe text-3xl mb-4 text-neutral-50">
          Verktøy vi anbefaler
        </h1>

        {/* Fremtredende, lovpålagt reklamemerking — plassert først, godt synlig */}
        <div className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3 mb-6">
          <p className="text-sm font-semibold text-amber-200">
            REKLAME / ANNONSE
          </p>
          <p className="text-sm text-amber-100/90 mt-1">
            Denne siden omtaler verktøy vi kan ha eller får en provisjonsavtale
            med. Der en lenke under er en aktiv affiliate-lenke, er den
            tydelig merket «annonselenke». Du betaler ikke mer selv om vi
            tjener provisjon.
          </p>
        </div>

        <p className="text-neutral-300 mb-8">
          Vi har rangert ti internasjonale AI-/automasjonsselskaper etter hvor
          relevante de er for norske og nordiske brukere — basert på norsk
          språkstøtte og hvor dataene faktisk lagres. Disse fem skiller seg
          klart ut.
        </p>

        <div className="grid gap-4">
          {toolRecommendations.map((t) => {
            const isAffiliate = Boolean(t.affiliateUrl);
            const href = t.affiliateUrl ?? t.officialUrl;
            return (
              <div key={t.slug} className="glass rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-neutral-100">
                    {t.name}
                  </h2>
                  <span className="text-xs uppercase tracking-wide text-violet-300 shrink-0">
                    {t.tagline}
                  </span>
                </div>
                <p className="text-sm text-neutral-300 mb-2">
                  {t.description}
                </p>
                <p className="text-xs text-neutral-500 mb-3">
                  Nordisk relevans: {t.nordicFact}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel={isAffiliate ? "sponsored noopener" : "noopener"}
                  className="btn-stripe-primary inline-block text-sm px-3 py-1.5"
                >
                  {isAffiliate ? "Prøv (annonselenke) →" : "Besøk nettsiden →"}
                </a>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-neutral-500 mt-8">
          Kilder og detaljert begrunnelse per verktøy i vår{" "}
          <a
            href="/ansvarsfraskrivelse"
            className="underline hover:text-neutral-300"
          >
            ansvarsfraskrivelse
          </a>
          . Sist oppdatert: oktober 2026.
        </p>
      </main>
    </div>
  );
}
