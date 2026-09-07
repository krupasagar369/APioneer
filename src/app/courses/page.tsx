import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { courses as siteCourses } from "@/data/site";
import { partnerCourses } from "@/data/partner-courses";
import { microsoftCourses } from "@/data/microsoft-courses";
import { ActionButton, CtaBand, PageHero, SectionHeading } from "@/components/site/ui";
import { AllCoursesExplorer, type CatalogEntry } from "./AllCoursesExplorer";

const title = "All Courses — APioneer";
const description =
  "Every course, certification and learning programme APioneer delivers, in one place — search, filter and browse by partner or category.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function AllCoursesPage() {
  const entries: CatalogEntry[] = [
    ...siteCourses.map((c) => ({
      id: `catalog-${c.slug}`,
      title: c.title,
      partner: c.partner,
      category: c.category,
      duration: c.duration,
      href: `/courses/${c.slug}`,
      price: c.price,
    })),
    ...partnerCourses.map((c) => ({
      id: `${c.partnerSlug}-${c.slug}`,
      title: c.title,
      partner: c.partner,
      category: c.category,
      duration: c.duration,
      href: `/learning-partners/${c.partnerSlug}/courses/${c.slug}`,
    })),
    ...microsoftCourses.map((c) => ({
      id: `${c.partnerSlug}-${c.slug}`,
      title: c.title,
      partner: c.partner,
      category: c.category,
      duration: c.duration,
      href: `/learning-partners/${c.partnerSlug}/courses/${c.slug}`,
    })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Full catalogue"
        title="All Courses"
        description="Every course APioneer delivers across our accredited partners — search, filter and browse by category or partner."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Courses" }]}
      >
        <ActionButton to="/contact" variant="gold" size="lg">
          Talk to an Expert
        </ActionButton>
      </PageHero>

      {/* Live catalogues pointer cards */}
      <section className="container-x pt-14">
        <SectionHeading
          eyebrow="Live catalogues"
          title="Fetched live from our partners"
          description="These two partners' course lists update in real time from their own platforms, so we link straight through rather than duplicating a list that could go stale."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {[
            { name: "AI CERTs", detail: "Applied AI certification tracks for technical and business roles.", href: "/learning-partners/ai-cert" },
            { name: "Microsoft Learn", detail: "Official Microsoft Learn modules and learning paths.", href: "/learning-partners/microsoft" },
          ].map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="group card-lift flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="min-w-0">
                <span className="block text-base font-semibold text-navy">{p.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{p.detail}</span>
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-teal" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      {/* All courses explorer */}
      <section className="section-y container-x">
        <SectionHeading
          eyebrow="Browse the catalogue"
          title={`${entries.length} courses across all partners`}
        />
        <div className="mt-8">
          <AllCoursesExplorer entries={entries} />
        </div>
      </section>

      <CtaBand
        title="Not sure which programme fits your team?"
        description="Tell us your goals and current skill level — a senior learning advisor will map the right pathway for you."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All learning partners", to: "/learning-partners" }}
      />
    </>
  );
}