import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import UseCaseGrid from "@/components/UseCaseGrid";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useCases } from "@/data/useCases";

export default function Home() {
  const trending = useCases.filter((u) => u.trending);
  const sortedByVotes = [...useCases].sort((a, b) => b.votes - a.votes);
  const newest = useCases.filter((u) => u.isNew);

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <input
            type="search"
            placeholder="Søk i use cases…"
            className="glass flex-1 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 outline-none focus:border-violet-400/50"
          />
          <div className="glass flex gap-1 rounded-lg p-1 text-sm">
            <button className="btn-stripe-primary rounded px-3 py-1">
              Topp
            </button>
            <Link
              href="/nytt"
              className="rounded px-3 py-1 text-neutral-400 hover:bg-white/5 hover:text-neutral-100 transition-colors"
            >
              Nytt
            </Link>
          </div>
        </div>

        <NewsletterSignup />

        {trending.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-3 text-neutral-50">
              Trender i dag
            </h2>
            <UseCaseGrid items={trending} listClassName="grid sm:grid-cols-2 gap-4" />
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3 text-neutral-50">Siste funn</h2>
          <UseCaseGrid items={sortedByVotes} />
        </section>

        {newest.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 text-neutral-50">Nyeste</h2>
            <UseCaseGrid items={newest} />
          </section>
        )}
      </main>
    </div>
  );
}
