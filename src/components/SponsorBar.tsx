import { sponsors } from "@/data/sponsors";
import Link from "next/link";

export default function SponsorBar() {
  const row = [...sponsors, ...sponsors, ...sponsors, ...sponsors];
  return (
    <div className="border-t border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden relative z-10">
      <div className="flex items-center gap-6 px-4 py-2 text-xs text-neutral-500 whitespace-nowrap">
        <span className="font-semibold uppercase tracking-wide text-neutral-500">
          Sponsorer
        </span>
        <span className="text-[10px] uppercase tracking-wide text-amber-300/70 border border-amber-400/20 rounded px-1">
          Reklame
        </span>
        {row.map((s, i) => (
          <Link
            key={i}
            href={s.href}
            className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
          >
            <span className="font-mono text-[10px] bg-white/10 border border-white/10 rounded px-1 text-neutral-300">
              {s.initials}
            </span>
            <span className="font-medium text-neutral-300">{s.name}</span>
            <span>: {s.pitch}</span>
          </Link>
        ))}
        <Link
          href="/sponsor"
          className="font-medium text-violet-300 hover:text-violet-200 transition-colors"
        >
          + Din logo her: bli sponsor
        </Link>
      </div>
    </div>
  );
}
