import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SponsorBar from "@/components/SponsorBar";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentbruk — hva folk faktisk gjør med AI-agenter",
  description:
    "Ekte ting folk gjør med AI-agenter, samlet fra hele nettet hver dag. Stjel en idé.",
  metadataBase: new URL("https://agentverden.no"),
  alternates: {
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
    >
      <body className="min-h-full flex flex-col text-neutral-100">
        <div className="bg-aurora" aria-hidden="true" />
        <div className="flex-1 relative z-10">{children}</div>
        <SponsorBar />
        <SiteFooter />
      </body>
    </html>
  );
}
