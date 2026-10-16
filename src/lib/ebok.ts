import { readFileSync } from "node:fs";
import { join } from "node:path";

// Leser docs/ebok.md ved bygging. Støtter bevisst bare: # tittel, ## overskrifter,
// avsnitt og **fet**. Alt annet (lister, lenker, kode, HTML) gir byggefeil, slik
// at innhold ikke forsvinner stille hvis markdown-filen utvides.
export type Ebok = {
  title: string;
  intro: string[];
  sections: { heading: string; paragraphs: string[] }[];
};

export function loadEbok(): Ebok {
  const raw = readFileSync(join(process.cwd(), "docs", "ebok.md"), "utf8");
  const blocks = raw.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);

  let title = "";
  const intro: string[] = [];
  const sections: Ebok["sections"] = [];

  for (const block of blocks) {
    if (/^(#{3,}|[-*+>]\s|\d+\.\s|```|<)/.test(block) || /\]\(|`/.test(block)) {
      throw new Error(`docs/ebok.md: ustøttet markdown: ${block.slice(0, 60)}`);
    }
    if (block.startsWith("# ")) {
      title = block.slice(2).trim();
    } else if (block.startsWith("## ")) {
      sections.push({ heading: block.slice(3).trim(), paragraphs: [] });
    } else if (sections.length === 0) {
      intro.push(block.replace(/\n/g, " "));
    } else {
      sections[sections.length - 1].paragraphs.push(block.replace(/\n/g, " "));
    }
  }
  if (!title) throw new Error("docs/ebok.md mangler # tittel");
  return { title, intro, sections };
}
