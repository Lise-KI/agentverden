import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SponsorBar from "@/components/SponsorBar";
import SiteFooter from "@/components/SiteFooter";
import { sunThemeScript } from "@/lib/sunTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Agentverden – lær å bruke AI-agenter i hverdagen",
    template: "%s · Agentverden",
  },
  description:
    "Lær å bruke AI-agenter i hverdagen, med konkrete eksempler forklart på norsk.",
  metadataBase: new URL("https://agentverden.no"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "https://agentverden.no/rss.xml",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="light"
      // Skriptet under setter data-theme før React tar over.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: sunThemeScript }} />
      </head>
      <body className="flex min-h-full flex-col pb-[var(--sponsor-bar-height)] text-neutral-900">
        <div className="flex-1 relative z-10">{children}</div>
        <SiteFooter />
        <SponsorBar />
      </body>
    </html>
  );
}
