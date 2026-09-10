import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Briefcase,
  Building2,
  Cable,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  Factory,
  GitMerge,
  Handshake,
  HeartPulse,
  Landmark,
  Layers3,
  MonitorSmartphone,
  Puzzle,
  Rocket,
  ScanSearch,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  TestTube2,
  TrendingUp,
  Users2,
  Webhook,
  Wrench,
  Zap,
} from "lucide-react";
import { ActionButton, CtaBand, SectionHeading } from "@/components/site/ui";

const title = "Technology & Product Solutions — Business Pillars | APIONEER";
const description =
  "Enable Innovation. Accelerate Growth. Deliver Impact. Technology and products that help organizations modernize, automate, integrate and scale.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const orbitNodes = [
  { icon: Cloud, label: "Cloud Solutions" },
  { icon: Layers3, label: "Enterprise Applications" },
  { icon: Webhook, label: "Integration & Automation" },
  { icon: Handshake, label: "Managed Services" },
  { icon: Wrench, label: "Product Engineering" },
  { icon: ShieldCheck, label: "Cybersecurity Solutions" },
  { icon: Sparkles, label: "AI & Data Solutions" },
];

const solutionAreas = [
  { number: "01", icon: Cloud, title: "Cloud Solutions", items: ["Cloud Strategy & Consulting", "Cloud Migration", "Cloud Modernization", "Multi-Cloud Management", "Cloud Optimization", "Cloud Security"] },
  { number: "02", icon: Sparkles, title: "AI & Data Solutions", items: ["AI Strategy & Consulting", "Machine Learning Solutions", "Generative AI Solutions", "Data Engineering", "Data Analytics & BI", "AI-Powered Automation"] },
  { number: "03", icon: Layers3, title: "Enterprise Applications", items: ["ERP Solutions", "CRM Solutions", "Business Applications", "Low-Code / No-Code Platforms", "Application Modernization", "Enterprise Mobility"] },
  { number: "04", icon: ShieldCheck, title: "Cybersecurity Solutions", items: ["Security Assessment", "Risk & Compliance", "Security Architecture", "Identity & Access Management", "Threat Detection & Response", "Security Operations"] },
  { number: "05", icon: Webhook, title: "Integration & Automation", items: ["Enterprise Integration", "Process Automation", "Workflow Automation", "API Management", "RPA Solutions", "DevOps & CI/CD"] },
  { number: "06", icon: Wrench, title: "Product Engineering", items: ["Software Product Development", "Platform Engineering", "SaaS Product Development", "UI/UX Engineering", "Testing & Quality Engineering", "Product Sustenance"] },
];

const products = [
  { icon: MonitorSmartphone, title: "aPIONEER LXP", detail: "A modern Learning Experience Platform for enterprises to create, deliver and measure impactful learning." },
  { icon: Cpu, title: "aPIONEER HR Connect", detail: "A unified HR platform to streamline HR processes, employee lifecycle and workforce analytics." },
  { icon: TrendingUp, title: "aPIONEER Analytics", detail: "Data analytics and business intelligence platform for smarter decisions and real-time insights." },
  { icon: ShieldCheck, title: "aPIONEER Secure", detail: "Integrated security platform for monitoring, detecting and responding to cyber threats in real time." },
  { icon: GitMerge, title: "aPIONEER Integrate", detail: "Low-code integration and automation platform to connect systems, data and processes." },
  { icon: Puzzle, title: "Custom Solutions", detail: "Tailored technology solutions built to address unique business challenges and industry needs." },
];

const capabilities = [
  { icon: Target, title: "Strategy & Consulting", detail: "Align technology initiatives with business objectives." },
  { icon: ServerCog, title: "Solution Engineering", detail: "Design and build scalable, secure and future-ready solutions." },
  { icon: Rocket, title: "Implementation Excellence", detail: "Industry-leading methodologies for on-time, on-budget delivery." },
  { icon: Handshake, title: "Managed Services", detail: "Proactive monitoring, management and continuous improvement." },
  { icon: Sparkles, title: "Innovation & R&D", detail: "Investing in emerging technologies to create innovative solutions." },
];

