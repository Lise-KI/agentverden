import Link from "next/link";
import {
  BREVO_EBOOK_FORM_URL,
  BREVO_NEWSLETTER_FORM_URL,
} from "@/config/brevo";

type Variant = "newsletter" | "ebook";

const copy: Record<
  Variant,
  {
    heading: string;
    what: string;
    formUrl: string;
    title: string;
    button: string;
  }
> = {
  newsletter: {
    heading: "Få nye eksempler på e-post",
    what: "Du melder deg på nyhetsbrevet fra Agentverden: norske eksempler på hva folk gjør med AI-agenter, rett i innboksen.",
    formUrl: BREVO_NEWSLETTER_FORM_URL,
    title: "Påmelding til nyhetsbrev fra Agentverden",
    button: "Meld meg på",
  },
  ebook: {
    heading: "Meld deg på nyhetsbrevet og få e-boken gratis",
    what: "Du melder deg på nyhetsbrevet fra Agentverden, med norske eksempler på hva folk gjør med AI-agenter. Som takk får du e-boken tilsendt på e-post. Du kan melde deg av når som helst, og e-boken beholder du.",
    formUrl: BREVO_EBOOK_FORM_URL,
    title: "Påmelding til nyhetsbrev og e-bok fra Agentverden",
    button: "Meld meg på og send e-boken",
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
        className="text-lg font-semibold mb-1 text-neutral-900"
      >
        {c.heading}
      </h2>
      <p className="text-sm text-neutral-700 mb-3">{c.what}</p>

      {c.formUrl ? (
        <iframe
          src={c.formUrl}
          title={c.title}
          loading="lazy"
          className="w-full min-h-[320px] border-0"
        />
      ) : (
        <div className="border border-dashed border-neutral-300 rounded-lg p-3 space-y-2">
          <div className="flex gap-2">
            <input
              type="email"
              disabled
              aria-label="E-postadresse"
              placeholder="din@epost.no"
              className="flex-1 min-w-0 rounded border border-neutral-200 bg-white px-2 py-1.5 text-sm text-neutral-700 placeholder:text-neutral-600"
            />
            <button
              disabled
              className="btn-stripe-primary opacity-40 text-sm px-3 py-1.5"
            >
              {c.button}
            </button>
          </div>
          <p role="status" className="text-xs text-neutral-500">
            Påmeldingen er ikke åpnet ennå.
          </p>
        </div>
      )}

      <p className="text-xs text-neutral-500 mt-3">
        Etter påmelding får du en e-post der du må bekrefte adressen din
        (dobbel bekreftelse). Du kan melde deg av når som helst. Les{" "}
        <Link
          href="/personvern"
          className="underline text-brand hover:text-brand-dark"
        >
          personvernerklæringen
        </Link>
        .
      </p>
    </section>
  );
}
