export type Category = {
  slug: string;
  name: string;
  description: string;
  count: number;
};

export const categories: Category[] = [
  {
    slug: "penger-regninger",
    name: "Penger, regninger & støtte",
    description:
      "Ukrevde penger, refusjoner, oppsagte abonnement, lavere regninger, skatt og forsikring.",
    count: 0,
  },
  {
    slug: "hus-hverdag",
    name: "Hus & hverdagsliv",
    description: "Husholdning, ærend hjemme, planlegging og daglige rutiner.",
    count: 0,
  },
  {
    slug: "shopping-errend",
    name: "Shopping & ærend",
    description: "Kjøp, salg, bestillinger og praktiske ærend.",
    count: 0,
  },
  {
    slug: "reise-bestilling",
    name: "Reise & bestillinger",
    description: "Reisebooking, restaurantbord, billetter og overvåking av tilbud.",
    count: 0,
  },
  {
    slug: "jobb-drift",
    name: "Jobb & drift",
    description: "Arbeidsoppgaver, interne prosesser og driftsautomatisering.",
    count: 0,
  },
  {
    slug: "salg-markedsforing",
    name: "Salg, markedsføring & support",
    description: "Leadgenerering, kundeservice og markedsføringsautomatisering.",
    count: 0,
  },
  {
    slug: "forskning-kunnskap",
    name: "Forskning & kunnskap",
    description: "Research, analyse og kunnskapsinnhenting.",
    count: 0,
  },
  {
    slug: "innhold-kreativt",
    name: "Innhold & kreativt",
    description: "Tekst, bilder, video og annet kreativt innhold.",
    count: 0,
  },
  {
    slug: "programvare-devops",
    name: "Programvare & DevOps",
    description: "Koding, vibe coding, deploy og utviklerverktøy.",
    count: 0,
  },
  {
    slug: "spill-simulering",
    name: "Spill & simulering",
    description: "Videospill, spillbotter og simuleringer.",
    count: 0,
  },
  {
    slug: "sikkerhet-vitenskap",
    name: "Sikkerhet, vitenskap & maskinvare",
    description: "Sikkerhet, forskning og fysisk maskinvare.",
    count: 0,
  },
];
