# Agentverden – prosjektkontekst og regler

Les også `AGENTS.md` (Next.js 16 har brytende endringer; les `node_modules/next/dist/docs/` før du skriver kode).

## Hva dette er
Agentverden er en norsk katalog over bruksområder for AI-agenter, for privatpersoner. Mål-domene: **agentverden.no**.

## Teknisk
- Repo: https://github.com/Lise-KI/agentverden (privat, eid av Lise-KI), branch `main`.
- Stack: Next.js 16.4.1, React 19, TypeScript, Tailwind v4.
- Statisk eksport (`output: "export"`) via `npm run build`, ut i `out/`.
- Publiseres med Cloudflare Workers Assets (`wrangler.jsonc`, directory `./out`). Ikke klassisk Pages.
- Live preview: https://agentverden.assistent-liseai.workers.dev
- agentverden.no er ikke koblet ennå. Gratisplan krever at nameservere flyttes til Cloudflare. Eieren gjør det selv.
- Domene og e-postpakke ligger hos Webhuset. E-posten er ikke tatt i bruk ennå, men skal ikke påvirkes av noe som gjøres i dette prosjektet.
- `package.json` har fortsatt `"name": "agentbruk"` (kosmetisk, lav prioritet).

## Strategi
- Trafikk og e-postadresser først, penger senere.
- Sponsor-siden skal skjules foreløpig.
- Alt innhold skal være originalt norsk, ikke oversatt eller kopiert.
- «Agent» alene er tvetydig på norsk. Bruk «AI-agenter» i titler og meta-beskrivelser.

## Absolutte regler (overstyres bare av ny, eksplisitt beskjed fra eieren)
1. Ikke endre DNS, nameservere eller noe hos Webhuset. Ikke bruk Webhuset-integrasjon/MCP. Skrivebeskyttede oppslag med `dig` og `curl` er tillatt.
2. Ikke opprett kontoer. Ikke publiser utover `git push` til repoet. Ingen `wrangler deploy` eller andre direkte Cloudflare-kall.
3. Ingen Cloudflare-tilgang eller token skal brukes eller etterspørres. Eieren kobler Cloudflare og gjør DNS selv. Du guider og verifiserer etterpå med `dig`/`curl`.
4. Aldri be eieren lime inn passord, token eller nøkler i chatten.
5. Ikke slett filer utenfor prosjektmappen. Ikke force-push.
6. Hvis noe er uklart eller feiler: stopp og si fra. Ikke gjett.
7. Rapporter med bevis (faktisk utskrift fra build, `git status`, `git log`, `grep`). Aldri bare «ferdig».
8. Be om bekreftelse før endringer eieren ikke har bedt om.
9. Skatt, økonomi, jus, forsikring og helse krever eierens gjennomgang før noe av det publiseres.

## Rapportformat
Etter hvert steg: hva som ble gjort, bevis (utskrift), avvik, og hva som trengs fra eieren.

## Etter at nameserverne er flyttet
Verifiser med `dig` og `curl`: at NS peker til Cloudflare, at agentverden.no svarer 200, at www videresendes til agentverden.no (Cloudflare Redirect Rule som eieren setter opp), og sammenlign med `dns-før.txt` slik at ingen eksisterende poster (spesielt MX og TXT) har forsvunnet. Rapporter alle forskjeller.
