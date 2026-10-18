// Logo «Fra A til B»: en stiplet vei fra et startpunkt til en fullført
// oppgave (hake). Fargene følger temaet via CSS-variabler.
export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden="true"
      className="shrink-0 text-neutral-900"
    >
      <path
        d="M14 26.2C17 19.5 22 25 27.6 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray="0.1 5.2"
      />
      <circle cx="8.5" cy="31.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="29.5" cy="11" r="8" fill="var(--brand)" />
      <path
        d="M25.8 11.2l2.5 2.5 4.8-5"
        fill="none"
        stroke="var(--on-brand)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
