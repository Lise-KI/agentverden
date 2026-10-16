"use client";

import { useEffect, useRef, useState } from "react";
import { UseCase } from "@/data/useCases";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";

function agentName(slug: string) {
  return agents.find((a) => a.slug === slug)?.name ?? slug;
}

function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

// Enkel, lokal (per nettleser) reaksjon — ingen server bak dette ennå, så
// tallet er base-verdien fra data pluss evt. egne klikk lagret i localStorage.
function useLocalBump(id: string, base: number) {
  const [bump, setBump] = useState(0);
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(`av_bump_${id}`);
      if (raw === "1") {
        setBump(1);
        setPressed(true);
      }
    } catch {
      /* localStorage utilgjengelig (privat nettlesing e.l.) — ignorer */
    }
  }, [id]);
  const toggle = () => {
    const next = !pressed;
    setPressed(next);
    setBump(next ? 1 : 0);
    try {
      window.localStorage.setItem(`av_bump_${id}`, next ? "1" : "0");
    } catch {
      /* ignorer */
    }
  };
  return { count: base + bump, pressed, toggle };
}

export default function UseCaseModal({
  items,
  selectedId,
  onClose,
  onSelect,
}: {
  items: UseCase[];
  selectedId: string | null;
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const index = items.findIndex((u) => u.id === selectedId);
  const item = index >= 0 ? items[index] : null;
  const next = item ? items[(index + 1) % items.length] : null;

  const bump = useLocalBump(item?.id ?? "none", item?.votes ?? 0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
    } else if (!item && dialog.open) {
      dialog.close();
    }
    setCopied(false);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    try {
      setSaved(window.localStorage.getItem(`av_saved_${item.id}`) === "1");
    } catch {
      /* ignorer */
    }
  }, [item]);

  if (!item) {
    return (
      <dialog
        ref={dialogRef}
        className="bg-transparent p-0 m-auto"
        onClose={onClose}
      />
    );
  }

  const toggleSave = () => {
    const next = !saved;
    setSaved(next);
    try {
      window.localStorage.setItem(`av_saved_${item.id}`, next ? "1" : "0");
    } catch {
      /* ignorer */
    }
  };

  const copyPrompt = async () => {
    if (!item.promptTemplate) return;
    try {
      await navigator.clipboard.writeText(item.promptTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard kan være blokkert — knapp viser da bare ikke bekreftelse */
    }
  };

  const share = async () => {
    const url = `${window.location.origin}/#${item.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignorer */
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      className="bg-transparent p-0 m-auto w-full max-w-lg"
    >
      <div className="modal-panel rounded-2xl p-5 sm:p-6 max-h-[85vh] overflow-y-auto text-left">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-violet-300">
            {categoryName(item.category)}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Lukk"
            className="text-neutral-400 hover:text-neutral-100 text-lg leading-none -mt-1"
          >
            ✕
          </button>
        </div>

        <h2 className="text-lg font-semibold text-neutral-50 leading-snug mb-2">
          {item.title}
        </h2>
        <p className="text-sm text-neutral-400 mb-3">{item.description}</p>

        <div className="flex items-center gap-2 mb-4 text-xs text-neutral-400">
          <span>Gjort med</span>
          <span className="bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5 font-medium text-neutral-300">
            {agentName(item.agents[0])}
          </span>
          {item.agents.length > 1 && (
            <span>+ {item.agents.length - 1} til</span>
          )}
        </div>

        {item.whatTheyDid && (
          <section className="mb-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 mb-1">
              Hva de gjorde
            </h3>
            <p className="text-sm text-neutral-300">{item.whatTheyDid}</p>
          </section>
        )}
        {item.howItWent && (
          <section className="mb-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 mb-1">
              Hvordan det gikk
            </h3>
            <p className="text-sm text-neutral-300">{item.howItWent}</p>
          </section>
        )}
        {item.worthKnowing && (
          <section className="mb-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 mb-1">
              Verdt å vite
            </h3>
            <p className="text-sm text-neutral-300">{item.worthKnowing}</p>
          </section>
        )}

        {item.promptTemplate && (
          <section className="mb-4 rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 mb-1">
              Prøv selv — prompt-mal
            </h3>
            <p className="text-sm text-neutral-300 mb-2 whitespace-pre-wrap">
              {item.promptTemplate}
            </p>
            <button
              type="button"
              onClick={copyPrompt}
              className="text-xs font-semibold rounded-md bg-violet-500/20 border border-violet-400/30 text-violet-200 px-2.5 py-1 hover:bg-violet-500/30"
            >
              {copied ? "Kopiert ✓" : "Kopier prompt"}
            </button>
          </section>
        )}

        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
          Kilde: {item.source} · {item.sourceDate}
          {item.curatedFrom && <span>· via {item.curatedFrom}</span>}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            type="button"
            onClick={bump.toggle}
            aria-pressed={bump.pressed}
            className={`text-xs font-semibold rounded-md border px-2.5 py-1 ${
              bump.pressed
                ? "bg-violet-500/30 border-violet-400/40 text-violet-200"
                : "bg-white/[0.06] border-white/10 text-neutral-300 hover:bg-white/[0.1]"
            }`}
          >
            ▲ Jeg vil ha dette · {bump.count}
          </button>
          <button
            type="button"
            onClick={toggleSave}
            className={`text-xs font-semibold rounded-md border px-2.5 py-1 ${
              saved
                ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-200"
                : "bg-white/[0.06] border-white/10 text-neutral-300 hover:bg-white/[0.1]"
            }`}
          >
            {saved ? "Lagret ✓" : "Lagre"}
          </button>
          <button
            type="button"
            onClick={share}
            className="text-xs font-semibold rounded-md bg-white/[0.06] border border-white/10 text-neutral-300 px-2.5 py-1 hover:bg-white/[0.1]"
          >
            Del
          </button>
        </div>

        {next && (
          <button
            type="button"
            onClick={() => onSelect(next.id)}
            className="w-full text-left text-sm text-neutral-400 border-t border-white/10 pt-3 hover:text-neutral-100"
          >
            Neste: {next.title} →
          </button>
        )}
      </div>
    </dialog>
  );
}
