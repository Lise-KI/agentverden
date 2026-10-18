#!/usr/bin/env python3
"""Genererer docs/<slug>.pdf fra docs/ebok.md.

Bruker samme strenge parsing-regler som src/lib/ebok.ts (kun # tittel,
## overskrifter, avsnitt og **fet**), bygger en frittstående HTML-fil med
samme fargepalett som den opprinnelige, manuelt lagde PDF-en, og printer
den til PDF med lokalt installert Google Chrome (headless).

Kjøres med: python3 scripts/generate_ebok_pdf.py
"""

import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MD_PATH = ROOT / "docs" / "ebok.md"
OUT_PDF = ROOT / "docs" / "10-ting-nordmenn-kan-gjore-med-ai.pdf"
TMP_HTML = ROOT / "docs" / "_ebok_build.html"

ACCENT = "#6d5bd0"
INK = "#15152b"
BODY = "#33334a"
PROMPT_BG = "#f1effa"
PROMPT_BORDER = "#ded9f7"
MUTED = "#6b6b80"


def parse_markdown(raw: str):
    blocks = raw.replace("\r\n", "\n").strip().split("\n\n")
    # ebok.ts splits on 2+ newlines; collapse 3+ back to blocks correctly
    blocks = re.split(r"\n{2,}", raw.replace("\r\n", "\n").strip())

    title = ""
    intro = []
    sections = []
    list_re = re.compile(r"^(#{3,}|[-*+>]\s|\d+\.\s|```|<)")
    for block in blocks:
        if list_re.match(block) or "](" in block or "`" in block:
            raise ValueError(f"docs/ebok.md: ustottet markdown: {block[:60]!r}")
        if block.startswith("# "):
            title = block[2:].strip()
        elif block.startswith("## "):
            sections.append({"heading": block[3:].strip(), "paragraphs": []})
        elif not sections:
            intro.append(block.replace("\n", " "))
        else:
            sections[-1]["paragraphs"].append(block.replace("\n", " "))
    if not title:
        raise ValueError("docs/ebok.md mangler # tittel")
    return title, intro, sections


def escape(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def render_inline(text: str) -> str:
    text = escape(text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    return text


def render_paragraph(p: str) -> str:
    is_prompt = p.strip().startswith("**Prompt:**")
    cls = "prompt-box" if is_prompt else "p"
    return f'<p class="{cls}">{render_inline(p)}</p>'


def build_html(title: str, intro: list[str], sections: list[dict]) -> str:
    toc_items = "".join(
        f'<div class="toc-item">{escape(s["heading"])}</div>' for s in sections
    )
    intro_html = "".join(render_paragraph(p) for p in intro)
    sections_html = ""
    for s in sections:
        body = "".join(render_paragraph(p) for p in s["paragraphs"])
        sections_html += f'<section class="item"><h2>{render_inline(s["heading"])}</h2>{body}</section>'

    return f"""<!doctype html>
<html lang="no">
<head>
<meta charset="utf-8">
<title>{escape(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  @page {{ size: A4; margin: 22mm 18mm 20mm 18mm; }}
  * {{ box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
  html, body {{ margin: 0; padding: 0; background: #ffffff; }}
  body {{
    font-family: "Inter", Arial, Helvetica, sans-serif;
    color: {BODY};
    font-size: 11pt;
    line-height: 1.55;
  }}
  .label {{
    color: {ACCENT};
    font-weight: 700;
    letter-spacing: 0.14em;
    font-size: 9.5pt;
    text-transform: uppercase;
    margin-bottom: 10mm;
  }}
  .cover {{ page-break-after: always; padding-top: 50mm; }}
  .cover h1 {{
    color: {INK};
    font-size: 30pt;
    font-weight: 800;
    line-height: 1.18;
    margin: 0 0 10mm 0;
  }}
  .cover .sub {{
    color: {MUTED};
    font-size: 12pt;
    max-width: 120mm;
    line-height: 1.6;
  }}
  .cover .footer-tag {{
    position: absolute;
    bottom: 22mm;
    color: {MUTED};
    font-size: 9pt;
  }}
  .toc {{ page-break-after: always; }}
  .toc h2 {{ color: {INK}; font-size: 15pt; font-weight: 800; margin-bottom: 8mm; }}
  .toc-item {{
    color: {BODY};
    font-size: 11pt;
    margin-bottom: 3.2mm;
    padding-left: 5mm;
    border-left: 2px solid {PROMPT_BORDER};
  }}
  h1.doc-title {{ color: {INK}; font-size: 20pt; font-weight: 800; margin: 0 0 6mm 0; }}
  .p {{ margin: 0 0 4mm 0; }}
  .item {{ margin-bottom: 7mm; break-inside: avoid; }}
  .item h2 {{
    color: {INK};
    font-size: 13pt;
    font-weight: 700;
    margin: 0 0 3mm 0;
  }}
  .prompt-box {{
    background: {PROMPT_BG};
    border: 1px solid {PROMPT_BORDER};
    border-radius: 10px;
    padding: 4mm 5mm;
    margin: 3mm 0 4mm 0;
    font-size: 10.3pt;
    color: {INK};
  }}
  .prompt-box strong {{ color: {ACCENT}; }}
  .closing {{
    margin-top: 10mm;
    padding: 6mm;
    background: {PROMPT_BG};
    border-radius: 10px;
  }}
  .closing h2 {{ color: {INK}; font-size: 13pt; margin: 0 0 3mm 0; }}
</style>
</head>
<body>
  <div class="cover">
    <div class="label">AGENTVERDEN</div>
    <h1>{escape(title)}</h1>
    <p class="sub">Gratis e-bok med konkrete, hverdagslige eksempler p\u00e5 hvordan du kan bruke AI-agenter som ChatGPT og Claude &mdash; med ferdige prompter du kan lime rett inn.</p>
    <div class="footer-tag">agentverden.no</div>
  </div>

  <div class="toc">
    <div class="label">Innhold</div>
    <h2>Dette finner du i e-boken</h2>
    {toc_items}
  </div>

  <div>
    <div class="label">AGENTVERDEN</div>
    {intro_html}
    {sections_html}
  </div>
</body>
</html>"""


def find_chrome() -> str:
    candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        shutil.which("google-chrome"),
        shutil.which("chromium"),
    ]
    for c in candidates:
        if c and Path(c).exists():
            return c
    raise RuntimeError("Fant ikke Chrome/Chromium for headless PDF-print")


def main():
    raw = MD_PATH.read_text(encoding="utf-8")
    title, intro, sections = parse_markdown(raw)
    html = build_html(title, intro, sections)
    TMP_HTML.write_text(html, encoding="utf-8")

    chrome = find_chrome()
    cmd = [
        chrome,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={OUT_PDF}",
        "--print-to-pdf-no-header",
        "--no-sandbox",
        f"file://{TMP_HTML}",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    TMP_HTML.unlink(missing_ok=True)
    if result.returncode != 0 or not OUT_PDF.exists():
        print(result.stdout, file=sys.stderr)
        print(result.stderr, file=sys.stderr)
        raise RuntimeError("Chrome headless print-to-pdf feilet")
    print(f"OK: skrev {OUT_PDF} ({OUT_PDF.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
