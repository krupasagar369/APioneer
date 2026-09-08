import type { Metadata } from "next";
import { Suspense } from "react";
import { partnerCourses } from "@/data/partner-courses";
import { microsoftCourses } from "@/data/microsoft-courses";
import { ActionButton, CtaBand, PageHero, SectionHeading } from "@/components/site/ui";
import { AllCoursesExplorer, type CatalogEntry } from "./AllCoursesExplorer";

const title = "All Courses — APioneer";
const description =
  "Every course APioneer delivers across our accredited learning partners — PECB, Scrum Alliance, AI CERTs and Microsoft — search, filter and browse by partner or category.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function AllCoursesPage() {
  const staticEntries: CatalogEntry[] = [
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
        description="Every course from our accredited learning partners — PECB, Scrum Alliance, AI CERTs and Microsoft — in one place. Search, filter and browse by category or partner."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Courses" }]}
      >
        <ActionButton to="/contact" variant="gold" size="lg">
          Talk to an Expert
        </ActionButton>
      </PageHero>

      <section className="section-y container-x">
        <SectionHeading eyebrow="Browse the catalogue" title="Search across every partner in one place" />
        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-muted-foreground">Loading catalogue…</p>}>
            <AllCoursesExplorer entries={staticEntries} />
          </Suspense>
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