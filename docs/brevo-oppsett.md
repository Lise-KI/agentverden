# Brevo-oppsett (sjekkliste)

Dette må gjøres inne i Brevo og hos Webhuset. Koden kan ikke styre det.

## Modell (eierens valg, okt. 2026)
Den som ber om e-boken, melder seg samtidig på nyhetsbrevet. E-boken er en velkomstgave. Det skal stå tydelig før man sender skjemaet, ikke i liten skrift.

## Avsender: ebok@agentverden.no
1. Opprett `ebok@agentverden.no` hos Webhuset (videresending/alias til hovedinnboksen holder). Kan gjøres nå, uavhengig av nameserver-flyttingen.
2. I Brevo: Senders & Domains → legg til avsender `ebok@agentverden.no`.
3. Domeneautentisering (brevo-code TXT, DKIM, DMARC): legges inn **etter** at nameserverne er flyttet til Cloudflare, så postene ikke må legges inn to ganger eller går tapt i flyttingen. Ikke endre MX.

## Skjema for e-bok (`BREVO_EBOOK_FORM_URL` i `src/config/brevo.ts`)
1. Ett felt: e-post. Ingen avkrysningsboks for nyhetsbrev.
2. Kontakten legges i listen **Nyhetsbrev** (gjerne også en egen liste/attributt «Kilde: e-bok» for statistikk).
3. Knappetekst: «Meld meg på og send e-boken».
4. Tekst over knappen (skal stå i Brevo-skjemaet også, ikke bare på siden rundt): «Du melder deg på nyhetsbrevet fra Agentverden og får e-boken som takk. Du kan melde deg av når som helst.»
5. Dobbel bekreftelse (double opt-in) skal være på. Kontakten havner ikke på listen før lenken er klikket.
6. Lenke til https://agentverden.no/personvern/ under skjemaet.

## Levering av e-boken
- PDF: `docs/10-ting-nordmenn-kan-gjore-med-ai.pdf`. Last den opp i Brevo (filbehandler) og legg lenken i den endelige bekreftelses-/velkomstmeldingen som sendes etter at adressen er bekreftet.
- PDF-en ligger bevisst **ikke** i `public/`. Alt i `public/` kan lastes ned av hvem som helst som kjenner URL-en.
- Velkomstmeldingen skal minne om at man er påmeldt nyhetsbrevet og ha avmeldingslenke.

## Skjema for nyhetsbrev (`BREVO_NEWSLETTER_FORM_URL`)
- Samme liste (Nyhetsbrev), dobbel bekreftelse, lenke til personvern.

## Sjekk før lansering
- Databehandleravtale (DPA) med Brevo er akseptert.
- Avmeldingslenke i alle utsendelser (Brevo legger den inn som standard; ikke fjern den).
- Embedden setter/laster ingen uventede cookies eller tredjepartsscript (påvirker personvernteksten).
- Personvernteksten (`docs/utkast-juridisk.md`) er gjennomgått av eier.
- Når URL-ene er satt, blir /ebok automatisk indekserbar og tatt med i sitemap.
