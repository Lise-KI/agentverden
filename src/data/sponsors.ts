export type Sponsor = {
  initials?: string;
  name: string;
  pitch?: string;
  href: string;
};

// Foreløpig ingen sponsorer: baren viser bare nettstedets eget navn.
// Når en ekte sponsor kommer på plass, legges den til her (med initials og
// pitch), og «Sponsorer / Reklame»-merket må settes tilbake i SponsorBar.tsx.
export const sponsors: Sponsor[] = [
  { name: "agentverden.no", href: "/" },
];
