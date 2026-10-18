import { UseCase } from "@/data/useCases";
import UseCaseCard from "@/components/UseCaseCard";

export default function UseCaseGrid({
  items,
  listClassName = "space-y-4",
}: {
  items: UseCase[];
  listClassName?: string;
}) {
  return (
    <div className={listClassName}>
      {items.map((u) => (
        <UseCaseCard key={u.id} item={u} />
      ))}
    </div>
  );
}
