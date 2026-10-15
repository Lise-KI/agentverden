export type Sponsor = {
  initials: string;
  name: string;
  pitch: string;
  href: string;
};

// Plassholder-sponsorer for lokal prototype — ingen reelle avtaler ennå.
export const sponsors: Sponsor[] = [
  { initials: "DL", name: "Ditt logo her", pitch: "bli sponsor hos oss", href: "/sponsor" },
];
