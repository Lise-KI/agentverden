export type Agent = {
  slug: string;
  name: string;
  initials: string;
  count: number;
};

export const agents: Agent[] = [
  { slug: "grok-bot", name: "Grok Bot", initials: "GB", count: 0 },
  { slug: "claude-code", name: "Claude Code", initials: "CC", count: 0 },
  { slug: "claude", name: "Claude", initials: "CL", count: 0 },
  { slug: "n8n", name: "n8n", initials: "N8", count: 0 },
  { slug: "openclaw", name: "OpenClaw", initials: "OC", count: 0 },
  { slug: "chatgpt-agent", name: "ChatGPT Agent", initials: "GA", count: 0 },
  { slug: "claude-cowork", name: "Claude Cowork", initials: "CW", count: 0 },
  { slug: "codex", name: "Codex", initials: "CX", count: 0 },
  { slug: "meta-muse", name: "Meta Muse", initials: "MM", count: 0 },
  { slug: "gemini", name: "Gemini", initials: "GE", count: 0 },
  { slug: "chatgpt", name: "ChatGPT", initials: "GP", count: 0 },
  { slug: "manus", name: "Manus", initials: "MA", count: 0 },
  { slug: "egen-agent", name: "Egen agent", initials: "··", count: 0 },
];
