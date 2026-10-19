export type ToolRecommendation = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  nordicFact: string;
  officialUrl: string;
  // Sett inn den ekte affiliate-/referral-lenken her når søknaden er godkjent.
  // Så lenge dette er undefined, lenker knappen til officialUrl uten
  // reklamemerking (vi tjener ingenting ennå, så det er ikke reklame).
  affiliateUrl?: string;
  // Intern referanse, vises ikke på siden — til eget bokføringsbruk.
  commissionNote: string;
  sourceUrl: string;
};

export const toolRecommendations: ToolRecommendation[] = [
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    tagline: "AI-stemme med ekte norsk støtte",
    description:
      "Tekst-til-tale og stemmekloning med dedikert norsk støtte (Flash v2.5) og flere norske stemmer. Samme verktøy vi selv bruker til stemmeklon-prosjektet på denne siden.",
    nordicFact: "Egen norsk TTS-side og norske stemmer (Mia, Olaf, Emma m.fl.)",
    officialUrl: "https://elevenlabs.io",
    affiliateUrl: undefined,
    commissionNote: "22% i 12 mnd, PartnerStack (verifisert okt. 2026)",
    sourceUrl: "https://elevenlabs.io/text-to-speech/norwegian",
  },
  {
    slug: "vultr",
    name: "Vultr",
    tagline: "VPS/cloud med datasenter i Stockholm",
    description:
      "Cloud-servere (VPS) på KVM-basert infrastruktur. Eneste av de store VPS-selskapene med eget datasenter i Norden — lavest ventetid for norske brukere.",
    nordicFact: "Eget datasenter i Stockholm, Sverige — 32 regioner totalt",
    officialUrl: "https://www.vultr.com",
    affiliateUrl: undefined,
    commissionNote: "Opptil $100 per henvisning (verifisert okt. 2026)",
    sourceUrl: "https://www.vultr.com/features/datacenter-locations",
  },
  {
    slug: "n8n",
    name: "n8n",
    tagline: "Automasjon med EU-data som standard",
    description:
      "No-code/low-code automasjonsplattform for å koble sammen apper og AI-agenter. Tysk selskap med EU-datalagring og GDPR «by design» som standard.",
    nordicFact: "Berlin-basert, EU-datasentre, ingen trening på kundedata",
    officialUrl: "https://n8n.io",
    affiliateUrl: undefined,
    commissionNote: "30% i 12 mnd (verifisert okt. 2026)",
    sourceUrl: "https://n8n.io/legal/privacy/2026-06/",
  },
  {
    slug: "hostinger",
    name: "Hostinger",
    tagline: "EU-eid webhosting og VPS",
    description:
      "Webhosting, cloud og VPS fra et europeisk eid og styrt selskap. Datasentre i flere EU-land, selvbetjent oppsett og norsk-vennlig prising.",
    nordicFact: "Litauisk selskap (Vilnius), datasentre i FR/DE/NL/UK",
    officialUrl: "https://www.hostinger.com",
    affiliateUrl: undefined,
    commissionNote: "Opptil 40% på VPS-planer (verifisert okt. 2026)",
    sourceUrl:
      "https://support.hostinger.com/en/articles/1583267-where-are-hostinger-servers-located",
  },
  {
    slug: "make",
    name: "Make.com",
    tagline: "Visuell automasjon fra Praha",
    description:
      "Visuell automasjonsplattform for å bygge AI-agent-arbeidsflyter uten kode. Europeisk hovedkontor, GDPR- og SOC 2/3-sertifisert.",
    nordicFact: "Hovedkontor i Praha (EU), GDPR + SOC 2 Type II/SOC 3",
    officialUrl: "https://www.make.com",
    affiliateUrl: undefined,
    commissionNote: "35% i 12 mnd, min. $100 + 3 betalende brukere (okt. 2026)",
    sourceUrl: "https://www.make.com/about",
  },
];
