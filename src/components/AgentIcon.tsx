// Små fargede ikoner per agent: avrundet rute med svak fargetone og en
// strektegnet figur. Egne, enkle figurer (ikke produsentenes logoer).
type IconDef = { color: string; svg: React.ReactNode };

const icons: Record<string, IconDef> = {
  "grok-bot": { color: "#64748b", svg: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /> },
  "claude-code": {
    color: "#d97757",
    svg: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  claude: {
    color: "#d97757",
    svg: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />,
  },
  n8n: {
    color: "#ea4b71",
    svg: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
        <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
      </>
    ),
  },
  openclaw: {
    color: "#e5484d",
    svg: (
      <>
        <path d="M7 15c0-3 2.2-5 5-5s5 2 5 5-2.2 5-5 5-5-2-5-5z" />
        <circle cx="5.5" cy="9" r="1.5" />
        <circle cx="9.5" cy="5.5" r="1.5" />
        <circle cx="14.5" cy="5.5" r="1.5" />
        <circle cx="18.5" cy="9" r="1.5" />
      </>
    ),
  },
  "chatgpt-agent": { color: "#10a37f", svg: <path d="M4 4l7 16 2.5-6.5L20 11z" /> },
  "claude-cowork": {
    color: "#c2410c",
    svg: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  },
  codex: {
    color: "#0f766e",
    svg: (
      <>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </>
    ),
  },
  "meta-muse": {
    color: "#0866ff",
    svg: (
      <path d="M6 9c-2.2 0-4 1.3-4 3s1.8 3 4 3c3 0 9-6 12-6 2.2 0 4 1.3 4 3s-1.8 3-4 3c-3 0-9-6-12-6z" />
    ),
  },
  gemini: {
    color: "#4285f4",
    svg: (
      <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10z" />
    ),
  },
  chatgpt: {
    color: "#10a37f",
    svg: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z" />,
  },
  manus: {
    color: "#7c3aed",
    svg: (
      <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11m0-6.5a1.5 1.5 0 0 1 3 0V11m0-5a1.5 1.5 0 0 1 3 0v7a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.6-2.2L3.5 14a1.5 1.5 0 0 1 2.3-1.9L8 14" />
    ),
  },
  "egen-agent": {
    color: "#d97706",
    svg: (
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />
    ),
  },
};

const fallback: IconDef = { color: "#71717a", svg: <circle cx="12" cy="12" r="6" /> };

export default function AgentIcon({
  slug,
  size = 22,
}: {
  slug: string;
  size?: number;
}) {
  const { color, svg } = icons[slug] ?? fallback;
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-md border"
      style={{
        width: size,
        height: size,
        color,
        backgroundColor: `${color}1f`,
        borderColor: `${color}40`,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={Math.round(size * 0.62)}
        height={Math.round(size * 0.62)}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {svg}
      </svg>
    </span>
  );
}
