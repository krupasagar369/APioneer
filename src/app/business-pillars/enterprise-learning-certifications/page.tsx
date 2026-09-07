import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  GraduationCap,
  Landmark,
  MonitorCog,
  Presentation,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users2,
  Zap,
} from "lucide-react";
import { ActionButton, CtaBand, SectionHeading } from "@/components/site/ui";

const title = "Enterprise Learning Solutions & Certifications — Business Pillars | APIONEER";
const description =
  "Build Skills. Certify Expertise. Transform Organizations. Technology-powered learning solutions for the workforce of tomorrow.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const orbitNodes = [
  { icon: Sparkles, label: "AI & Gen AI" },
  { icon: MonitorCog, label: "Microsoft Technologies" },
  { icon: Cpu, label: "IBM Technologies" },
  { icon: Award, label: "Certifications" },
  { icon: Rocket, label: "Agile & Scrum" },
  { icon: ShieldCheck, label: "Cyber Security" },
  { icon: Database, label: "Data & Analytics" },
  { icon: Cloud, label: "Cloud Computing" },
];

const skillsToImpact = [
  { icon: Search, title: "Assess", detail: "Identify skill gaps and future needs.", accent: "#158A80" },
  { icon: GraduationCap, title: "Learn", detail: "Gain relevant knowledge and skills.", accent: "#1F5AA6" },
  { icon: Award, title: "Certify", detail: "Validate expertise with global certifications.", accent: "#6E3E9E" },
  { icon: Briefcase, title: "Apply", detail: "Apply learning in real-world scenarios.", accent: "#2C3E8C" },
  { icon: TrendingUp, title: "Transform", detail: "Drive measurable business and career impact.", accent: "#158A80" },
];

const ecosystem = [
  { number: "01", icon: Cpu, title: "Technology Learning", items: ["AI & Generative AI", "Cloud Computing", "Data & Analytics", "Cybersecurity", "Digital Transformation", "Enterprise Applications"] },
  { number: "02", icon: Bot, title: "AI & Future Skills", items: ["Artificial Intelligence", "Generative AI", "Machine Learning", "AI for Business", "Prompt Engineering", "AI Productivity", "Responsible AI"] },
  { number: "03", icon: Award, title: "Professional Certifications", items: ["Technology Certifications", "Agile & Scrum", "Project & Professional Management", "Cybersecurity", "AI Certifications", "Leadership & Business Certifications"] },
  { number: "04", icon: Landmark, title: "Enterprise Academies", items: ["Technology Academy", "AI Academy", "Cloud Academy", "Data Academy", "Cybersecurity Academy", "Leadership Academy"] },
  { number: "05", icon: TrendingUp, title: "Upskilling & Reskilling", items: ["Workforce Upskilling", "Digital Reskilling", "Role-Based Learning", "Career Transition Programs", "Emerging Technology Programs"] },
  { number: "06", icon: Presentation, title: "Leadership & Professional Development", items: ["Leadership Development", "Management Development", "Business Communication", "Executive Development", "Team Effectiveness", "Future Leadership"] },
];

const techPartners = [
  { name: "IBM", tag: "Learning Partner" },
  { name: "Microsoft", tag: "Solutions Partner" },
  { name: "Baracoda", tag: "Official Partner" },
  { name: "Scrum Alliance", tag: "Education Partner" },
  { name: "AI CERTs", tag: "Authorized Partner" },
  { name: "PECB", tag: "Authorized Partner" },
];

const learningSolutions = [
  { icon: Target, title: "Learning Needs Assessment", detail: "Identify current capability gaps and future skill requirements." },
  { icon: Settings2, title: "Customized Curriculum", detail: "Develop programs around your technology environment and business objectives." },
  { icon: Award, title: "Certification Programs", detail: "Structured preparation and certification pathways for professionals." },
  { icon: BarChart3, title: "Assessment & Measurement", detail: "Evaluate learning effectiveness and business impact." },
  { icon: Building2, title: "Learning Architecture", detail: "Build structured learning journeys aligned to business and job roles." },
  { icon: Users2, title: "Instructor-Led Training", detail: "Classroom, virtual and hybrid learning delivery." },
  { icon: Landmark, title: "Learning Academies", detail: "Long-term workforce capability development programs." },
];

