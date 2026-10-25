# Kilder til gjennomgang

Nye oppføringer i `src/data/useCases.ts` har `sourceUrl` og `sourceChecked`.

- `sourceChecked: true`: siden er åpnet og lest direkte. Gjelder bare claude.com (3 oppføringer).
- `sourceChecked: false`: lenken er funnet via søk, men siden kunne ikke åpnes herfra (nettverkspolicyen blokkerer domenet). Innholdet bygger på søkeutdrag. **Åpne lenken og kontroller at teksten stemmer før lansering.**

## Ikke lagt inn (venter på din vurdering)
- **Claude (generelt):** ingen oppføring. Eneste verifiserte kilde er Anthropics studie om personlig veiledning (https://www.anthropic.com/research/claude-personal-guidance, 30. april 2026): ca. 6 % av samtalene gjelder personlig veiledning, og temaene er helse (27 %), karriere (26 %), forhold (12 %) og privatøkonomi (11 %). Dekker helse og økonomi, så den krever din gjennomgang (regel 9).
- **Meta Muse:** treningsplan for halvmaraton og «protein-sammenligning fra bilde» er utelatt (helse-nære).
- **Manus:** aksjeanalyse av Tesla er utelatt (økonomi).
- **Codex / Claude Code:** utviklerrettede eksempler (kodebase-onboarding, feilsøking) er utelatt av hensyn til målgruppen.
- **Cowork:** juridisk kontraktsgjennomgang er utelatt (jus).

## Svakheter
- De 15 opprinnelige oppføringene har ingen kildelenke og er merket «curated from agentusecases.ai». De opprinnelige kildene kunne ikke hentes herfra. Kortene deres er derfor ikke klikkbare.
- Flere av de opprinnelige oppføringene har stemmetall (f.eks. 215) som ikke bygger på reelle stemmer. De bør fjernes før lansering.
- `agentusecases.ai` lar seg ikke åpne herfra (ENOTFOUND).
