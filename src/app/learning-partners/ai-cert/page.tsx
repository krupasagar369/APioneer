import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { learningPartners } from "@/data/partners";
import { ActionButton, CtaBand, PageHero, SectionHeading } from "@/components/site/ui";
import { AiCertCatalog } from "./AiCertCatalog";

const title = "AI CERTs Certifications — APIONEER";
const description = "Applied AI certification tracks for technical and business roles, delivered by APIONEER.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function AiCertPartnerPage() {
  const partner = learningPartners.find((p) => p.slug === "ai-cert")!;

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
        <SectionHeading eyebrow="Live catalogue" title="AI CERTs certification tracks" />
        <AiCertCatalog />
      </section>

      <CtaBand
        title="Ready to certify your team in applied AI?"
        description="Speak with a senior learning advisor about a tailored AI CERTs cohort for your organisation."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All learning partners", to: "/learning-partners" }}
      />
    </>
  );
}