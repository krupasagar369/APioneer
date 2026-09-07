import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { learningPartners } from "@/data/partners";
import { ActionButton, CtaBand, PageHero, PartnerLogo, Pill, SectionHeading } from "@/components/site/ui";

const title = "Learning Partners — Accredited Certification Bodies | APIONEER";
const description =
  "APIONEER delivers accredited certification programmes with PECB, Scrum Alliance, Microsoft Learn, AI CERTs, ISTQB, The Linux Foundation and OpenEdge.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function LearningPartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Learning partners"
        title="Accredited authority, delivered by practitioners"
        description="Every certification we deliver carries official partner curriculum, sanctioned exam pathways and recognised credentials."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Learning Partners" }]}
      >
        <ActionButton to="/contact" variant="gold" size="lg">
          Talk to an Expert
        </ActionButton>
      </PageHero>

      <section className="section-y container-x">
        <SectionHeading eyebrow="Our partners" title="Seven accreditation bodies, one delivery standard" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {learningPartners.map((p) => {
            const courseCount = p.categories.reduce((sum, c) => sum + c.count, 0);
            const isLive = p.status === "live";
            const card = (
              <article className="group card-lift flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <PartnerLogo
                    logo={p.logo}
                    name={p.name}
                    short={p.short}
                    accent={p.accent}
                    className="h-24 w-24 rounded-2xl"
                  />
                  <Pill tone={isLive ? "teal" : "muted"}>
  {isLive ? (courseCount > 0 ? `${courseCount} programmes` : "Live catalogue") : "Coming soon"}
</Pill>
                </div>
                <h2 className="mt-6 text-2xl text-navy">{p.name}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                {p.categories.length > 0 ? (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.categories.map((c) => (
                      <li key={c.slug}>
                        <Pill>{c.name} ({c.count})</Pill>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {isLive ? (
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                    <BookOpen className="h-4 w-4" aria-hidden />
                    Browse {p.name} programmes
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </span>
                ) : (
                  <p className="mt-auto pt-8 text-sm font-semibold text-muted-foreground">
                    Catalogue integration in progress
                  </p>
                )}
              </article>
            );
            return isLive ? (
              <Link key={p.slug} href={`/learning-partners/${p.slug}`}>
                {card}
              </Link>
            ) : (
              <div key={p.slug}>{card}</div>
            );
          })}
        </div>
      </section>

      <CtaBand
        title="Not sure which certification path fits your team?"
        description="Send us your role mix and target outcomes — we will map a certification journey across our partner catalogue."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Browse all courses", to: "/courses" }}
      />
    </>
  );
}