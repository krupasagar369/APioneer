"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  FileText,
  GraduationCap,
  Landmark,
  Layers,
  Mail,
  Menu,
  Newspaper,
  Phone,
  Presentation,
  Search,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import { categories, courses, partners } from "@/data/site";
import { Logo } from "./Logo";
import { ActionButton, PartnerLogo } from "./ui";

type MenuKey = "partners" | "courses" | "training" | "insights" | null;

const trainingLinks = [
  { to: "/corporate-training", label: "Corporate Training", detail: "Private cohorts and capability academies", icon: Building2 },
  { to: "/government-training", label: "Government Training", detail: "Public sector upskilling at scale", icon: Landmark },
  { to: "/services", label: "Services & Consulting", detail: "Cloud, security and platform advisory", icon: Layers },
  { to: "/workshops", label: "Workshops", detail: "Hands-on labs and intensives", icon: Presentation },
  { to: "/webinars", label: "Webinars", detail: "Live expert sessions, free to join", icon: Video },
];

const insightLinks = [
  { to: "/blogs", label: "Blogs", detail: "Perspectives from our practice leads", icon: Newspaper },
  { to: "/resources", label: "Resources", detail: "Reports, toolkits and brochures", icon: FileText },
  { to: "/careers", label: "Careers", detail: "Build the future of enterprise learning", icon: Sparkles },
  { to: "/about", label: "About APIONEER", detail: "Our story, values and leadership", icon: GraduationCap },
];

const allNavLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/group-of-apioneer", label: "Group of APIONEER" },
  { to: "/learning-partners", label: "Learning Partners" },
  { to: "/courses", label: "Courses" },
  { to: "/categories", label: "Categories" },
  { to: "/corporate-training", label: "Corporate Training" },
  { to: "/government-training", label: "Government Training" },
  { to: "/services", label: "Services" },
  { to: "/workshops", label: "Workshops" },
  { to: "/webinars", label: "Webinars" },
  { to: "/resources", label: "Resources" },
  { to: "/blogs", label: "Blogs" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Intentional: close any open menu/drawer when the route changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(null);
    setMobile(false);
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setSearch(false);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const leave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const results =
    query.trim().length > 1
      ? [
          ...courses
            .filter((c) => (c.title + c.category + c.partner).toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
            .map((c) => ({ label: c.title, sub: c.category, to: `/courses/${c.slug}` })),
          ...partners
            .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 3)
            .map((p) => ({ label: p.name, sub: "Learning partner", to: `/learning-partners/${p.slug}` })),
        ]
      : [];

  const trigger = (key: Exclude<MenuKey, null>, label: string) => (
    <button
      type="button"
      onMouseEnter={() => enter(key)}
      onFocus={() => enter(key)}
      onClick={() => setOpen(open === key ? null : key)}
      aria-expanded={open === key}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
        open === key ? "bg-navy/6 text-navy" : "text-navy/85 hover:text-navy"
      }`}
    >
      {label}
      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open === key ? "rotate-180" : ""}`} aria-hidden />
    </button>
  );

  const navLinkCls = (to: string) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
      pathname === to ? "text-teal" : "text-navy/85 hover:text-navy"
    }`;

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* utility bar */}
      <div className="hidden bg-navy-deep text-on-dark-muted lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden />
            Accredited partner for Microsoft, AWS, PECB and Scrum Alliance certifications
          </p>
          <div className="flex items-center gap-6">
            <a href="tel:+911800000000" className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              +91 1800 000 000
            </a>
            <a href="mailto:learn@apioneer.com" className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              learn@apioneer.com
            </a>
          </div>
        </div>
      </div>

      <header
        onMouseLeave={leave}
        className={`border-b transition-all duration-300 ${
          scrolled || open ? "border-border bg-background/85 shadow-soft backdrop-blur-xl" : "border-transparent bg-background"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
            <Link href="/" className={navLinkCls("/")}>
              Home
            </Link>
            <Link href="/about" className={navLinkCls("/about")}>
              About
            </Link>
            {trigger("partners", "Learning Partners")}
            {trigger("courses", "Courses")}
            {trigger("training", "Training")}
            {trigger("insights", "Insights")}
            <Link href="/contact" className={navLinkCls("/contact")}>
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearch((s) => !s)}
              aria-label="Search courses and partners"
              aria-expanded={search}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border text-navy transition-all duration-300 hover:border-teal hover:bg-teal/8"
            >
              <Search className="h-4 w-4" aria-hidden />
            </button>
            <div className="hidden md:block">
              <ActionButton to="/group-of-apioneer" variant="navy">
                Group of APIONEER
              </ActionButton>
            </div>
            <button
              type="button"
              onClick={() => setMobile(true)}
              aria-label="Open navigation menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border text-navy transition-colors hover:border-teal xl:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* Mega menus */}
        {open ? (
          <div
            onMouseEnter={() => enter(open)}
            className="absolute inset-x-0 top-full hidden animate-fade-in border-b border-border bg-background/95 shadow-lift backdrop-blur-2xl xl:block"
          >
            <div className="container-x py-8">
              {open === "partners" ? (
                <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {partners.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/learning-partners/${p.slug}`}
                        className="group flex gap-4 rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-border hover:bg-surface"
                      >
                        <PartnerLogo
                          logo={p.logo}
                          name={p.name}
                          short={p.short}
                          accent={p.accent}
                          className="h-11 w-11 rounded-lg"
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-navy">{p.name}</span>
                          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{p.tagline}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <MegaPromo
                    title="Become a partner"
                    body="Bring your certification catalogue to 250,000+ enterprise learners across 42 countries."
                    to="/learning-partners"
                    cta="View all partners"
                  />
                </div>
              ) : null}

              {open === "courses" ? (
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)]">
                  <div>
                    <MegaTitle>Browse by category</MegaTitle>
                    <ul className="mt-4 grid gap-1">
                      {categories.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href="/categories"
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-navy/85 transition-colors hover:bg-surface hover:text-navy"
                          >
                            {c.name}
                            <span className="text-xs text-muted-foreground">{c.count}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <MegaTitle>Featured programmes</MegaTitle>
                    <ul className="mt-4 grid gap-1">
                      {courses
                        .filter((c) => c.featured)
                        .map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/courses/${c.slug}`}
                              className="block rounded-lg px-3 py-2 transition-colors hover:bg-surface"
                            >
                              <span className="block text-sm font-medium text-navy">{c.title}</span>
                              <span className="text-xs text-muted-foreground">
                                {c.partner} · {c.duration}
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <MegaPromo
                    title="Not sure where to start?"
                    body="Take a five-minute capability assessment and receive a personalised certification roadmap."
                    to="/courses"
                    cta="Explore all courses"
                  />
                </div>
              ) : null}

              {open === "training" ? (
                <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {trainingLinks.map((l) => (
                      <li key={l.to}>
                        <Link
                          href={l.to}
                          className="group flex gap-4 rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-border hover:bg-surface"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal/12 text-navy transition-colors group-hover:bg-gold/22">
                            <l.icon className="h-4.5 w-4.5" aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-navy">{l.label}</span>
                            <span className="mt-1 block text-xs text-muted-foreground">{l.detail}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <MegaPromo
                    title="Corporate enquiry"
                    body="Private cohorts for 10 to 10,000 people, delivered onsite or live virtual in 42 countries."
                    to="/contact"
                    cta="Talk to an expert"
                  />
                </div>
              ) : null}

              {open === "insights" ? (
                <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {insightLinks.map((l) => (
                      <li key={l.to}>
                        <Link
                          href={l.to}
                          className="group flex gap-4 rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-border hover:bg-surface"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal/12 text-navy transition-colors group-hover:bg-gold/22">
                            <l.icon className="h-4.5 w-4.5" aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-navy">{l.label}</span>
                            <span className="mt-1 block text-xs text-muted-foreground">{l.detail}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <MegaPromo
                    title="Skills Gap Report 2026"
                    body="Benchmark your capability against 400 enterprises across cloud, security and AI."
                    to="/resources"
                    cta="Download the report"
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Search panel */}
        {search ? (
          <div className="absolute inset-x-0 top-full animate-fade-in border-b border-border bg-background/95 shadow-lift backdrop-blur-2xl">
            <div className="container-x py-7">
              <label htmlFor="site-search" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-navy-soft">
                Search courses, certifications and partners
              </label>
              <input
                id="site-search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “Azure”, “ISO 27001” or “Scrum”"
                className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-all focus:border-teal focus:ring-4 focus:ring-teal/15"
              />
              {results.length > 0 ? (
                <ul className="mt-4 grid gap-1">
                  {results.map((r) => (
                    <li key={r.label}>
                      <Link
                        href={r.to}
                        className="flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-surface"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-navy">{r.label}</span>
                          <span className="text-xs text-muted-foreground">{r.sub}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-teal" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : query.trim().length > 1 ? (
                <p className="mt-4 text-sm text-muted-foreground">No matches. Try a broader term or browse all courses.</p>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>

      {/* Mobile drawer */}
      {mobile ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobile(false)}
            className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(22rem,90vw)] animate-fade-in flex-col bg-background shadow-lift">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Logo />
              <button
                type="button"
                onClick={() => setMobile(false)}
                aria-label="Close navigation menu"
                className="grid h-10 w-10 place-items-center rounded-xl border border-border text-navy"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="grid gap-0.5">
                {allNavLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      href={l.to}
                      className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        pathname === l.to ? "bg-teal/12 text-navy" : "text-navy/85 hover:bg-surface"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-border p-5">
              <ActionButton to="/group-of-apioneer" variant="gold" size="lg" className="w-full">
                Group of APIONEER
              </ActionButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MegaTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy-soft">{children}</p>;
}

function MegaPromo({ title, body, to, cta }: { title: string; body: string; to: string; cta: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-navy-gradient p-6">
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, oklch(0.79 0.132 82 / 0.5), transparent 70%)" }}
      />
      <p className="relative text-base font-semibold text-on-dark">{title}</p>
      <p className="relative mt-2 text-xs leading-relaxed text-on-dark-muted">{body}</p>
      <Link
        href={to}
        className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold"
      >
        {cta}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}