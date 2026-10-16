# Brevo-oppsett (sjekkliste)

Dette må gjøres inne i Brevo. Koden kan ikke styre det.

## Skjema for e-bok (`BREVO_EBOOK_FORM_URL` i `src/config/brevo.ts`)
1. Knappetekst: «Få e-boken i innboksen».
2. Dobbel bekreftelse (double opt-in) skal være på.
3. Egen avkrysningsboks, **ikke forhåndsavkrysset**: «Ja, jeg vil også ha nyhetsbrev fra Agentverden». Siden sier at nyhetsbrev bare gis hvis man krysser av.
4. Tekst under skjemaet med lenke til https://agentverden.no/personvern/.

## Levering av e-boken
- PDF: `docs/10-ting-nordmenn-kan-gjore-med-ai.pdf`. Last den opp i Brevo og send den som vedlegg/lenke i bekreftelses- eller velkomstmeldingen etter at adressen er bekreftet.
- PDF-en ligger bevisst **ikke** i `public/`. Alt i `public/` kan lastes ned av hvem som helst som kjenner URL-en, uten å melde seg på.

## Skjema for nyhetsbrev (`BREVO_NEWSLETTER_FORM_URL`)
- Dobbel bekreftelse på, lenke til personvern, tydelig tekst om hva man melder seg på.

## Sjekk før lansering
- Databehandleravtale (DPA) med Brevo er akseptert.
- Embedden setter/ laster ingen uventede cookies eller tredjepartsscript (påvirker personvernteksten).
- Når URL-ene er satt blir /ebok automatisk indekserbar og tatt med i sitemap.
