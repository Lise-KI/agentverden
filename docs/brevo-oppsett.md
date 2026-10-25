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
5. Enkel bekreftelse (single opt-in), eierens valg okt. 2026. Påkrevd avkrysningsboks som IKKE er forhåndsavkrysset: «Ja, jeg vil ha e-boken og nyhetsbrevet fra Agentverden. Jeg har lest personvernerklæringen.» E-boken sendes på e-post (ikke vist på skjermen), så bare den som eier adressen får den.
6. Lenke til https://agentverden.no/personvern/ under skjemaet.

## Levering av e-boken
- Brevos mediebibliotek tar ikke imot PDF. E-boken ligger derfor på en ulenket adresse på siden:
  https://agentverden.no/f/02dc103e1448/10-ting-nordmenn-kan-gjore-med-ai.pdf
- Den er ikke lenket fra nettstedet, står ikke i sitemap, og `public/_headers` sender `X-Robots-Tag: noindex`.
- Lenken legges i bekreftelses-e-posten som sendes rett etter påmelding.
- Ved ny utgave: bytt filen i `public/f/02dc103e1448/` (samme navn), eller lag ny mappe og oppdater lenken i Brevo.

## Skjema for nyhetsbrev (`BREVO_NEWSLETTER_FORM_URL`)
- Samme liste (Nyhetsbrev), samme avkrysningsboks, lenke til personvern.

## Sjekk før lansering
- Databehandleravtale (DPA) med Brevo er akseptert.
- Avmeldingslenke i alle utsendelser (Brevo legger den inn som standard; ikke fjern den).
- Embedden setter/laster ingen uventede cookies eller tredjepartsscript (påvirker personvernteksten).
- Personvernteksten (`docs/utkast-juridisk.md`) er gjennomgått av eier.
- Når URL-ene er satt, blir /ebok automatisk indekserbar og tatt med i sitemap.
