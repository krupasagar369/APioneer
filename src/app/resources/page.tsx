import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Building2, FileDown, Layers, Users2 } from "lucide-react";
import { ActionButton, CtaBand, PageHero, SectionHeading } from "@/components/site/ui";

const title = "Resources";
const description = "Course brochures, learning partner directories and business guides from APioneer.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const resources = [
  {
    icon: FileDown,
    title: "Course Brochures",
    detail:
      "Every certification programme across our learning partners has a downloadable brochure — objectives, prerequisites, and full course outline in one PDF.",
    cta: "Browse all courses",
    href: "/courses",
  },
  {
    icon: Users2,
    title: "Learning Partner Directory",
    detail:
      "Full profiles for every accredited partner we deliver through — certifications, benefits and frequently asked questions.",
    cta: "View learning partners",
    href: "/learning-partners",
  },
  {
    icon: Layers,
    title: "Business Pillars Overview",
    detail:
      "A closer look at our three strategic pillars — Integrated Business Solutions, Enterprise Learning & Certifications, and Technology & Product Solutions.",
    cta: "Explore business pillars",
    href: "/business-pillars/integrated-business-solutions",
  },
  {
    icon: Building2,
    title: "Group of APioneer",
    detail:
      "How our five specialist businesses — Learning & Development, HRM Services, Engineering Services, Advanced Manufacturing and ARGHYA — work together as one group.",
    cta: "Explore Group of APioneer",
    href: "/group-of-apioneer",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Resources"
        description="Course brochures, partner directories and business guides — everything you need to evaluate a programme or a partnership with APioneer."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Resources" }]}
      >
        <ActionButton to="/contact" variant="gold" size="lg">
          Request Something Specific
        </ActionButton>
      </PageHero>

      <section className="section-y container-x">
        <SectionHeading eyebrow="Browse by type" title="Everything in one place" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {resources.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
                <r.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg text-navy">{r.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                {r.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/12 text-gold-dark">
                  <BookOpen className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg text-navy">Looking for something else?</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Case studies, capability decks or a tailored proposal for your organisation — tell us what you
                    need and a senior advisor will put it together.
                  </p>
                </div>
              </div>
              <ActionButton to="/contact" variant="navy" size="lg">
                Talk to an Expert
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to close your capability gap?"
        description="Speak with a senior learning advisor about a tailored programme for your teams — no obligation, no scripted sales call."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Browse all courses", to: "/courses" }}
      />
    </>
  );
}