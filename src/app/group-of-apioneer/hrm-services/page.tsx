import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Cpu,
  GraduationCap,
  HeartPulse,
  LayoutGrid,
  LineChart,
  MonitorCog,
  Presentation,
  Rocket,
  School,
  ShieldCheck,
  ShoppingBag,
  Target,
  TrendingUp,
  UserCog,
  Users2,
  UserSearch,
} from "lucide-react";
import { ActionButton, CtaBand, SectionHeading } from "@/components/site/ui";
import { InquiryForm } from "@/components/site/InquiryForm";

const title = "HRM Services — Group of APIONEER";
const description =
  "People solutions that build stronger organizations. End-to-end HR consulting, talent acquisition and outsourcing delivered by APIONEER.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const hrmSolutions = [
  { icon: UserCog, title: "HR Consulting", detail: "Strategic HR advisory to align people practices with business goals." },
  { icon: UserSearch, title: "Talent Acquisition", detail: "End-to-end recruitment solutions to attract the right talent." },
  { icon: Users2, title: "HR Outsourcing", detail: "Flexible HR outsourcing services to reduce cost and improve efficiency." },
  { icon: LineChart, title: "Performance Management", detail: "Build performance-driven cultures that deliver measurable results." },
  { icon: Presentation, title: "Learning & Development", detail: "Develop skills and capability through customized L&D interventions." },
  { icon: MonitorCog, title: "HR Technology Solutions", detail: "Leverage technology to automate HR processes and drive analytics." },
];

const approachSteps = [
  { title: "Understand Business Goals", detail: "We understand your business, culture and people challenges." },
  { title: "Assess & Analyze", detail: "We assess current state and identify gaps and opportunities." },
  { title: "Design Solutions", detail: "We design customized HR solutions aligned with your needs." },
  { title: "Implement Effectively", detail: "We implement with agility, ensuring adoption and compliance." },
  { title: "Measure Impact", detail: "We measure outcomes and drive continuous improvement." },
];

const industries = [
  { icon: MonitorCog, label: "IT & ITES" },
  { icon: Building2, label: "BFSI" },
  { icon: Cpu, label: "Manufacturing" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: ShoppingBag, label: "Retail & Consumer" },
  { icon: School, label: "Education" },
  { icon: Briefcase, label: "Professional Services" },
  { icon: Rocket, label: "Startups" },
  { icon: LayoutGrid, label: "More Industries" },
];

const hrmPartners = [
  { name: "SHRM", tag: "Affiliate Partner" },
  { name: "peopleHum", tag: "Technology Partner" },
  { name: "darwinbox", tag: "Technology Partner" },
  { name: "xoxoday", tag: "Engagement Partner" },
  { name: "indeed", tag: "Hiring Partner" },
  { name: "coursera for business", tag: "Learning Partner" },
];

const whyChoose = [
  { icon: Target, title: "Strategic Expertise", detail: "Deep HR expertise across industries and functions." },
  { icon: MonitorCog, title: "Technology Enabled", detail: "Leverage best-in-class technology for efficiency and insights." },
  { icon: Users2, title: "People-Centric Approach", detail: "Solutions designed around people and culture." },
  { icon: TrendingUp, title: "Proven Impact", detail: "Delivering measurable outcomes that drive business growth." },
  { icon: Rocket, title: "Agile & Scalable", detail: "Flexible engagement models to suit organizations of all sizes." },
  { icon: ShieldCheck, title: "End-to-End Support", detail: "From strategy to execution and continuous improvement." },
];

export default function HrmServicesPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div
          aria-hidden
          className="absolute -left-24 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.106 195 / 0.18), transparent 60%)" }}
        />
        <div className="container-x relative py-6 text-xs text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/group-of-apioneer" className="hover:text-white">Group of APIONEER</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">HRM Services</span>
        </div>

        <div className="container-x relative grid gap-12 pb-20 pt-4 md:pb-24 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-teal">02</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-teal">
                <Users2 className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold uppercase leading-[1.1] text-white sm:text-5xl">
              HRM Services
            </h1>
            <p className="mt-4 text-lg font-semibold text-teal">
              People solutions that build stronger organizations.
            </p>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70">
              We help organizations attract, engage and develop talent while building high-performing workforces for
              sustainable growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionButton to="#services" variant="gold" size="lg">
                Explore Services
              </ActionButton>
              <ActionButton to="/contact" variant="ghost-light" size="lg">
                Talk to an Expert
              </ActionButton>
            </div>
          </div>

          <div className="relative">
          <div className="relative aspect-[5/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy to-teal/40 shadow-lift">
            <Image
              src="/images/hrm-services-hero.jpg"
              alt="HRM Services Hero Image"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="rounded-3xl object-cover"
            />
          </div>
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:grid-cols-4">
              {[
                { icon: Target, label: "Strategic HR Solutions" },
                { icon: UserSearch, label: "Talent Focused" },
                { icon: MonitorCog, label: "Process Driven" },
                { icon: TrendingUp, label: "Measurable Impact" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                  <f.icon className="h-5 w-5 text-teal" aria-hidden />
                  <span className="text-xs leading-tight text-white/75">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Our HRM Solutions ---------------- */}
      <section id="services" className="section-y container-x">
        <SectionHeading eyebrow="What we offer" title="Our HRM Solutions" align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hrmSolutions.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-7 text-center shadow-soft">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-teal/25 text-teal">
                <s.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Our Approach + Industries ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl text-navy">Our Approach</h2>
            <ol className="mt-6 grid gap-5">
              {approachSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-gradient text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Industries We Serve</h2>
            <div className="mt-6 grid grid-cols-3 gap-5">
              {industries.map((ind) => (
                <div key={ind.label} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-teal/25 text-teal">
                    <ind.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <span className="text-xs leading-tight text-muted-foreground">{ind.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Our Partners ---------------- */}
      <section className="section-y container-x">
        <SectionHeading eyebrow="Trusted by" title="Our Partners" align="center" />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {hrmPartners.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <span className="font-display text-base font-bold text-navy">{p.name}</span>
              <p className="text-xs text-muted-foreground">{p.tag}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ActionButton to="/contact" variant="outline">
            View All Partners
          </ActionButton>
        </div>
      </section>

      {/* ---------------- Why choose + Enquiry form ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep py-20">
        <div
          aria-hidden
          className="absolute -right-20 bottom-0 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.106 195 / 0.16), transparent 60%)" }}
        />
        <div className="container-x relative grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-teal">Why choose APIONEER?</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {whyChoose.map((w) => (
                <div key={w.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-gold">
                    <w.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{w.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">{w.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <InquiryForm
              title="Ready to Transform Your HR?"
              description="Let's build a people strategy that drives performance and accelerates your business growth."
              interests={[
                "HR Consulting",
                "Talent Acquisition",
                "HR Outsourcing",
                "Performance Management",
                "Learning & Development",
                "HR Technology Solutions",
              ]}
              compact
            />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to build a stronger workforce?"
        description="Partner with us to build agile teams and future-ready organizations."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Back to Group of APIONEER", to: "/group-of-apioneer" }}
      />
    </>
  );
}