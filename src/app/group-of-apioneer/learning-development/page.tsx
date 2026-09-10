import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  FolderCog,
  Globe2,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Star,
  TrendingUp,
  Users2,
} from "lucide-react";
import { ActionButton, CtaBand, SectionHeading } from "@/components/site/ui";
import { InquiryForm } from "@/components/site/InquiryForm";

const title = "Learning & Development — Group of APIONEER";
const description =
  "Future-ready learning for individuals and enterprises. World-class training, certifications and technology learning delivered by APIONEER.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const learningSolutions = [
  { icon: Laptop, title: "Technology Training", detail: "Cutting-edge technology courses to build in-demand skills." },
  { icon: BrainCircuit, title: "AI & Data Training", detail: "Build AI, ML and Data capabilities for the future." },
  { icon: Cloud, title: "Cloud & IT Infrastructure", detail: "Master cloud platforms, DevOps and modern infrastructure." },
  { icon: Award, title: "Professional Certifications", detail: "Global certifications that validate your expertise." },
  { icon: Users2, title: "Leadership & Soft Skills", detail: "Develop leadership, communication and people skills." },
  { icon: FolderCog, title: "Custom Corporate Programs", detail: "Tailored learning solutions for your organization." },
];

const popularPrograms = [
  "AI & Generative AI",
  "Cloud Computing",
  "Data Science & Analytics",
  "Cyber Security",
  "DevOps & Automation",
  "Microsoft Technologies",
  "IT Service Management",
  "Project Management",
  "Business Analytics",
  "Leadership Development",
];

const impactStats = [
  { icon: GraduationCap, value: "1000+", label: "Training Programs" },
  { icon: Users2, value: "200K+", label: "Professionals Trained" },
  { icon: Globe2, value: "25+", label: "Countries Served" },
  { icon: Star, value: "98%", label: "Learner Satisfaction" },
];


const learningPartnerLogos = [
  { name: "IBM", logo: "https://ik.imagekit.io/iq6dnzo5f/ibm.jpg", tag: "Authorized Training Partner" },
  { name: "Microsoft", logo: "https://ik.imagekit.io/iq6dnzo5f/Microsoft-Learning-Partner.webp?updatedAt=1771827020366", tag: "Learning Partner" },
  { name: "VMware", logo: "https://ik.imagekit.io/iq6dnzo5f/vmware-logo.png", tag: "Authorized Training Partner" },
  { name: "Scrum Alliance", logo: "https://ik.imagekit.io/iq6dnzo5f/scrumalliance.png?updatedAt=1784010605297", tag: "Registered Education Partner" },
  { name: "PECB", logo: "https://ik.imagekit.io/iq6dnzo5f/PECB_Logo.png?updatedAt=1784091400773", tag: "Authorized Partner" },
  { name: "AI CERTs", logo: "https://ik.imagekit.io/iq6dnzo5f/image-removebg-preview.png?updatedAt=1761801306494", tag: "Authorized Partner" },
];

const whyChoose = [
  { icon: Star, title: "Industry-Aligned Curriculum", detail: "Designed by experts and updated with industry trends." },
  { icon: Users2, title: "Experienced Instructors", detail: "Learn from certified professionals with real-world expertise." },
  { icon: Laptop, title: "Flexible Learning Options", detail: "Classroom, Online LIVE, Self-paced and Blended learning." },
  { icon: Globe2, title: "Global Certifications", detail: "Get certified with globally recognized partners." },
  { icon: TrendingUp, title: "Measurable Outcomes", detail: "Practical learning that drives performance and growth." },
  { icon: ShieldCheck, title: "End-to-End Support", detail: "From enrollment to certification and career support." },
];

export default function LearningDevelopmentPage() {
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
          <span className="text-white/80">Learning &amp; Development</span>
        </div>

        <div className="container-x relative grid gap-12 pb-20 pt-4 md:pb-24 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-teal">01</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-teal">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold uppercase leading-[1.1] text-white sm:text-5xl">
              Learning &amp; Development
            </h1>
            <p className="mt-4 text-lg font-semibold text-teal">
              Future-ready learning for individuals and enterprises.
            </p>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70">
              We empower professionals and organizations with world-class training, certifications and technology
              learning that drives growth and builds future-ready capabilities.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionButton to="#programs" variant="gold" size="lg">
                Explore Programs
              </ActionButton>
              <ActionButton to="/contact" variant="ghost-light" size="lg">
                Talk to an Expert
              </ActionButton>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy to-teal/40 shadow-lift">
              <Image
                src="/images/learning-development-hero.jpg"
                alt="Trainer leading a technology learning and development session"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="rounded-3xl object-cover"
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:grid-cols-4">
              {[
                { icon: Users2, label: "Industry Relevant Programs" },
                { icon: ShieldCheck, label: "Expert Instructors" },
                { icon: Award, label: "Global Certifications" },
                { icon: TrendingUp, label: "Measurable Outcomes" },
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

      {/* ---------------- Our Learning Solutions ---------------- */}
      <section id="programs" className="section-y container-x">
        <SectionHeading eyebrow="What we offer" title="Our Learning Solutions" align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {learningSolutions.map((s) => (
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

      {/* ---------------- Popular Programs + Impact ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl text-navy">Popular Programs</h2>
            <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {popularPrograms.map((p) => (
                <div key={p} className="flex items-center gap-2.5 text-sm text-navy">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" aria-hidden />
                  {p}
                </div>
              ))}
            </div>
            <div className="mt-7 aspect-[16/7] overflow-hidden rounded-2xl bg-gradient-to-br from-navy/8 to-teal/12">
              {/* Replace with a real photo at /images/learning-development-programs.jpg */}
              <div className="flex h-full w-full items-center justify-center">
                <Laptop className="h-10 w-10 text-navy/20" aria-hidden />
              </div>
            </div>
            <div className="mt-7">
              <ActionButton to="/courses" variant="navy">
                View All Programs
              </ActionButton>
            </div>
          </div>

          <div className="rounded-3xl bg-navy-gradient p-8 text-on-dark shadow-lift">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-teal">The APIONEER Impact</p>
            <div className="mt-6 grid gap-6">
              {impactStats.map((s) => (
                <div key={s.label} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                    <s.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-sm text-on-dark-muted">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Global Learning Partners ---------------- */}
      <section className="section-y container-x">
        <SectionHeading eyebrow="Accredited by" title="Our Global Learning Partners" align="center" />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {learningPartnerLogos.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={`${p.name} logo`} className="h-9 w-auto max-w-[7rem] object-contain" />
              <p className="text-xs text-muted-foreground">{p.tag}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ActionButton to="/learning-partners" variant="outline">
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
              title="Ready to Upskill Your Team?"
              description="Let's build a customized learning journey that meets your business and talent goals."
              interests={[
                "Technology Training",
                "AI & Data Training",
                "Cloud & IT Infrastructure",
                "Professional Certifications",
                "Leadership & Soft Skills",
                "Custom Corporate Programs",
              ]}
              compact
            />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to build a future-ready team?"
        description="Speak with a senior learning advisor about a tailored programme for your organisation."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Back to Group of APIONEER", to: "/group-of-apioneer" }}
      />
    </>
  );
}