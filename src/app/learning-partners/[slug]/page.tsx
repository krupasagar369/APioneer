import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { learningPartners } from "@/data/partners";
import { partnerCourses } from "@/data/partner-courses";
import { microsoftCourses } from "@/data/microsoft-courses";
import { ActionButton, CtaBand, PageHero, SectionHeading } from "@/components/site/ui";
import { CourseExplorer } from "./CourseExplorer";

const allPartnerCourses = [...partnerCourses, ...microsoftCourses];

export function generateStaticParams() {
  return learningPartners
    .filter((p) => p.status === "live" && p.slug !== "ai-cert" && p.slug !== "microsoft")
    .map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const partner = learningPartners.find((p) => p.slug === slug);
  if (!partner) return { title: "Partner not found — APIONEER", robots: { index: false, follow: false } };
  const title = `${partner.name} Certifications — APIONEER`;
  return { title, description: partner.tagline, openGraph: { title, description: partner.tagline } };
}

export default async function PartnerDetailPage({ params }: Props) {
  const { slug } = await params;
  const partner = learningPartners.find((p) => p.slug === slug);
  if (!partner || partner.status !== "live") notFound();

  const courses = allPartnerCourses.filter((c) => c.partnerSlug === partner.slug);

  return (
    <>
      <PageHero
        eyebrow="Learning partner"
        title={partner.name}
        description={partner.description}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Learning Partners", to: "/learning-partners" },
          { label: partner.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton to="/contact" variant="gold" size="lg">
            Talk to an Expert
          </ActionButton>
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-navy/20 px-5 py-3.5 text-sm font-semibold text-navy transition-all hover:border-teal hover:bg-teal/8"
          >
            Visit {partner.name}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </PageHero>

      <section className="section-y container-x">
        <SectionHeading
          eyebrow="Categories"
          title={`${courses.length} accredited programme${courses.length === 1 ? "" : "s"}`}
        />
        <div className="mt-8">
          <CourseExplorer courses={courses} categories={partner.categories} partnerSlug={partner.slug} />
        </div>
      </section>

      <CtaBand
        title={`Ready to certify your team with ${partner.name}?`}
        description="Speak with a senior learning advisor about a tailored cohort — public, private or blended delivery."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All learning partners", to: "/learning-partners" }}
      />
    </>
  );
}