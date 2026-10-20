import type { CSSProperties } from "react";
import { sponsors } from "@/data/sponsors";
import Link from "next/link";

// Fast sponsorbar nederst på skjermen, med uendelig CSS-marquee-rulling —
// samme mekanisme som agentusecases.ai sin bunnbar (to identiske sett
// side ved side, animert -50 % for sømløs løkke). Innholdet i
// src/data/sponsors.ts er fortsatt bare plassholderen vi hadde før;
// baren er nå bare bygget "dynamisk" slik at nye sponsorer kan legges
// til i den filen uten at komponenten må endres, og farten justeres
// automatisk etter hvor mye innhold det er.
export default function SponsorBar() {
  const items = sponsors.length > 0 ? sponsors : [];
  // ~6 sekunder per element å rulle gjennom, minst 20s så det ikke blir
  // ubehagelig fort med få/ingen reelle sponsorer ennå.
  const durationSeconds = Math.max(20, items.length * 6);

  return (
    <nav
      aria-label="Sponsorer"
      data-sponsor-bar="true"
      className="sponsor-bar fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-neutral-200 bg-white"
    >
      <span className="hidden shrink-0 items-center gap-1.5 border-r border-neutral-200 px-3 font-mono text-[10px] tracking-widest text-neutral-500 uppercase sm:flex">
        Sponsorer
        <span className="rounded border border-amber-300 px-1 text-[9px] tracking-wide text-amber-700 normal-case">
          Reklame
        </span>
      </span>
      <div
        className="sponsor-marquee min-w-0 flex-1"
        style={{ "--sponsor-duration": `${durationSeconds}s` } as CSSProperties}
      >
        <div className="sponsor-track">
          <SponsorSet items={items} />
          <SponsorSet items={items} clone />
        </div>
      </div>
    </nav>
  );
}

function SponsorSet({
  items,
  clone = false,
}: {
  items: typeof sponsors;
  clone?: boolean;
}) {
  return (
    <div
      className={`sponsor-set${clone ? " sponsor-clone" : ""}`}
      aria-hidden={clone || undefined}
    >
      {items.map((s, i) => (
        <Link
          key={`${s.initials}-${i}`}
          href={s.href}
          tabIndex={clone ? -1 : undefined}
          className="group flex h-full shrink-0 items-center gap-2 px-4 text-[13px] font-medium whitespace-nowrap text-neutral-700 transition-colors hover:text-neutral-900 sm:px-5 sm:text-[15px]"
        >
          <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-[5px] border border-neutral-200 bg-neutral-50 font-mono text-[10px] text-neutral-700 sm:size-7 sm:text-[11px]">
            {s.initials}
          </span>
          <span className="inline-flex items-baseline">
            <span className="group-hover:text-brand">{s.name}</span>
            <span className="font-normal text-neutral-500">: {s.pitch}</span>
          </span>
        </Link>
      ))}
      <Link
        href="/sponsor"
        tabIndex={clone ? -1 : undefined}
        className="group flex h-full shrink-0 items-center gap-2 px-3 text-[11px] font-normal whitespace-nowrap text-neutral-400 transition-colors hover:text-neutral-900"
      >
        <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-dashed border-neutral-300 text-[8px] text-neutral-400">
          +
        </span>
        <span>Din Logo her: bli sponsor</span>
      </Link>
    </div>
  );
}
