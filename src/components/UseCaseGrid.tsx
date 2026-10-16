"use client";

import { useState } from "react";
import { UseCase } from "@/data/useCases";
import UseCaseCard from "@/components/UseCaseCard";
import UseCaseModal from "@/components/UseCaseModal";

export default function UseCaseGrid({
  items,
  listClassName = "space-y-4",
}: {
  items: UseCase[];
  listClassName?: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <div className={listClassName}>
        {items.map((u) => (
          <UseCaseCard key={u.id} item={u} onOpen={setSelectedId} />
        ))}
      </div>
      <UseCaseModal
        items={items}
        selectedId={selectedId}
        onClose={() => setSelectedId(null)}
        onSelect={setSelectedId}
      />
    </>
  );
}