const engagementModels = [
  { icon: Briefcase, title: "Project Based", detail: "Fixed scope and timeline engagements." },
  { icon: Handshake, title: "Managed Services", detail: "End-to-end management of your systems and services." },
  { icon: Users2, title: "Dedicated Teams", detail: "Extended teams to accelerate your projects." },
  { icon: Target, title: "Outcome Based", detail: "Aligned to business outcomes and measurable impact." },
  { icon: Layers3, title: "Product License", detail: "License our products for your business needs." },
];

const solutionApproach = [
  { number: "01", icon: ScanSearch, title: "Discover", detail: "Understand your business goals and challenges." },
  { number: "02", icon: Target, title: "Design", detail: "Design the right solution architecture and roadmap." },
  { number: "03", icon: Wrench, title: "Develop", detail: "Build, configure and integrate using agile methodologies." },
  { number: "04", icon: CheckCircle2, title: "Deploy", detail: "Deploy with quality, security and minimal business disruption." },
  { number: "05", icon: TrendingUp, title: "Optimize", detail: "Monitor performance and optimize for better outcomes." },
  { number: "06", icon: Rocket, title: "Scale", detail: "Continuously innovate and scale with your business growth." },
];

const techPartners = [
  { name: "Microsoft", tag: "Solutions Partner" },
  { name: "AWS", tag: "Partner Network" },
  { name: "IBM", tag: "Technology Partner" },
  { name: "Oracle", tag: "Partner" },
  { name: "Salesforce", tag: "Partner" },
  { name: "ServiceNow", tag: "Partner" },
];

const industries = [
  { icon: Cpu, label: "Technology & IT" },
  { icon: Building2, label: "Banking & Financial Services" },
  { icon: Factory, label: "Manufacturing" },
  { icon: TestTube2, label: "Automotive" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Zap, label: "Energy & Utilities" },
  { icon: Cable, label: "Telecom" },
  { icon: ShoppingCart, label: "Retail & E-commerce" },
  { icon: Landmark, label: "Government & Public Sector" },
];

const whyApioneer = [
  { title: "Business-Aligned Solutions", detail: "Technology that delivers real business value." },
  { title: "Deep Technology Expertise", detail: "Certified experts across modern technologies." },
  { title: "Scalable & Secure", detail: "Solutions built for scale, performance and security." },
  { title: "Innovation Driven", detail: "We leverage AI, automation and analytics to drive innovation." },
  { title: "Global Delivery Capability", detail: "Local understanding with global delivery excellence." },
];

export default function TechnologyProductSolutionsPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div
          aria-hidden
          className="absolute left-[6%] top-[8%] h-[24rem] w-[24rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.13 260 / 0.2), transparent 60%)" }}
        />
        <div className="container-x relative py-6 text-xs text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/#pillars" className="hover:text-white">Business Pillars</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">Technology &amp; Product Solutions</span>
        </div>

        <div className="container-x relative grid gap-14 pb-20 pt-4 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="text-balance text-4xl font-bold uppercase leading-[1.1] text-white sm:text-5xl">
              03 | Technology &amp;
              <br />
              <span className="text-[#8aa1ec]">Product Solutions</span>
            </h1>
            <p className="mt-5 text-lg font-semibold text-gold">
              Enable Innovation. Accelerate Growth. Deliver Impact.
            </p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/70">
              Technology and products that help organizations modernize, automate, integrate and scale.
            </p>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-white/60">
              APIONEER delivers technology solutions and products that enable digital transformation, improve
              operational efficiency and create new business value. Our solutions are built on emerging
              technologies, industry best practices and a deep understanding of enterprise needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionButton to="#solution-areas" variant="navy" size="lg">
                Explore Solutions
              </ActionButton>
              <ActionButton to="/contact" variant="ghost-light" size="lg">
                Talk to APIONEER
              </ActionButton>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[24rem]">
            <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
            <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-[#8aa1ec]/40 bg-navy text-[#8aa1ec]">
              <span className="text-center text-[0.65rem] font-bold uppercase tracking-wide">aPIONEER</span>
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
                  <span className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full border-2 border-[#8aa1ec]/40 bg-navy text-[#8aa1ec]">
                    <n.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="block text-[0.65rem] leading-tight text-white/70">{n.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Our Technology Solution Areas ---------------- */}
      <section id="solution-areas" className="section-y container-x">
        <SectionHeading eyebrow="What we offer" title="Our Technology Solution Areas" align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutionAreas.map((s) => (
            <div key={s.number} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="font-display text-xl font-bold text-[#5f7fe8]">{s.number}</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#5f7fe8]/10 text-[#5f7fe8]">
                  <s.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
              </div>
              <h3 className="mt-3 text-base text-navy">{s.title}</h3>
              <ul className="mt-3 grid gap-1.5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#5f7fe8]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Our Product Portfolio ---------------- */}
      <section className="section-y bg-navy-deep">
        <div className="container-x">
          <SectionHeading eyebrow="What we build" title="Our Product Portfolio" align="center" tone="light" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/10 text-[#8aa1ec]">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.detail}</p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:underline">
                  Learn more
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/40">
            *Product names are representative and subject to final branding.
          </p>
        </div>
      </section>

      {/* ---------------- Capabilities + Engagement models ---------------- */}
      <section className="section-y container-x">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Our Capabilities</h2>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {capabilities.map((c) => (
                <div key={c.title} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[#5f7fe8]/25 text-[#5f7fe8]">
                    <c.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <p className="text-xs font-semibold text-navy">{c.title}</p>
                  <p className="text-[0.65rem] leading-tight text-muted-foreground">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Our Engagement Models</h2>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {engagementModels.map((e) => (
                <div key={e.title} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold-dark">
                    <e.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <p className="text-xs font-semibold text-navy">{e.title}</p>
                  <p className="text-[0.65rem] leading-tight text-muted-foreground">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Our Solution Approach ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="How we deliver" title="Our Solution Approach" align="center" />
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {solutionApproach.map((s) => (
              <div key={s.number} className="flex flex-col items-center gap-2 text-center">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#5f7fe8] text-white">
                  <s.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <p className="text-xs font-bold text-navy">{s.number} &middot; {s.title}</p>
                <p className="text-[0.65rem] leading-tight text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Partner ecosystem + Industries + Why aPIONEER ---------------- */}
      <section className="section-y container-x">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="text-lg text-navy">Our Partner Ecosystem</h2>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {techPartners.map((p) => (
                <div key={p.name} className="rounded-xl border border-border bg-background p-3 text-center">
                  <p className="text-sm font-bold text-navy">{p.name}</p>
                  <p className="text-[0.65rem] text-muted-foreground">{p.tag}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">And many more technology partners →</p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="text-lg text-navy">Industries We Serve</h2>
            <div className="mt-5 grid grid-cols-3 gap-5">
              {industries.map((ind) => (
                <div key={ind.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-[#5f7fe8]/25 text-[#5f7fe8]">
                    <ind.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-[0.65rem] leading-tight text-muted-foreground">{ind.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              *Industries listed reflect our current focus and experience.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h2 className="text-lg text-navy">Why aPIONEER?</h2>
            <div className="mt-5 grid gap-3">
              {whyApioneer.map((w) => (
                <div key={w.title} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5f7fe8]" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-navy">{w.title}</p>
                    <p className="text-xs text-muted-foreground">{w.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Enable your business. Accelerate your future."
        description="From cloud and data to AI, applications and automation, aPIONEER offers the technology and product solutions you need to stay ahead in a digital-first world."
        primary={{ label: "Talk to aPIONEER Experts", to: "/contact" }}
        secondary={{ label: "Explore Our Products", to: "/contact" }}
      />
    </>
  );
}