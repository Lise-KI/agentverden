import Link from "next/link";
import {
  BREVO_EBOOK_FORM_URL,
  BREVO_NEWSLETTER_FORM_URL,
} from "@/config/brevo";

type Variant = "newsletter" | "ebook";

const copy: Record<
  Variant,
  { heading: string; what: string; formUrl: string; title: string }
> = {
  newsletter: {
    heading: "Få nye eksempler på e-post",
    what: "Du melder deg på nyhetsbrevet fra Agentverden: norske eksempler på hva folk gjør med AI-agenter, rett i innboksen.",
    formUrl: BREVO_NEWSLETTER_FORM_URL,
    title: "Påmelding til nyhetsbrev fra Agentverden",
  },
  ebook: {
    heading: "Få e-boken gratis",
    what: "Du får e-boken «10 ting nordmenn kan gjøre med AI i hverdagen» tilsendt på e-post.",
    formUrl: BREVO_EBOOK_FORM_URL,
    title: "Last ned e-boken fra Agentverden",
  },
};

export default function NewsletterSignup({
  variant = "newsletter",
}: {
  variant?: Variant;
}) {
  const c = copy[variant];

  return (
    <section
      aria-labelledby={`signup-${variant}`}
      className="glass rounded-xl p-4 mt-10"
    >
      <h2
        id={`signup-${variant}`}
        className="text-lg font-semibold mb-1 text-neutral-50"
      >
        {c.heading}
      </h2>
      <p className="text-sm text-neutral-300 mb-3">{c.what}</p>

      {c.formUrl ? (
        <iframe
          src={c.formUrl}
          title={c.title}
          loading="lazy"
          className="w-full min-h-[320px] border-0"
        />
      ) : (
        <p
          role="status"
          className="text-sm text-neutral-400 border border-dashed border-white/15 rounded-lg p-3"
        >
          Påmeldingen er ikke åpnet ennå.
        </p>
      )}

      <p className="text-xs text-neutral-500 mt-3">
        Etter påmelding får du en e-post der du må bekrefte adressen din
        (dobbel bekreftelse). Du kan melde deg av når som helst. Les{" "}
        <Link
          href="/personvern"
          className="underline text-violet-300 hover:text-violet-200"
        >
          personvernerklæringen
        </Link>
        .
      </p>
    </section>
  );
}
