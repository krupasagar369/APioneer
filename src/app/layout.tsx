import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const viewport: Viewport = {
  themeColor: "#12203c",
};

export const metadata: Metadata = {
  title: {
    default: "APIONEER Business Solutions — Enterprise Training & Certification",
    template: "%s — APIONEER Business Solutions",
  },
  description:
    "Accredited corporate training, professional certification, government upskilling and IT consulting for enterprise teams in 42 countries.",
  openGraph: {
    title: "APIONEER Business Solutions — Enterprise Training & Certification",
    description:
      "Accredited corporate training, professional certification, government upskilling and IT consulting for enterprise teams in 42 countries.",
    type: "website",
    siteName: "APIONEER Business Solutions",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-on-dark">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="pt-[4.5rem] lg:pt-[6.75rem]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}