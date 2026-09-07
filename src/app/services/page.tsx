import type { Metadata } from "next";
import Link from "next/link";
import { Boxes, Cloud, Cpu, GaugeCircle, LineChart, ShieldCheck } from "lucide-react";
import { services } from "@/data/site";
import { ActionButton, CtaBand, FeatureCard, PageHero, SectionHeading } from "@/components/site/ui";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/components/site/Stats";

const title = "Services — IT Consulting, Upskilling & Learning Solutions | APIONEER";
const description =
  "Cloud architecture, security posture, platform engineering advisory and enterprise learning strategy delivered by practitioner consultants.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const consulting = [
  { icon: Cloud, title: "Cloud architecture advisory", detail: "Landing zones, migration sequencing and Well-Architected reviews for regulated estates." },
  { icon: ShieldCheck, title: "Security posture & ISMS", detail: "Gap assessment, control design and certification readiness for ISO 27001 and allied standards." },
  { icon: Boxes, title: "Platform engineering", detail: "Internal developer platforms, GitOps delivery and policy-as-code enablement." },
  { icon: Cpu, title: "Applied AI enablement", detail: "Use-case prioritisation, RAG architecture and governance for production AI." },
  { icon: GaugeCircle, title: "Delivery performance", detail: "Flow metrics, dependency mapping and portfolio governance redesign." },
  { icon: LineChart, title: "Learning strategy & analytics", detail: "Capability frameworks, LMS readiness and outcome measurement design." },
];

const engagementModels = [
  { t: "Assessment sprint", d: "Two to four weeks. Current-state review, prioritised roadmap and business case." },
  { t: "Retained advisory", d: "Named consultants available on a monthly allocation for architecture and governance." },
  { t: "Capability partnership", d: "Multi-year programme combining consulting, training and certification at scale." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Advisory and enablement from the people who teach it"
        description="Our consultants deliver the engagements and then teach the course — which is why our advice is practical and our training is current."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
      >
        <ActionButton to="/contact" variant="gold" size="lg">
          Book a Free Consultation
        </ActionButton>
      </PageHero>

      <section className="section-y container-x">
        <SectionHeading eyebrow="Practice areas" title="Six services, one accountable team" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {consulting.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <FeatureCard {...c} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Solutions" title="Where to go next" align="center" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft"
              >
                <h3 className="text-lg text-navy">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                <span className="mt-auto pt-6 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Engagement models"
            title="Structured to fit how you buy"
            description="Fixed-scope assessments, retained advisory or embedded capability partnerships — with clear deliverables at every stage."
          />
          <ul className="mt-8 grid gap-4">
            {engagementModels.map((m) => (
              <li key={m.t} className="rounded-2xl border border-border bg-surface p-6">
                <p className="text-base font-semibold text-navy">{m.t}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{m.d}</p>
              </li>
            ))}
          </ul>
        </div>
        <InquiryForm title="Talk to an Expert" interests={consulting.map((c) => c.title)} compact />
      </section>

      <CtaBand
        title="Start with a focused assessment"
        description="A short engagement that produces a prioritised roadmap, a business case and a capability plan you can act on."
        primary={{ label: "Book a Free Consultation", to: "/contact" }}
        secondary={{ label: "Corporate Training", to: "/corporate-training" }}
      />
    </>
  );
}