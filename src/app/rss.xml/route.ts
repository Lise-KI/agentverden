import { useCases } from "@/data/useCases";
import { articles } from "@/data/articles";

export const dynamic = "force-static";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = useCases
    .map(
      (u) => `
    <item>
      <title>${escapeXml(u.title)}</title>
      <description>${escapeXml(u.description)}</description>
      <link>${articles[u.id] ? `https://agentverden.no/bruk/${u.id}/` : `https://agentverden.no/#${u.id}`}</link>
      <guid>${articles[u.id] ? `https://agentverden.no/bruk/${u.id}/` : `https://agentverden.no/#${u.id}`}</guid>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Agentverden</title>
    <link>https://agentverden.no</link>
    <description>Lær å bruke AI-agenter i hverdagen, med konkrete eksempler forklart på norsk.</description>
    <language>nb-NO</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
