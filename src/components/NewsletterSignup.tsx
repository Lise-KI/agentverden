import Link from "next/link";
import Script from "next/script";
import { BREVO_FORM_ACTION, BREVO_SCRIPT } from "@/config/brevo";

type Variant = "newsletter" | "ebook";

const headings: Record<Variant, { heading: string; what: string }> = {
  newsletter: {
    heading: "Få 5 use cases i uken",
    what: "Gratis nyhetsbrev fra Agentverden med fem nye, norske eksempler på hva folk gjør med AI-agenter, én gang i uken. Som takk får du e-boken «10 ting nordmenn kan gjøre med AI i hverdagen».",
  },
  ebook: {
    heading: "Meld deg på nyhetsbrevet og få e-boken gratis",
    what: "Du melder deg på nyhetsbrevet fra Agentverden: fem nye, norske eksempler på hva folk gjør med AI-agenter, én gang i uken. Som takk får du e-boken. Du kan melde deg av når som helst, og e-boken beholder du.",
  },
};

// Tekster som Brevos skript (main.js) viser ved feil, på norsk.
const brevoMessages = `
window.LOCALE='en';
window.EMAIL_INVALID_MESSAGE=window.SMS_INVALID_MESSAGE="Sjekk at e-postadressen er skrevet riktig.";
window.REQUIRED_ERROR_MESSAGE="Dette feltet må fylles ut.";
window.GENERIC_INVALID_MESSAGE="Noe er feil i skjemaet. Sjekk feltene og prøv igjen.";
window.INVALID_NUMBER=window.GENERIC_INVALID_MESSAGE;
window.INVALID_DATE="Skriv inn en gyldig dato.";
window.REQUIRED_CODE_ERROR_MESSAGE="Velg landskode.";
window.REQUIRED_MULTISELECT_MESSAGE="Velg minst ett alternativ.";
window.translation={common:{selectedList:'{quantity} liste valgt',selectedLists:'{quantity} lister valgt',selectedOption:'{quantity} valgt',selectedOptions:'{quantity} valgt'}};
var AUTOHIDE=Boolean(0);`;

// Påmeldingsskjema. Markupen følger strukturen Brevos main.js forventer
// (id-er og klassenavn), men er stylet som resten av siden.
export default function NewsletterSignup({
  variant = "newsletter",
}: {
  variant?: Variant;
}) {
  const c = headings[variant];

  return (
    <section
      id="nyhetsbrev"
      aria-labelledby="signup-heading"
      className="glass rounded-xl p-4 sm:p-5 mt-10 scroll-mt-6"
    >
      <h2
        id="signup-heading"
        className="text-lg font-semibold mb-1 text-neutral-900"
      >
        {c.heading}
      </h2>
      <p className="text-sm text-neutral-700 mb-4">{c.what}</p>

      <div className="sib-form">
        <div id="sib-form-container" className="sib-form-container">
          <div
            id="error-message"
            className="sib-form-message-panel rounded-lg border border-red-300 bg-red-50 text-red-800 p-3 text-sm mb-3"
          >
            <span className="sib-form-message-panel__inner-text">
              Påmeldingen ble ikke lagret. Prøv igjen om litt.
            </span>
          </div>
          <div
            id="success-message"
            className="sib-form-message-panel rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 p-3 text-sm mb-3"
          >
            <span className="sib-form-message-panel__inner-text">
              Takk, du er påmeldt! Sjekk innboksen din, e-boken er på vei. Fant
              du den ikke, se i søppelpost.
            </span>
          </div>

          <div id="sib-container">
            <form
              id="sib-form"
              method="POST"
              action={BREVO_FORM_ACTION}
              data-type="subscription"
              className="space-y-3"
            >
              <div className="sib-input sib-form-block">
                <div className="form__entry entry_block">
                  <label
                    htmlFor="EMAIL"
                    className="entry__label block text-sm font-medium text-neutral-900 mb-1"
                  >
                    E-postadresse
                  </label>
                  <div className="entry__field">
                    <input
                      className="input w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand"
                      type="email"
                      id="EMAIL"
                      name="EMAIL"
                      autoComplete="email"
                      placeholder="din@epost.no"
                      data-required="true"
                      required
                    />
                  </div>
                  <label className="entry__error entry__error--primary block text-xs text-red-700 mt-1" />
                </div>
              </div>

              <div className="sib-optin sib-form-block" data-required="true">
                <div className="form__entry entry_mcq">
                  <div className="entry__choice">
                    <label className="flex items-start gap-2 text-sm text-neutral-700 cursor-pointer">
                      <input
                        type="checkbox"
                        className="input_replaced mt-0.5 h-4 w-4 accent-[var(--brand)]"
                        value="1"
                        id="OPT_IN"
                        name="OPT_IN"
                        required
                      />
                      <span>
                        Ja, jeg vil ha e-boken og nyhetsbrevet fra Agentverden
                        (5 use cases i uken).
                        Jeg har lest{" "}
                        <Link
                          href="/personvern"
                          className="underline text-brand hover:text-brand-dark"
                        >
                          personvernerklæringen
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                  <label className="entry__error entry__error--primary block text-xs text-red-700 mt-1" />
                </div>
              </div>

              {/* Felle for roboter (Brevo): skal være tom og skjult. */}
              <input
                type="text"
                name="email_address_check"
                defaultValue=""
                className="input--hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <input type="hidden" name="locale" value="en" />

              <button
                className="sib-form-block__button sib-form-block__button-with-loader btn-stripe-primary px-5 py-2.5 text-sm"
                form="sib-form"
                type="submit"
              >
                <svg
                  className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                  viewBox="0 0 512 512"
                  width="14"
                  height="14"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
                  />
                </svg>
                Send meg e-boken
              </button>
            </form>
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-500 mt-3">
        Du kan melde deg av når som helst via lenken nederst i hver e-post.
        Skjemaet sendes til e-posttjenesten Brevo.
      </p>

      <Script id="brevo-messages" strategy="afterInteractive">
        {brevoMessages}
      </Script>
      <Script src={BREVO_SCRIPT} strategy="afterInteractive" />
    </section>
  );
}
