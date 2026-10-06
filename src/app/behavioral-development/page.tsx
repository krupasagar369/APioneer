import type { Metadata } from "next";
import { Brain, HeartHandshake, MessageSquare, Target, Users2, Zap } from "lucide-react";
import { ActionButton, CtaBand, FeatureCard, PageHero, SectionHeading } from "@/components/site/ui";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/components/site/Stats";
import { getPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/behavioral-development", {
    title: "Behavioral Development Training — APIONEER Business Solutions",
    description:
      "Soft skills, communication, emotional intelligence and people-management training programmes for every level of your organisation.",
  });
}

const programmes = [
  { icon: MessageSquare, title: "Communication & Presentation Skills", detail: "Business writing, stakeholder communication and confident presentation delivery." },
  { icon: Brain, title: "Emotional Intelligence", detail: "Self-awareness, empathy and relationship management for high-performing teams." },
  { icon: Users2, title: "Team Collaboration", detail: "Cross-functional teamwork, conflict resolution and trust-building exercises." },
  { icon: Target, title: "Time & Priority Management", detail: "Practical frameworks for managing workload, deadlines and focus." },
  { icon: HeartHandshake, title: "Customer & Client Handling", detail: "Client-facing communication, difficult conversations and service excellence." },
  { icon: Zap, title: "Leadership Readiness", detail: "First-time manager skills, delegation and giving effective feedback." },
];

const formats = [
  { t: "Half-day workshop", d: "Focused, single-topic session for a specific skill gap." },
  { t: "Multi-day intensive", d: "Deeper practice with role-play, case studies and feedback loops." },
  { t: "Ongoing cohort programme", d: "Spaced sessions over weeks with manager reinforcement in between." },
];

export default function BehavioralDevelopmentPage() {
  return (
    <>
      <JsonLd path="/behavioral-development" />
      <PageHero
        eyebrow="Behavioral Development"
        title="Soft skills that actually change how people work"
        description="Practical, exercise-driven training in communication, emotional intelligence and people management — built for real workplace situations, not generic theory."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Behavioral Development" }]}
      >
        <ActionButton to="/contact" variant="gold" size="lg">
          Talk to an Expert
        </ActionButton>
      </PageHero>

      <section className="section-y container-x">
        <SectionHeading eyebrow="Programmes" title="Six focus areas, built for the workplace" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {programmes.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <FeatureCard {...p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Delivery formats" title="Structured to fit your calendar" align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {formats.map((f) => (
              <div key={f.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p className="text-base font-semibold text-navy">{f.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Why it matters"
            title="Technical skill gets people hired. Behavioral skill gets them promoted."
            description="We design every programme around real workplace scenarios — difficult conversations, cross-team friction, client escalations — so the practice transfers directly back to the job."
          />
        </div>
        <InquiryForm title="Talk to an Expert" interests={programmes.map((p) => p.title)} compact />
      </section>

      <CtaBand
        title="Build a behavioral development plan for your team"
        description="Tell us the gaps you're seeing and we'll recommend a programme shape and format."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Corporate Training", to: "/corporate-training" }}
      />
    </>
  );
}