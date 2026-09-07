import type { Metadata } from "next";
import { Compass, HeartHandshake, Radar, ShieldCheck, Sparkles, Target } from "lucide-react";
import { stats } from "@/data/site";
import { ActionButton, CtaBand, PageHero, SectionHeading, FeatureCard } from "@/components/site/ui";
import { Reveal, StatCard } from "@/components/site/Stats";

const title = "About APIONEER — Enterprise Learning & Consulting Firm";
const description =
  "Founded to make enterprise capability measurable, APIONEER delivers accredited training, certification and consulting across 42 countries.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const values = [
  { icon: Target, title: "Outcomes over attendance", detail: "We commit to competency uplift, not seat counts. Every engagement carries a measurement plan." },
  { icon: ShieldCheck, title: "Accreditation discipline", detail: "Official curriculum, authorised trainers and auditable delivery records on every programme." },
  { icon: HeartHandshake, title: "Partnership, not procurement", detail: "Long-horizon relationships with shared roadmaps rather than transactional course bookings." },
  { icon: Radar, title: "Practitioner-first faculty", detail: "Our trainers consult. Our consultants train. Content stays honest because the work is real." },
  { icon: Compass, title: "Global, locally delivered", detail: "Regional delivery teams across India, GCC, APAC and EMEA with consistent quality standards." },
  { icon: Sparkles, title: "Continuous reinvention", detail: "Curriculum is reviewed quarterly against platform releases and regulatory change." },
];

const timeline = [
  { year: "2015", title: "Founded in Bengaluru", detail: "Started as a specialist cloud and quality certification practice serving Indian IT services firms." },
  { year: "2018", title: "Accredited partnerships", detail: "Formalised partnerships across Microsoft, PECB and Scrum Alliance, opening enterprise delivery at scale." },
  { year: "2021", title: "Public sector practice", detail: "Launched dedicated government training division delivering statewide digital capability programmes." },
  { year: "2023", title: "Consulting practice", detail: "Extended into cloud architecture, ISMS implementation and platform engineering advisory." },
  { year: "2026", title: "42 countries", detail: "Global delivery network with 250,000+ professionals trained and an enterprise learning analytics platform." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About APIONEER"
        title="A capability partner built for enterprises that measure everything"
        description="APIONEER Business Solutions Private Limited exists to close the distance between technology ambition and workforce reality — through accredited learning, rigorous consulting and honest measurement."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ActionButton to="/contact" variant="gold" size="lg">
            Talk to an Expert
          </ActionButton>
          <ActionButton to="/careers" variant="outline" size="lg">
            Join the team
          </ActionButton>
        </div>
      </PageHero>

      <section className="section-y container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Our story"
            title="We started because training was being bought, not measured"
            description="A decade ago our founders were running transformation programmes and kept seeing the same failure: significant learning budgets with no line of sight to capability. APIONEER was built to fix that — combining accredited curriculum with the measurement rigour of an engineering practice."
          />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Today we operate four practices — Corporate Training, Government Training, Certification and Consulting —
            supported by a faculty of practitioners who spend part of their year on client engagements. That structure
            keeps our content current and our advice grounded in what actually ships.
          </p>
        </div>
        <Reveal>
          <div className="overflow-hidden rounded-3xl shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/corporate-training.jpg"
              alt="APIONEER facilitators working with an enterprise leadership team"
              width={1408}
              height={1008}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-surface section-y">
        <div className="container-x">
          <SectionHeading eyebrow="By the numbers" title="Scale that stays accountable" align="center" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} tone="dark" index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y container-x">
        <SectionHeading eyebrow="Our values" title="Six principles that shape every engagement" align="center" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <FeatureCard {...v} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Milestones" title="How we grew" />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 70}>
                <li className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <span className="font-display text-2xl font-bold text-gold">{t.year}</span>
                  <h3 className="mt-3 text-base text-navy">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Let's design your capability roadmap"
        description="Bring us your transformation plan and we will map the skills, certifications and timelines needed to deliver it."
        primary={{ label: "Book a Free Consultation", to: "/contact" }}
        secondary={{ label: "Explore Services", to: "/services" }}
      />
    </>
  );
}
