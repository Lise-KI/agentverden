#!/usr/bin/env python3
"""Bygger ukens nyhetsbrev-innhold for agentverden.no.

Leser src/data/useCases.ts, plukker de 5 nyeste sakene (etter dateAdded),
og skriver ut JSON (metadata) + en ferdig HTML-bolk (for Brevo-kampanjen)
til to filer i daily-update/. Rør ALDRI articles.ts eller selve nettsiden
her — dette scriptet er bare datauttrekk for e-postutsendelsen.

Bruk:
    python3 scripts/weekly_newsletter.py
Output:
    daily-update/newsletter-latest.json
    daily-update/newsletter-latest.html
"""
import json
import re
import sys
from datetime import date
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
USE_CASES_PATH = REPO_ROOT / "src" / "data" / "useCases.ts"
OUT_JSON = REPO_ROOT / "daily-update" / "newsletter-latest.json"
OUT_HTML = REPO_ROOT / "daily-update" / "newsletter-latest.html"

SITE = "https://agentverden.no"


def parse_use_cases(content: str):
    chunks = re.split(r'(?=\n\s*\{\s*\n\s*id: ")', content)
    items = []
    for ch in chunks:
        m_id = re.search(r'id: "([a-z0-9-]+)"', ch)
        if not m_id:
            continue
        m_title = re.search(r'title:\s*"((?:[^"\\]|\\.)*)"', ch)
        m_desc = re.search(r'description:\s*"((?:[^"\\]|\\.)*)"', ch)
        m_date = re.search(r'dateAdded:\s*"([0-9-]+)"', ch)
        m_cat = re.search(r'category:\s*"([a-z0-9-]+)"', ch)
        if not (m_title and m_date):
            continue
        items.append({
            "id": m_id.group(1),
            "title": m_title.group(1).replace('\\"', '"'),
            "description": (m_desc.group(1).replace('\\"', '"') if m_desc else ""),
            "dateAdded": m_date.group(1),
            "category": m_cat.group(1) if m_cat else "",
        })
    return items


def escape_html(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def build_html(top5, today: str) -> str:
    rows = []
    for u in top5:
        link = f"{SITE}/bruk/{u['id']}/"
        rows.append(f"""
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #e5e5e5;">
          <a href="{link}" style="color:#111;text-decoration:none;font-size:17px;font-weight:600;">
            {escape_html(u['title'])}
          </a>
          <p style="margin:6px 0 0;color:#444;font-size:14px;line-height:1.5;">
            {escape_html(u['description'])}
          </p>
          <a href="{link}" style="color:#2563eb;text-decoration:none;font-size:13px;">
            Les mer &rarr;
          </a>
        </td>
      </tr>""")
    body = "".join(rows)
    return f"""<!DOCTYPE html>
<html lang="nb">
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:24px 28px 8px;">
          <h1 style="margin:0;font-size:20px;color:#111;">Ukens 5 use cases fra Agentverden</h1>
          <p style="margin:8px 0 0;color:#666;font-size:13px;">{today} &middot; agentverden.no</p>
        </td></tr>
        <tr><td style="padding:0 28px;">
          <table width="100%" cellpadding="0" cellspacing="0">{body}
          </table>
        </td></tr>
        <tr><td style="padding:20px 28px 28px;">
          <a href="{SITE}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;
             padding:10px 18px;border-radius:6px;font-size:14px;">Se alle use cases</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""


def main():
    content = USE_CASES_PATH.read_text(encoding="utf-8")
    items = parse_use_cases(content)
    if len(items) < 5:
        print(f"FEIL: fant bare {len(items)} saker, forventet minst 5.", file=sys.stderr)
        sys.exit(1)

    items_sorted = sorted(items, key=lambda x: x["dateAdded"], reverse=True)
    top5 = items_sorted[:5]

    today = date.today().isoformat()
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps({"generatedAt": today, "items": top5}, ensure_ascii=False, indent=2), encoding="utf-8")
    OUT_HTML.write_text(build_html(top5, today), encoding="utf-8")

    print(f"OK: skrev {OUT_JSON} og {OUT_HTML}")
    for u in top5:
        print(f"  - {u['dateAdded']}  {u['id']}  {u['title']}")


if __name__ == "__main__":
    main()
