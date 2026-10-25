export type UseCase = {
  id: string;
  title: string;
  description: string;
  agents: string[]; // agent slugs — første i lista regnes som hovedagenten
  category: string; // category slug
  source: string; // plattform
  sourceDate: string;
  accounts?: string;
  isNew?: boolean;
  trending?: boolean;
  votes: number;
  curatedFrom?: string; // ærlig attribusjon til hvor vi fant saken
  whatTheyDid?: string; // "Hva de gjorde"
  howItWent?: string; // "Hvordan det gikk"
  worthKnowing?: string; // "Verdt å vite"
  promptTemplate?: string; // kopierbar prompt-mal, egen formulering
};

// Seed-data for lokal prototype. Innholdet er skrevet om med egne ord på
// norsk, inspirert av reelt publiserte use cases kuratert og observert på
// agentusecases.ai (besøkt 2026-10-15/16). Når den automatiske skanne-
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
    trending: false,
    votes: 215,
    curatedFrom: "agentusecases.ai",
    whatTheyDid:
      "Brukeren satte opp fire separate papirhandel-porteføljer — altså simulert handel uten ekte penger — på handelsplattformen Alpaca. Hver morgen før børsåpning fikk ChatGPT, Gemini, Claude og Perplexity (med Deep Research aktivert) nøyaktig samme prompt om markedet, og kunne bare svare BUY, SELL, HOLD eller CANCEL. Hele løpet kjørte automatisert i Python, og loggen over beslutninger ble delt offentlig uten at brukeren overstyrte noen avgjørelser.",
    howItWent:
      "Etter ni uker lå ChatGPT klart best an med +21,1 %, hjulpet av noen heldige helsesektor-valg der én aksje doblet seg og en annen steg 52 %. Perplexity endte nesten i null med +1,1 %, mens Gemini (-6,6 %) og Claude (-11,5 %) gikk med tap. Brukeren presiserte at dette er papirpenger, og at ni uker er for kort tid til å konkludere med at én modell er best til aksjehandel.",
    worthKnowing:
      "Det mest interessante funnet er kanskje ikke avkastningen, men adferden: ChatGPT satt helt stille i kontanter i nesten tre uker før den gjorde sin første handel. Et oppsett som dette kan altså ligge i ro lenge før det gjør noe — verdt å vite før man forventer daglig aktivitet.",
    promptTemplate:
      "Hver børsdag før markedet åpner: gå gjennom en papirhandel-portefølje på [beløp] og foreslå kjøp/salg basert på [din strategi eller risikonivå], kun med simulerte penger. Loggfør hver beslutning med én setning som begrunnelse, pluss porteføljens verdi, i en løpende logg. Etter [antall] uker: oppsummer resultatet mot [en referanseindeks]. Ikke legg inn ekte ordre — vis meg alle foreslåtte handler for godkjenning først.",
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
    trending: false,
    votes: 58,
    curatedFrom: "agentusecases.ai",
    whatTheyDid:
      "En trader satte opp et team av 11 agenter, hver med sitt eget ansvarsområde og et eget mandatdokument som beskriver nøyaktig hva den har lov til å gjøre.",
    howItWent:
      "Et eget «rødt lag» av agenter må vurdere og godkjenne forslaget før en reell handel utføres — et ekstra kontrollpunkt mot impulsive beslutninger, lagt inn som en fast del av arbeidsflyten.",
    worthKnowing:
      "Oppsettet er bygget som forberedelse og kvalitetssikring før handel, ikke som en fullautomatisk handelsrobot — mennesket har fortsatt siste ord på hver handel.",
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
    whatTheyDid:
      "En agent fikk i oppgave å søke gjennom offentlige registre for ukrevde midler knyttet til brukerens navn og tidligere adresser.",
    howItWent:
      "På rundt fem minutter fant agenten over 1500 dollar i ukrevd tilgode, og fylte ut det nødvendige papirarbeidet for å starte kravet.",
    worthKnowing:
      "Kravet var sendt inn, men ikke utbetalt da saken ble delt — denne typen prosess kan ta tid hos myndighetene selv etter at kravet er korrekt registrert.",
    promptTemplate:
      "Søk i offentlige registre for ukrevde midler, forsikringsutbetalinger eller tilgodehavender knyttet til [navn] og tidligere adresser: [liste adresser]. Oppsummer hva du finner med kilde og beløp, og foreslå neste skritt for å kreve pengene — vis meg forslaget for godkjenning før noe sendes inn.",
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
    whatTheyDid:
      "En bruker bygget en personlig formuesrådgiver i et kode-agent-verktøy, som automatisk henter inn sanntids markedsdata, makroøkonomiske indikatorer og nyhetsstrømmer.",
    howItWent:
      "Agenten holder en løpende investeringsanalyse oppdatert basert på de innhentede dataene, i stedet for at brukeren må samle informasjonen manuelt fra flere kilder selv.",
    worthKnowing:
      "Dette er et analyseverktøy, ikke en automatisk handelsbot — det er fortsatt brukeren som tar de faktiske investeringsbeslutningene basert på analysen.",
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
    whatTheyDid:
      "En agent ble satt til å kjøre en kryptosjekk hvert fjerde minutt gjennom natten, på tvers av flere nettsider samtidig.",
    howItWent:
      "Sjekken ble gjennomført over 3000 ganger i løpet av natten, og agenten skrev rapporter og sendte varsler når den fant noe relevant.",
    worthKnowing:
      "Høyfrekvent overvåking som dette krever stabil tilgang over lang tid — verdt å dobbeltsjekke at varslene faktisk når frem før man stoler fullt på oppsettet.",
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
    whatTheyDid:
      "En gründer ba en agent om å sammenligne bilforsikringstilbud og finne et billigere alternativ enn den eksisterende avtalen.",
    howItWent:
      "Agenten fant en forsikring som var flere tusen kroner billigere per år, med dekning som ble vurdert som tilstrekkelig.",
    worthKnowing:
      "Det er verdt å dobbeltsjekke at dekningsvilkårene faktisk er sammenlignbare før man bytter — lavere pris kan noen ganger bety lavere dekning.",
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
    whatTheyDid:
      "En agent fikk tilgang til e-post på tvers av to kontoer, logget seg inn i de aktuelle systemene, ringte leverandørene direkte og sendte oppfølgings-e-poster.",
    howItWent:
      "På rundt ti minutter fikk agenten sagt opp og refundert to abonnement, uten at brukeren måtte gjøre noe av arbeidet selv.",
    worthKnowing:
      "Å gi en agent tilgang til å ringe leverandører og håndtere kontoer krever en viss grad av tillit og tilgangsstyring — vurder nøye hvilke kontoer du faktisk gir fra deg kontrollen over.",
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
    whatTheyDid:
      "En agent samlet inn fakta om flyturen — forsinkelse, årsak, billettype — og undersøkte hvilke refusjonsregler som faktisk gjaldt.",
    howItWent:
      "Agenten skrev et utkast til refusjonskrav basert på det den fant, klart til gjennomgang og innsending.",
    worthKnowing:
      "Reglene for flyrefusjon varierer mye mellom selskap og land — det er verdt å lese gjennom utkastet selv før det sendes, siden regelverket er komplekst.",
    promptTemplate:
      "Flyturen min med [flyselskap] fra [sted] til [sted] den [dato] ble [forsinket/kansellert]. Finn gjeldende refusjons- og kompensasjonsregler for dette selskapet og denne ruten, og skriv et utkast til klage/refusjonskrav basert på fakta jeg gir deg. Vis meg utkastet for gjennomlesning før noe sendes.",
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
    isNew: false,
    accounts: "4 kontoer",
    votes: 1,
    curatedFrom: "agentusecases.ai",
    whatTheyDid:
      "En bruker satte en reiseagent til å overvåke en populær restaurant for en ledig bordplass til to personer.",
    howItWent:
      "Så snart en plass ble ledig, bestilte agenten bordet automatisk og sendte en tekstmelding til brukeren med bekreftelse på tidspunktet.",
    worthKnowing:
      "Denne typen automatisk overvåking fungerer best for populære steder med høy etterspørsel, der manuell sjekking ville krevd stadig tilbakevending til samme side.",
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
    isNew: false,
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid:
      "En reiseagent ble satt opp til ikke bare å bestille et bord, men også å fortsette å overvåke om det dukket opp ledige åpninger eller prisfall på reisebestillinger etterpå.",
    howItWent:
      "Agenten fortsatte overvåkingen i bakgrunnen etter at den første bestillingen var gjort, uten videre instruks fra brukeren.",
    worthKnowing:
      "Forskjellen fra en vanlig bestillingstjeneste er at agenten ikke stopper etter første treff — den blir ved oppgaven over tid.",
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
    isNew: false,
    accounts: "2 kontoer",
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid:
      "En bruker flyttet sine egne lagrede agent-ferdigheter fra én plattform til en annen.",
    howItWent:
      "Den nye plattformen tok over ansvaret for oppgavene ved å kombinere arbeid i skyen med arbeid på den lokale maskinen.",
    worthKnowing:
      "Å kunne flytte ferdigheter mellom plattformer reduserer avhengigheten av én enkelt leverandør — verdt å vurdere når man bygger opp egne agent-oppsett.",
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
    isNew: false,
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid:
      "En bruker testet en agent-modus for å håndtere salg av egne, ubrukte eiendeler på nett over omtrent ti dager.",
    howItWent:
      "Agenten tok seg av meldingshåndtering med interesserte kjøpere og justerte prisen underveis, med lite behov for manuell oppfølging fra brukeren.",
    worthKnowing:
      "Selv med automatisert prisjustering er det verdt å sette tydelige grenser for hvor lavt agenten har lov til å gå i pris, før man slipper den løs på et salg.",
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
    isNew: false,
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid:
      "Flere agenter ble satt opp for å finne potensielle kunder for webdesign-tjenester, blant annet én som søker gjennom kart-tjenester etter lokale bedrifter.",
    howItWent:
      "Agenten sjekket om hver bedrift hadde en eksisterende nettside, og rangerte dem etter prioritet basert på det den fant.",
    worthKnowing:
      "Denne typen agent-drevet leadgenerering fungerer best som en første sortering — det er fortsatt verdt å gjøre en menneskelig kvalitetssjekk før man tar kontakt med listen.",
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
    isNew: false,
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid:
      "En bruker brukte kode-agenter til å sette opp strukturen for et nytt selskap, inkludert en egen markedsføringsagent.",
    howItWent:
      "Markedsføringsagenten tok seg av merkeidentitet og fargepaletter som en del av oppsettet.",
    worthKnowing:
      "Å la en agent definere merkeidentitet tidlig kan spare tid, men det er verdt å ha et menneske til å godkjenne det visuelle før det blir stående offentlig.",
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
    isNew: false,
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid:
      "En kommentator pekte på en praktisk forskjell mellom agenttyper: en agent som styrer en hel datamaskin og nettleser, kan rett og slett bli pekt mot et hvilket som helst kodelager.",
    howItWent:
      "Dette står i kontrast til skybaserte kode-agenter som ofte er bundet til ett bestemt, forhåndskonfigurert repo.",
    worthKnowing:
      "Fleksibiliteten til en datamaskin-styrt agent har en kostnad i hastighet og presisjon sammenlignet med en spesialisert kode-agent — valget bør styres av oppgaven, ikke av hva som er mest fleksibelt på papiret.",
  },

  {
    id: "extract-rfq-boq-requirements-into-excel",
    title: "Extract RFQ og BOQ-krav til Excel",
    description: "En bruker bruker Cowork for å lese RFQ-er og BOQ-er med vedlegg og trekker ut kravene til en Excel-fil; en annen brukte det til å rydde i mapper.",
    agents: ["claude-cowork"],
    category: "automatisering",
    source: "agentusecases.ai",
    sourceDate: "oktober 2026",
    isNew: true,
    trending: true,
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid: "Brukeren brukte Cowork til å lese gjennom komplekse RFQ- og BOQ-dokumenter og automatisk trekke ut viktige krav til et Excel-ark.",
    howItWent: "Prosessen sparte brukeren for mye manuelt arbeid med å lete gjennom PDF-vedlegg.",
    worthKnowing: "Cowork er svært effektiv for dokument-analyse med mange vedlegg."
  },
  {
    id: "build-nes-harness-agent-play-games",
    title: "Bygg en NES-harness slik at en agent kan spille spill",
    description: "En kommentator bygger en NES-harness der en agent leser emulators tilstand; det var vanskelig å oppdage dialogbokser og menyer, så de planlegger en per-frame state recorder.",
    agents: ["egen-agent"],
    category: "programvare-devops",
    source: "Reddit",
    sourceDate: "oktober 2026",
    isNew: true,
    trending: true,
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid: "En utvikler bygger et rammeverk (harness) som lar en agent se hva som skjer i en NES-emulator i sanntid.",
    howItWent: "Det viste seg å være utfordrende å få agenten til å forstå GUI-elementer som menyer, så de må implementere en mer detaljert tilstandsopptaker.",
    worthKnowing: "Dette åpner for å trene agenter i visuelle miljøer som krever rask respons og forståelse av UI."
  },
  {
    id: "run-scheduled-competitor-briefs-meeting-indexing",
    title: "Kjør planlagte konkurrent-briefs og indeksering av møter",
    description: "Brukere kjører OpenClaw cron-jobber som surfer konkurrent-sider for en morgenbrief, skanner GitHub Trends, oppdaterer minnefiler nattlig og indekserer opptak av møter og forelesninger.",
    agents: ["openclaw"],
    category: "jobb-drift",
    source: "OpenClaw",
    sourceDate: "oktober 2026",
    isNew: true,
    trending: false,
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid: "En bruker har automatisert hele informasjonsflyten ved å bruke cron-jobber som kjører OpenClaw-agenter nattlig.",
    howItWent: "Dette gir brukeren en ferdig oppsummert brief hver morgen, inkludert innsikt fra konkurrenter og GitHub Trends.",
    worthKnowing: "Kombinasjonen av nettlesing og lokal minne-oppdatering gjør dette til en kraftig personlig assistent."
  },
  {
    id: "monitor-weather-overseas-events-email-family",
    title: "Overvåk vær og hendelser i utlandet og send e-post til familien",
    description: "En bruker kjører en OpenClaw-bot som overvåker hendelser i utlandet og varsler om ekstremvær og sender e-post til familiemedlemmer når det trengs, inkludert påminnelser om gaver til partneren.",
    agents: ["openclaw"],
    category: "personlig-assistans",
    source: "OpenClaw",
    sourceDate: "oktober 2026",
    isNew: true,
    trending: false,
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid: "En OpenClaw-agent overvåker eksterne hendelser (som vær og globale nyheter) og varsler familien via e-post.",
    howItWent: "Systemet fungerer som en ekstra 'sikkerhetsvakt' som holder familien oppdatert på ting som betyr noe.",
    worthKnowing: "Dette viser hvordan agenter kan kobles til både sanntidsdata og personlig kommunikasjon."
  },
  {
    id: "organize-gmail-inbox-messages",
    title: "Organiser meldinger i Gmail-innboksen",
    description: "Brukeren prøvde å bruke Cowork for å organisere Gmail; det fungerte delvis på ca. 100 e-poster før det oppstod tilkoblingsproblemer, og jobben ble dårlig utført.",
    agents: ["claude-cowork"],
    category: "automatisering",
    source: "Reddit",
    sourceDate: "oktober 2026",
    isNew: true,
    trending: false,
    votes: 0,
    curatedFrom: "agentusecases.ai",
    whatTheyDid: "En bruker forsøkte å automatisere rydding i en stor Gmail-innboks ved hjelp av Cowork.",
    howItWent: "Jobben ble avbrutt midtveis på grunn av nettverksproblemer, noe som minner oss på at store batch-jobber krever stabil tilkobling.",
    worthKnowing: "Ved organisering av e-post er det viktig med kontrollmekanismer slik at agenten ikke flytter ting feil ved feil."
  }
];
