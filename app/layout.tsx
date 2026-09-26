import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFrame } from "@/components/awareness/site-frame";
import "./globals.css";

// The supplied PNG previews use DejaVu Sans as their sans-serif fallback.
const designFont = localFont({
  src: [
    { path: "../public/fonts/DejaVuSans.ttf", weight: "400 500", style: "normal" },
    { path: "../public/fonts/DejaVuSans-Bold.ttf", weight: "600 800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-design",
});

export const metadata: Metadata = {
  title: "Voter Education | Election Commission of Pakistan",
  description:
    "Learn about voting in Pakistan, test your knowledge with a quiz, and experience your voting journey.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={designFont.variable} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
