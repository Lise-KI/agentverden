import { useCases } from "@/data/useCases";

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
      <link>https://agentverden.no/#${u.id}</link>
      <guid>https://agentverden.no/#${u.id}</guid>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Agentverden</title>
    <link>https://agentverden.no</link>
    <description>Ekte ting folk gjør med AI-agenter, samlet fra hele nettet hver dag.</description>
    <language>nb-NO</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
