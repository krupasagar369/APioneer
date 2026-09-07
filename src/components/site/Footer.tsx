"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Link2, Mail, MapPin, Phone, Video } from "lucide-react";
// Note: lucide-react no longer ships brand icons (Linkedin/Twitter/Youtube were removed
// upstream). Using generic icons as placeholders — swap for real brand SVGs/logo assets
// once social links are finalized with the client.
import { Logo } from "./Logo";

const columns = [
  {
    title: "Solutions",
    links: [
      { to: "/corporate-training", label: "Corporate Training" },
      { to: "/government-training", label: "Government Training" },
      { to: "/services", label: "IT Consulting" },
      { to: "/services", label: "Technical Upskilling" },
      { to: "/services", label: "Enterprise Learning" },
    ],
  },
  {
    title: "Learn",
    links: [
      { to: "/courses", label: "All Courses" },
      { to: "/categories", label: "Categories" },
      { to: "/learning-partners", label: "Learning Partners" },
      { to: "/workshops", label: "Workshops" },
      { to: "/webinars", label: "Webinars" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/blogs", label: "Blogs" },
      { to: "/resources", label: "Resources" },
      { to: "/careers", label: "Careers" },
      { to: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-navy-deep">
      <div
        aria-hidden
        className="absolute -left-32 top-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.68 0.106 195 / 0.25), transparent 70%)" }}
      />

      {/* newsletter */}
      <div className="container-x relative pt-16">
        <div className="grid gap-8 rounded-3xl border border-white/12 bg-white/6 p-8 backdrop-blur-xl md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <h2 className="text-2xl text-on-dark md:text-3xl">Enterprise learning intelligence, monthly</h2>
            <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">
              Research, certification updates and capability benchmarks for technology and L&amp;D leaders. No noise.
            </p>
          </div>
          {subscribed ? (
            <p role="status" className="rounded-2xl border border-gold/40 bg-gold/12 p-5 text-sm text-on-dark">
              You are subscribed. Look out for our next briefing.
            </p>
          ) : (
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Work email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your work email"
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/8 px-4 py-3.5 text-sm text-on-dark outline-none transition-all placeholder:text-on-dark-muted/70 focus:border-gold focus:ring-4 focus:ring-gold/20"
              />
              <button
                type="submit"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-3.5 text-sm font-bold text-navy-deep transition-transform duration-300 hover:-translate-y-0.5"
              >
                Subscribe
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="container-x relative grid gap-12 py-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
        <div className="max-w-sm">
          <Logo variant="light" />
          <p className="mt-6 text-sm leading-relaxed text-on-dark-muted">
            APIONEER Business Solutions Private Limited is a global enterprise learning and technology consulting firm,
            delivering accredited certification, corporate upskilling and digital capability programmes across 42
            countries.
          </p>
          <ul className="mt-7 grid gap-3 text-sm text-on-dark-muted">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              Level 9, Prestige Tech Park, Outer Ring Road, Bengaluru 560103, India
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
              <a href="tel:+911800000000" className="transition-colors hover:text-gold">
                +91 1800 000 000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
              <a href="mailto:learn@apioneer.com" className="transition-colors hover:text-gold">
                learn@apioneer.com
              </a>
            </li>
          </ul>
          <div className="mt-7 flex gap-3">
            {[Link2, Mail, Video].map((Icon, i) => (
              <a
                key={i}
                href="https://www.linkedin.com"
                aria-label="APIONEER on social media"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/6 text-on-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold/15"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold">{col.title}</p>
              <ul className="mt-5 grid gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.to} className="text-sm text-on-dark-muted transition-colors hover:text-on-dark">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} APIONEER Business Solutions Private Limited. All rights reserved.</p>
          <p>CIN: U72900KA2015PTC000000 · GSTIN: 29AAACA0000A1ZQ</p>
        </div>
      </div>
    </footer>
  );
}
