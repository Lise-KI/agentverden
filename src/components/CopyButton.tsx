"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* utklippstavle utilgjengelig: teksten kan markeres manuelt */
        }
      }}
      className="text-xs font-semibold text-violet-300 hover:text-violet-200"
    >
      {copied ? "Kopiert" : "Kopier"}
    </button>
  );
}
