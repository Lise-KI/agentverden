import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-white/[0.02] backdrop-blur-xl relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
        <span>
          © 2026 Agentverden. Alle use cases er omskrevet i egne ord med lenke
          til kilden der det er tilgjengelig.
        </span>
        <nav className="flex gap-4">
          <Link href="/om" className="hover:text-neutral-200 transition-colors">
            Om
          </Link>
          <Link href="/ebok" className="hover:text-neutral-200 transition-colors">
            E-bok
          </Link>
          <Link href="/rss.xml" className="hover:text-neutral-200 transition-colors">
            RSS
          </Link>
          <Link
            href="/personvern"
            className="hover:text-neutral-200 transition-colors"
          >
            Personvern
          </Link>
          <Link
            href="/ansvarsfraskrivelse"
            className="hover:text-neutral-200 transition-colors"
          >
            Ansvarsfraskrivelse
          </Link>
        </nav>
      </div>
    </footer>
  );
}
