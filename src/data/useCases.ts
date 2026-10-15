export type UseCase = {
  id: string;
  title: string;
  description: string;
  agents: string[]; // agent slugs
  category: string; // category slug
  source: string; // plattform
  sourceDate: string;
  accounts?: string;
  isNew?: boolean;
  trending?: boolean;
  votes: number;
  curatedFrom?: string; // ærlig attribusjon til hvor vi fant saken
};

// Seed-data for lokal prototype. Innholdet er skrevet om med egne ord på
// norsk, inspirert av reelt publiserte use cases kuratert og observert på
// agentusecases.ai (besøkt 2026-10-15). Når den automatiske skanne-
// pipelinen settes i drift, erstattes/utvides denne listen med ferskt,
// direkte kildesporet innhold (egne X/Reddit/HN-søk + lenke til original).
export const useCases: UseCase[] = [
  {
    id: "handel-fire-modeller",
    title: "La fire KI-modeller handle aksjer autonomt for 1000 kr hver",
    description:
      "En bruker lot fire ulike KI-modeller kjøre egne porteføljer på 1000 kroner hver i ni uker, med en fast morgenrutine før markedet åpnet. ChatGPT endte best av de fire.",
    agents: ["gemini", "chatgpt"],
    category: "penger-regninger",
    source: "Reddit",
    sourceDate: "mars 2026",
    trending: true,
    votes: 215,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "elleve-agenter-trading",
    title: "Kjør et 11-agent-team som forbereder handler",
    description:
      "En trader satte opp 11 agenter med hver sin oppgave og eget mandat-dokument, der et eget «rødt lag» må godkjenne en handel før den utføres.",
    agents: ["grok-bot", "claude", "codex"],
    category: "penger-regninger",
    source: "Reddit",
    sourceDate: "oktober 2026",
    trending: true,
    votes: 58,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "ukrevde-penger",
    title: "Finn ukrevde penger og start kravet",
    description:
      "En agent fant over 1500 dollar i ukrevd tilgode på rundt fem minutter og hjalp til med papirarbeidet. Kravet ble sendt inn, men ikke utbetalt ennå.",
    agents: ["meta-muse"],
    category: "penger-regninger",
    source: "Nettsted",
    sourceDate: "september 2026",
    accounts: "4 kontoer",
    votes: 56,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "investeringsanalyse",
    title: "Lag investeringsanalyse fra sanntids markedsdata",
    description:
      "En personlig formuesrådgiver bygget i et kode-agent-verktøy, som mater inn sanntids markedsdata, makroindikatorer og nyheter til en løpende investeringsanalyse.",
    agents: ["claude-code"],
    category: "penger-regninger",
    source: "Reddit",
    sourceDate: "april 2026",
    accounts: "2 kontoer",
    votes: 39,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "memecoin-kontroll",
    title: "Kjør natt-til-natt kryptosjekker og varsler",
    description:
      "En agent kjørte en firemiomimnutters krypto-sjekk over 3000 ganger over natten på tvers av flere sider, skrev rapporter og sendte varsler ved treff.",
    agents: ["grok-bot"],
    category: "penger-regninger",
    source: "X",
    sourceDate: "oktober 2026",
    votes: 24,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "billigere-forsikring",
    title: "Finn billigere bilforsikring",
    description:
      "En gründer fikk en agent til å finne bilforsikring som var flere tusen kroner billigere per år enn den opprinnelige avtalen.",
    agents: ["meta-muse"],
    category: "penger-regninger",
    source: "Nettsted",
    sourceDate: "2026",
    accounts: "3 kontoer",
    votes: 16,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "avbestill-abonnement",
    title: "Si opp og få refundert abonnement ved å lese e-post og ringe",
    description:
      "En agent leste e-post på tvers av to kontoer, logget inn i systemer, ringte leverandører og sendte e-poster — og fikk sagt opp og refundert to abonnement på rundt ti minutter.",
    agents: ["grok-bot"],
    category: "penger-regninger",
    source: "Substack",
    sourceDate: "2026",
    accounts: "2 kontoer",
    votes: 12,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "refusjon-fly",
    title: "Krev refusjon for forsinket eller kansellert fly",
    description:
      "En agent samler fakta om flyturen, undersøker reglene og skriver utkast til refusjonskravet etter en forsinkelse eller kansellering.",
    agents: ["claude"],
    category: "reise-bestilling",
    source: "Reddit",
    sourceDate: "oktober 2026",
    votes: 6,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "overvak-restaurantbord",
    title: "Overvåk og bestill et vanskelig restaurantbord",
    description:
      "En bruker lot en reiseagent passe på en ledig plass hos en populær restaurant og bestille bord til to, og fikk så tekstmelding med bekreftelse på tidspunktet.",
    agents: ["egen-agent"],
    category: "reise-bestilling",
    source: "X",
    sourceDate: "oktober 2026",
    isNew: true,
    accounts: "4 kontoer",
    votes: 1,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "overvak-bord-priser",
    title: "Bestill bord og overvåk åpninger eller prisfall",
    description:
      "En reiseagent bestiller bord og fortsetter å overvåke utsolgte åpninger eller prisfall på reisebestillinger, i stedet for bare å liste opp alternativer.",
    agents: ["egen-agent"],
    category: "reise-bestilling",
    source: "X",
    sourceDate: "oktober 2026",
    isNew: true,
    votes: 0,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "flytt-ferdigheter",
    title: "Flytt ferdigheter fra én agentplattform til en annen",
    description:
      "En bruker flyttet egne lagrede ferdigheter til en annen agentplattform, som så sa den overtok ansvaret ved å kombinere sky- og lokal-maskin-arbeid.",
    agents: ["grok-bot", "openclaw"],
    category: "programvare-devops",
    source: "Reddit",
    sourceDate: "september 2026",
    isNew: true,
    accounts: "2 kontoer",
    votes: 0,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "selg-brukte-ting",
    title: "Selg ting du ikke bruker lenger med hjelp av en agent",
    description:
      "En bruker testet en agent-modus for å håndtere et nettsalg over cirka ti dager, inkludert meldingshåndtering og prisjustering, med lite manuelt arbeid.",
    agents: ["chatgpt-agent"],
    category: "shopping-errend",
    source: "Reddit",
    sourceDate: "januar 2025",
    isNew: true,
    votes: 0,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "finn-salgsmuligheter",
    title: "Finn kunder for webdesign-tjenester med salgsagenter",
    description:
      "Flere agenter ble satt opp for å selge webtjenester, blant annet en som søker i kart-tjenester etter bedrifter, sjekker om de har nettside og rangerer dem etter prioritet.",
    agents: ["chatgpt"],
    category: "salg-markedsforing",
    source: "Reddit",
    sourceDate: "mars 2026",
    isNew: true,
    votes: 0,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "bygg-selskapsstruktur",
    title: "Bygg en selskapsstruktur med kode-agenter",
    description:
      "En bruker brukte kode-agenter til å sette opp et selskap, blant annet en markedsføringsagent som tar seg av merkeidentitet og fargepaletter.",
    agents: ["claude-code"],
    category: "jobb-drift",
    source: "Reddit",
    sourceDate: "november 2025",
    isNew: true,
    votes: 0,
    curatedFrom: "agentusecases.ai",
  },
  {
    id: "datamaskin-bruk-repo",
    title: "Pek en datamaskin-styrt bot mot et hvilket som helst kodelager",
    description:
      "En kommentator peker på at en agent kan styre en datamaskin og nettleser og bli bedt om å jobbe med et hvilket som helst gitt kodelager, i motsetning til skyagenter bundet til ett bestemt repo.",
    agents: ["grok-bot"],
    category: "programvare-devops",
    source: "Reddit",
    sourceDate: "september 2026",
    isNew: true,
    votes: 0,
    curatedFrom: "agentusecases.ai",
  },
];
