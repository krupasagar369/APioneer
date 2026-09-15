import type { Metadata } from "next";
import { BarChart3, ClipboardCheck, Layers, Rocket, Users2, Workflow } from "lucide-react";
import { industries, testimonials } from "@/data/site";
import { ActionButton, CtaBand, FeatureCard, PageHero, SectionHeading } from "@/components/site/ui";
import { TestimonialCard } from "@/components/site/cards";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/components/site/Stats";

const title = "Corporate Training Solutions for Enterprise Teams | aPIONEER";
const description =
  "Private cohorts, capability academies and role-based learning paths with baselining, tailored curriculum and outcome reporting.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

const process = [
  { step: "01", title: "Discover", detail: "Stakeholder interviews and role-mapped assessments establish the capability baseline." },
  { step: "02", title: "Design", detail: "Curriculum blueprint blending accredited modules with your architecture and case studies." },
  { step: "03", title: "Deliver", detail: "Facilitated cohorts onsite or live virtual, with guided labs and practice assessments." },
  { step: "04", title: "Demonstrate", detail: "Certification results, competency uplift and manager-observed application reporting." },
];

const features = [
  { icon: ClipboardCheck, title: "Capability baselining", detail: "Role-mapped assessments quantify the starting position for every participant." },
  { icon: Layers, title: "Tailored curriculum", detail: "Accredited modules blended with your standards, tooling and reference architecture." },
  { icon: Users2, title: "Practitioner faculty", detail: "Trainers who consult on live engagements bring current, unvarnished experience." },
  { icon: Workflow, title: "Flexible delivery", detail: "Onsite, live virtual or blended across time zones with regional delivery teams." },
  { icon: BarChart3, title: "Outcome analytics", detail: "Dashboards for attendance, labs, certification results and applied competency." },
  { icon: Rocket, title: "Post-programme support", detail: "Mentor office hours and refresher clinics keep new capability in circulation." },
];

const guarantees = ["Volume pricing from 10 delegates", "Delivery in 42 countries", "Dedicated programme manager", "Quarterly capability reviews"];

export default function CorporateTrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate training"
        title="Capability academies designed around your delivery roadmap"
        description="We build private cohorts for enterprise teams of ten to ten thousand — measured, accredited and tailored to the technology you actually run."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Corporate Training" }]}
        image="/images/corporate-training.jpg"
      >
        <div className="flex flex-wrap gap-3">
          <ActionButton to="/contact" variant="gold" size="lg">
            Corporate Inquiry
          </ActionButton>
          <ActionButton to="/resources" variant="outline" size="lg">
            Download Brochure
          </ActionButton>
        </div>
      </PageHero>

      <section className="section-y container-x">
        <SectionHeading
          eyebrow="Why enterprises choose us"
          title="Training that survives executive scrutiny"
          description="Every programme carries a measurement plan agreed before delivery starts — so the conversation at the end is about outcomes, not attendance."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <FeatureCard {...f} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-x">
          <SectionHeading eyebrow="How we work" title="A four-stage engagement model" align="center" />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 70}>
                <li className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft">
                  <span className="font-display text-4xl font-bold text-teal/25">{p.step}</span>
                  <h3 className="mt-3 text-lg text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y container-x">
        <SectionHeading eyebrow="Industries" title="Sector-aware programme design" align="center" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {industries.map((i) => (
            <article key={i.name} className="card-lift rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-base font-semibold text-navy">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-gradient section-y">
        <div className="container-x relative">
          <SectionHeading eyebrow="Client outcomes" title="What enterprise sponsors report" tone="light" />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} item={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Get started"
            title="Tell us what your teams need to be able to do"
            description="Share your roadmap and team profile. Within one business day you will have a named advisor, an indicative plan and a cost envelope."
          />
          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground">
            {guarantees.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <InquiryForm title="Corporate Inquiry" />
      </section>

      <CtaBand
        title="Bring accredited capability in-house"
        description="Speak with a senior advisor about a private cohort, an academy or a multi-year capability programme."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View Courses", to: "/courses" }}
      />
    </>
  );
}