const learningJourney = [
  { number: "01", title: "Discover", detail: "Understand business requirements and workforce needs." },
  { number: "02", title: "Assess", detail: "Identify skills, competency and capability gaps." },
  { number: "03", title: "Learn", detail: "Deliver structured, relevant and engaging learning." },
  { number: "04", title: "Certify", detail: "Enable professionals to validate their expertise." },
  { number: "05", title: "Apply", detail: "Convert knowledge into workplace capability." },
  { number: "06", title: "Transform", detail: "Create measurable organizational impact." },
];

const learnerLevels = [
  { icon: Briefcase, title: "Executives", detail: "Strategic technology understanding, AI for leadership, digital transformation, executive development." },
  { icon: Cpu, title: "Technology Professionals", detail: "AI, Cloud, Data, Cybersecurity, Enterprise technology." },
  { icon: TrendingUp, title: "Business Professionals", detail: "Digital skills, Productivity, Agile, Business transformation." },
  { icon: GraduationCap, title: "Early-Career Professionals", detail: "Technology foundations, Professional certifications, Career skills, Industry readiness." },
];

const deliveryModels = [
  { icon: Building2, title: "On-Site", detail: "At your location" },
  { icon: MonitorCog, title: "Virtual", detail: "Live online learning" },
  { icon: Cloud, title: "Hybrid", detail: "Blended experience" },
  { icon: Landmark, title: "Custom Academy", detail: "Long-term programs" },
  { icon: Users2, title: "Open Programs", detail: "For individuals & organizations" },
];

const industries = [
  { icon: Cpu, label: "Technology & IT" },
  { icon: Building2, label: "Banking & Financial Services" },
  { icon: Settings2, label: "Manufacturing" },
  { icon: TrendingUp, label: "Automotive" },
  { icon: Zap, label: "Energy & Utilities" },
  { icon: Presentation, label: "Telecom" },
  { icon: Briefcase, label: "Professional Services" },
  { icon: Landmark, label: "Government & Public Sector" },
];

const whyApioneer = [
  ["Enterprise Focus", "Learning aligned to business objectives."],
  ["Technology Ecosystem", "Access to relevant technology and certification pathways."],
  ["Customized Programs", "Programs designed around organizational requirements."],
  ["Experienced Faculty", "Subject matter experts and industry practitioners."],
  ["Flexible Delivery", "On-site, virtual, hybrid and academy models."],
  ["Global Outlook", "Learning capabilities to support organizations across markets."],
];

const learningAdvantage = [
  { icon: GraduationCap, title: "Learn", detail: "Acquire relevant knowledge" },
  { icon: Award, title: "Certify", detail: "Validate professional capability" },
  { icon: Briefcase, title: "Apply", detail: "Use knowledge in real business situations" },
  { icon: TrendingUp, title: "Transform", detail: "Create measurable organizational value" },
];

export default function EnterpriseLearningSolutionsPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div
          aria-hidden
          className="absolute right-[6%] top-[8%] h-[24rem] w-[24rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.106 195 / 0.2), transparent 60%)" }}
        />
        <div className="container-x relative py-6 text-xs text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/#pillars" className="hover:text-white">Business Pillars</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">Enterprise Learning Solutions &amp; Certifications</span>
        </div>

        <div className="container-x relative grid gap-14 pb-20 pt-4 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="text-balance text-4xl font-bold uppercase leading-[1.1] text-white sm:text-5xl">
              02 | Enterprise
              <br />
              <span className="text-teal">Learning Solutions</span>
              <br />
              <span className="text-teal">&amp; Certifications</span>
            </h1>
            <p className="mt-5 text-lg font-semibold text-gold">
              Build Skills. Certify Expertise. Transform Organizations.
            </p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/70">
              Technology-powered learning solutions for the workforce of tomorrow.
            </p>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-white/60">
              APIONEER helps organizations and professionals build future-ready capabilities through enterprise
              learning, technology training, professional certifications, customized academies and workforce
              transformation programs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionButton to="#ecosystem" variant="gold" size="lg">
                Explore Learning Solutions
              </ActionButton>
              <ActionButton to="/contact" variant="ghost-light" size="lg">
                Talk to APIONEER
              </ActionButton>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[24rem]">
            <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
            <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-teal/20 text-teal">
              <Bot className="h-9 w-9" aria-hidden />
            </div>
            {orbitNodes.map((n, i) => {
              const angle = (i / orbitNodes.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 44;
              const left = 50 + radius * Math.cos(angle);
              const top = 50 + radius * Math.sin(angle);
              return (
                <div
                  key={n.label}
                  className="absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <span className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full border-2 border-teal/40 bg-navy text-teal">
                    <n.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="block text-[0.65rem] leading-tight text-white/70">{n.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Future belongs to skilled orgs + skills-to-impact ---------------- */}
      <section className="section-y container-x">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-teal">The future belongs to skilled organizations</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Technology is transforming the way organizations operate, compete and create value.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AI, cloud computing, cybersecurity, data, automation and digital platforms are changing the skills
              required across every industry.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              APIONEER helps organizations respond to this transformation through structured learning and
              capability-building programs designed around their business objectives.
            </p>
          </div>

          <div>
            <p className="text-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-navy-soft">From skills to business impact</p>
            <div className="mt-6 grid grid-cols-5 gap-3">
              {skillsToImpact.map((s) => (
                <div key={s.title} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full text-white" style={{ backgroundColor: s.accent }}>
                    <s.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <p className="text-xs font-bold text-navy">{s.title}</p>
                  <p className="text-[0.65rem] leading-tight text-muted-foreground">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Our Enterprise Learning Ecosystem ---------------- */}
      <section id="ecosystem" className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="What we offer" title="Our Enterprise Learning Ecosystem" align="center" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystem.map((e) => (
              <div key={e.number} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl font-bold text-teal">{e.number}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-teal/10 text-teal">
                    <e.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                </div>
                <h3 className="mt-3 text-base text-navy">{e.title}</h3>
                <ul className="mt-3 grid gap-1.5">
                  {e.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Technology & Certification ecosystem ---------------- */}
      <section className="section-y container-x">
        <SectionHeading eyebrow="Learning through a global technology ecosystem" title="Our Technology &amp; Certification Ecosystem" align="center" />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {techPartners.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <span className="font-display text-base font-bold text-navy">{p.name}</span>
              <p className="text-xs text-muted-foreground">{p.tag}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          *Partnerships and authorizations are subject to our current agreements and valid certifications.
        </p>
      </section>

      {/* ---------------- Enterprise learning solutions + Journey + Levels ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="text-lg text-navy">Enterprise Learning Solutions</h2>
            <p className="mt-1 text-xs text-muted-foreground">Learning designed around your business</p>
            <div className="mt-5 grid gap-4">
              {learningSolutions.map((s) => (
                <div key={s.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal/10 text-teal">
                    <s.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{s.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="text-lg text-navy">Our Learning Journey</h2>
            <ol className="mt-5 grid gap-4">
              {learningJourney.map((step) => (
                <li key={step.number} className="flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-gradient text-xs font-bold text-white">
                    {step.number}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{step.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="text-lg text-navy">Learning for Every Level</h2>
            <div className="mt-5 grid gap-4">
              {learnerLevels.map((l) => (
                <div key={l.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gold/12 text-gold-dark">
                    <l.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{l.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{l.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery models */}
        <div className="container-x mt-8">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="text-center text-lg text-navy">Delivery Models</h2>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-5">
              {deliveryModels.map((d) => (
                <div key={d.title} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-teal/25 text-teal">
                    <d.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <p className="text-sm font-semibold text-navy">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Industries + Why aPIONEER ---------------- */}
      <section className="section-y container-x">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Industries We Support</h2>
            <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-4">
              {industries.map((ind) => (
                <div key={ind.label} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-teal/25 text-teal">
                    <ind.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <span className="text-xs leading-tight text-muted-foreground">{ind.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              *Industries listed reflect our current focus and experience.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Why APIONEER?</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {whyApioneer.map(([t, d]) => (
                <div key={t} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-navy">{t}</p>
                    <p className="text-xs text-muted-foreground">{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-wide text-navy-soft">The APIONEER Learning Advantage</p>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {learningAdvantage.map((a) => (
                <div key={a.title} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/12 text-gold-dark">
                    <a.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-[0.65rem] font-semibold leading-tight text-navy">{a.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Build the workforce that builds your future"
        description="Whether you are launching an AI transformation program, building a technology academy, preparing employees for certification or developing future-ready leadership capabilities, APIONEER can help you design the learning journey."
        primary={{ label: "Talk to APIONEER Learning Experts", to: "/contact" }}
        secondary={{ label: "Explore Certifications", to: "/learning-partners" }}
      />
    </>
  );
}