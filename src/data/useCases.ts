export type UseCase = {
  id: string;
  title: string;
  description: string;
  agents: string[];
  category: string;
  source: string;
  sourceDate: string;
  accounts?: string;
  isNew?: boolean;
  trending?: boolean;
  votes: number;
  curatedFrom?: string;
  whatTheyDid?: string;
  howItWent?: string;
  worthKnowing?: string;
  promptTemplate?: string;
  isReviewed?: boolean;
  riskNotice?: string;
  sourceUrl: string;
  sourceChecked: boolean;
  dateAdded: string;
};


export const useCases: UseCase[] = [
{
    id: "la-en-agent-bygge-og-drive-sin-egen-nettbedrift",
    title: "La en agent bygge og drive sin egen nettbedrift",
    description: "Nat Eliason ga OpenClaw-agenten Felix $1,000 for å starte en bedrift. På tre uker hadde agenten lansert en nettside, et digitalt produkt og en X-konto, og generert over $14,000 i salg.",
    agents: ["openclaw"],
    category: "salg-markedsforing",
    source: "creatoreconomy.so",
    sourceDate: "februar 2026",
    sourceUrl: "https://creatoreconomy.so/p/use-openclaw-to-build-a-business-that-runs-itself-nat-eliason",
    sourceChecked: true,
    isNew: true,
    dateAdded: "2026-10-29",
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid: "Nat Eliason ga OpenClaw-agenten Felix et budsjett på $1,000 for å starte en bedrift. Agenten tok seg av alt fra å foreslå ideer til å lansere en nettside, et infoprodukt og en profil på X.",
    howItWent: "I løpet av tre uker klarte agenten å generere $14,718 i salg. Suksessen skyldes et avansert 3-lags minnesystem som lar agenten huske fakta, daglige hendelser og personlige preferanser.",
    worthKnowing: "Nøkkelen var et lagdelt minnesystem: 1) En kunnskapsgraf (PARA), 2) Daglige notater for loggføring, og 3) Tause kunnskapsdata for å lære av feil og forstå brukerens preferanser.",
    promptTemplate: "Her er et budsjett på $1,000. Bruk OpenClaw til å undersøke markeder, foreslå et digitalt produkt og bygg en nettside for å selge det. Lag en plan først og vent på min godkjenning før du bruker penger.",
  },
{
    id: "rangering-av-hundrevis-av-cv-er-med-claude",
    title: "Rangering av hundrevis av CV-er med Claude",
    description: "En rekrutterer brukte Claude til å rangere over 200 søknader til en stilling for å spare tid, men oppdaget at toppkandidaten ikke kunne svare på spørsmel om egen CV.",
    agents: ["claude"],
    category: "jobb-drift",
    source: "Reddit",
    sourceDate: "juni 2026",
    sourceUrl: "https://www.reddit.com/r/AIQuality/comments/1tyfkep/my_friend_used_claude_to_rank_200_resumes_the_top",
    sourceChecked: true,
    isNew: true,
    dateAdded: "2026-10-29",
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid: "En rekrutterer lastet opp over 200 CV-er i Claude og ba modellen om å lage en rangert liste over de mest kvalifiserte kandidatene for å effektivisere prosessen.",
    howItWent: "Modellen rangerte en kandidat som nummer én basert på en ekstremt polert og nøkkelord-optimalisert CV. Ved intervju viste det seg imidlertid at kandidaten ikke hadde den kompetansen som CV-en lovet.",
    worthKnowing: "Generelle språkmodeller er ofte bedre på å vurdere skriveferdigheter enn faktisk faglig dyktighet. Det er viktig å bruke AI som et beslutningsstøtteverktøy, ikke som en endelig beslutningstaker, spesielt i rekruttering.",
    promptTemplate: "Jeg har 200 CV-er for en [stillingstittel]-rolle. Analyser alle dokumentene og lag en rangert liste basert på [spesifikke krav]. Gi en kort begrunnelse for hvorfor hver kandidat er rangert slik.",
  }
];

export const hasPage = (idOrItem: any): boolean => {
  const id = typeof idOrItem === 'string' ? idOrItem : idOrItem?.id;
  return useCases.some(u => u.id === id);
};

export const isReviewed = (idOrItem: any): boolean => {
  const item = typeof idOrItem === 'string' ? useCases.find(u => u.id === idOrItem) : idOrItem;
  return item?.isReviewed || false;
};

export const riskNotice = (idOrItem: any): string | undefined => {
  const item = typeof idOrItem === 'string' ? useCases.find(u => u.id === idOrItem) : idOrItem;
  return item?.riskNotice;
};
