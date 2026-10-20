import Sidebar from "@/components/Sidebar";
import UseCaseGrid from "@/components/UseCaseGrid";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useCases } from "@/data/useCases";

export default function Home() {
  const trending = useCases.filter((u) => u.trending);
  // "Siste funn" skal vise dagens nye saker øverst, så gårsdagens, osv.
  // dateAdded mangler ikke på noen saker (backfilt 2026-10-20), men faller
  // tilbake til en gammel dato defensivt hvis et felt skulle mangle i fremtiden.
  const sortedByDate = [...useCases].sort(
    (a, b) =>
      new Date(b.dateAdded ?? "2000-01-01").getTime() -
      new Date(a.dateAdded ?? "2000-01-01").getTime()
  );
  const newest = useCases.filter((u) => u.isNew);

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <section className="mb-10 pt-2 lg:pt-6">
          <p className="font-mono text-xs uppercase tracking-wider text-brand mb-3">
            Agentverden · på norsk
          </p>
          <h1 className="heading-stripe text-[2.1rem] sm:text-5xl text-neutral-900 mb-4 max-w-2xl">
            Lær å bruke AI-agenter i hverdagen
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 max-w-xl mb-6">
            Konkrete eksempler på hva AI-agenter kan gjøre for deg, forklart
            enkelt på norsk. Finn en idé, kopier forslaget og prøv selv.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href="#nyhetsbrev"
              className="btn-stripe-primary text-center px-5 py-3 text-sm sm:text-base"
            >
              Få 5 eksempler i uken + gratis e-bok
            </a>
            <a
              href="#eksempler"
              className="glass glass-hover rounded-full text-center px-5 py-3 text-sm sm:text-base font-medium text-neutral-900"
            >
              Se eksemplene
            </a>
          </div>
          <ul className="grid sm:grid-cols-3 gap-2 text-sm text-neutral-700">
            {[
              ["Ekte eksempler", "Hva folk faktisk bruker AI-agenter til"],
              ["Forklart på norsk", "Uten unødvendig fagspråk"],
              ["Klart til bruk", "Forslag og maler du kan kopiere"],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-2">
                <span aria-hidden="true" className="text-brand font-bold">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold text-neutral-900">{t}.</strong>{" "}
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {trending.length > 0 && (
          <section id="eksempler" className="mb-10 scroll-mt-6">
            <h2 className="text-lg font-semibold mb-3 text-neutral-900">
              Trender i dag
            </h2>
            <UseCaseGrid items={trending} listClassName="grid sm:grid-cols-2 gap-4" />
          </section>
        )}

        <div className="mb-10">
          <NewsletterSignup />
        </div>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3 text-neutral-900">Siste funn</h2>
          <UseCaseGrid items={sortedByDate} />
        </section>

        {newest.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 text-neutral-900">Nyeste</h2>
            <UseCaseGrid items={newest} />
          </section>
        )}
      </main>
    </div>
  );
}
