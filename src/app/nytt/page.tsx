import Sidebar from "@/components/Sidebar";
import UseCaseCard from "@/components/UseCaseCard";
import { useCases } from "@/data/useCases";

export default function NyttPage() {
  const sorted = [...useCases].sort(
    (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
  );
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <h1 className="text-lg font-semibold mb-3">Nyeste use cases</h1>
        <div className="space-y-4">
          {sorted.map((u) => (
            <UseCaseCard key={u.id} item={u} />
          ))}
        </div>
      </main>
    </div>
  );
}
