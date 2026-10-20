import { Fragment, type CSSProperties } from "react";
import { sponsors } from "@/data/sponsors";
import Link from "next/link";

// Fast sponsorbar nederst på skjermen, med uendelig CSS-marquee-rulling —
// samme mekanisme som agentusecases.ai sin bunnbar (to identiske sett
// side ved side i et "track", animert -50 % for sømløs løkke).
//
// Viktig detalj: med få sponsorer (i dag bare 1 plassholder) er det
// EKTE innholdet for smalt til å fylle bredden selv — da ser baren ut
// som den bare går over den venstre delen av skjermen, med tom hvit
// bakgrunn til høyre. Derfor gjentar vi listen innad i hvert sett nok
// ganger til at ett sett alltid er bredere enn skjermen, uansett
// skjermstørrelse og uansett hvor mange reelle sponsorer det er — færre
// gjentakelser trengs automatisk når det legges til flere reelle
// sponsorer i src/data/sponsors.ts, ingen kodeendring nødvendig da.
export default function SponsorBar() {
  const items = sponsors.length > 0 ? sponsors : [];
  // Mål: minst ~12 "blokker" (sponsor + CTA) samlet, uavhengig av hvor
  // mange reelle sponsorer det er, så ett sett alltid dekker selv brede
  // skjermer (ultrawide/4K).
  const repeatCount = Math.max(2, Math.ceil(12 / Math.max(1, items.length)));
  const blocksPerSet = repeatCount * items.length;
  // ~2,2 sekunder pr. blokk å rulle gjennom, minst 24s totalt.
  const durationSeconds = Math.max(24, Math.round(blocksPerSet * 2.2));

  return (
    <nav
      aria-label="Agentverden"
      data-sponsor-bar="true"
      className="sponsor-bar fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-neutral-200 bg-white"
    >
      <div
        className="sponsor-marquee min-w-0 flex-1"
        style={{ "--sponsor-duration": `${durationSeconds}s` } as CSSProperties}
      >
        <div className="sponsor-track">
          <SponsorSet items={items} repeatCount={repeatCount} />
          <SponsorSet items={items} repeatCount={repeatCount} clone />
        </div>
      </div>
    </nav>
  );
}

function SponsorSet({
  items,
  repeatCount,
  clone = false,
}: {
  items: typeof sponsors;
  repeatCount: number;
  clone?: boolean;
}) {
  return (
    <div
      className={`sponsor-set${clone ? " sponsor-clone" : ""}`}
      aria-hidden={clone || undefined}
    >
      {Array.from({ length: repeatCount }).map((_, blockIndex) => (
        <Fragment key={blockIndex}>
          {items.map((s, i) => (
            <Link
              key={`${blockIndex}-${s.name}-${i}`}
              href={s.href}
              tabIndex={clone ? -1 : undefined}
              className={`group flex h-full shrink-0 items-center gap-2 px-4 text-[13px] font-medium whitespace-nowrap transition-colors sm:px-5 sm:text-[15px] ${
                s.accent
                  ? "font-semibold text-brand hover:underline"
                  : "text-neutral-700 hover:text-neutral-900"
              }`}
            >
              {s.initials && (
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-[5px] border border-neutral-200 bg-neutral-50 font-mono text-[10px] text-neutral-700 sm:size-7 sm:text-[11px]">
                  {s.initials}
                </span>
              )}
              <span className="inline-flex items-baseline">
                <span className={s.accent ? "" : "group-hover:text-brand"}>{s.name}</span>
                {s.pitch && (
                  <span className="font-normal text-neutral-500">: {s.pitch}</span>
                )}
              </span>
            </Link>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
