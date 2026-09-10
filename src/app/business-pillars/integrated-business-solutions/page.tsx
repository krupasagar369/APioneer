import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  Car,
  Cog,
  Cpu,
  Factory,
  Globe2,
  GraduationCap,
  Handshake,
  HeartPulse,
  Landmark,
  MapPin,
  Network,
  PenTool,
  Plane,
  Rocket,
  Search,
  Settings2,
  TrendingUp,
  Users2,
  Zap,
} from "lucide-react";
import { ActionButton, CtaBand, SectionHeading } from "@/components/site/ui";

const title = "Integrated Business Solutions — Business Pillars | aPIONEER";
const description =
  "Integrated capabilities for organizations seeking to build, transform and grow — Learning & Development, HRM Services, Engineering Services, Advanced Manufacturing and Premium Corporate Gifting.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const capabilityGroups = [
  { icon: Users2, label: "People", tagline: "Empowering People. Building Capabilities.", accent: "#158A80" },
  { icon: Cog, label: "Engineering", tagline: "Engineering Solutions. Manufacturing Excellence.", accent: "#2C3E8C" },
  { icon: Award, label: "Experience", tagline: "Creating Meaningful Experiences.", accent: "#E8A935" },
];

const divisions = [
  {
    number: "01",
    slug: "learning-development",
    icon: GraduationCap,
    accent: "#158A80",
    title: "Learning & Development",
    image: "/images/learning-development-hero.jpg",
    imageAlt: "Facilitator leading a corporate training session",
    tagline: "Build future-ready capabilities for individuals and enterprises.",
    items: ["Corporate Learning", "Technology Training", "AI & Generative AI", "Leadership Development", "Professional Development", "Customized Learning", "Upskilling & Reskilling"],
    cta: "Explore Learning & Development",
  },
  {
    number: "02",
    slug: "hrm-services",
    icon: Users2,
    accent: "#1F5AA6",
    title: "HRM Services",
    image: "/images/hrm-services-hero.jpg",
    imageAlt: "HR consultants reviewing workforce strategy",
    tagline: "Build stronger people. Build stronger organizations.",
    items: ["Talent Acquisition", "HR Consulting", "Workforce Solutions", "Performance Management", "Talent Management", "Employee Engagement", "HR Policies & Processes", "Organization Development"],
    cta: "Explore HRM Services",
  },
  {
    number: "03",
    slug: "engineering-services",
    icon: Cog,
    accent: "#2C3E8C",
    title: "Engineering Services",
    image: "/images/engineering-services-hero.jpg",
    imageAlt: "Engineers reviewing a technical design",
    tagline: "Engineering solutions for complex business needs.",
    items: ["Engineering Design", "CAD & 3D Modelling", "Technical Documentation", "Manufacturing Engineering", "Project Engineering", "Reverse Engineering", "Digital Engineering", "Engineering Outsourcing"],
    cta: "Explore Engineering Services",
  },
  {
    number: "04",
    slug: "advanced-manufacturing",
    icon: Factory,
    accent: "#B4801F",
    title: "Advanced Manufacturing",
    subtitle: "Pighalitadhatu Innovative Solutions Private Limited",
    image: "/images/advanced-manufacturing-hero.jpg",
    imageAlt: "Precision manufacturing equipment on a production floor",
    tagline: "Precision engineering. Advanced manufacturing.",
    items: ["Die Casting", "Tooling", "Prototyping", "Machining", "3D Scanning", "Reverse Engineering", "Quality Inspection", "R&D", "Engineering Components"],
    cta: "Explore Advanced Manufacturing",
  },
  {
    number: "05",
    slug: "arghya-corporate-gifting",
    icon: Award,
    accent: "#6E1424",
    title: "ARGHYA — Premium Corporate Gifting",
    image: "/images/arghya-hero.jpg",
    imageAlt: "Curated premium corporate gift box",
    tagline: "Thoughtful gifts. Lasting impressions.",
    items: ["Executive Gifting", "Premium Corporate Gifts", "Employee Welcome Kits", "Employee Recognition", "Client Appreciation", "Leadership Gifts", "Festival Gifting", "Customized Merchandise", "Premium Hampers", "Sustainable Gifting"],
    cta: "Explore ARGHYA",
  },
];

const advantages = [
  { icon: Handshake, title: "One Business Partner", detail: "Access multiple complementary capabilities through one organization." },
  { icon: Award, title: "Specialist Expertise", detail: "Each business vertical maintains its own specialist focus." },
  { icon: Settings2, title: "Customized Engagement", detail: "Solutions can be adapted to individual business requirements." },
  { icon: TrendingUp, title: "Scalable Capability", detail: "Our model is designed to support organizations as their requirements evolve." },
  { icon: Globe2, title: "Global Outlook", detail: "We are building capabilities and partnerships to support customers across international markets." },
];

const approach = [
  { icon: Search, title: "Understand", detail: "Understand the customer's business requirement.", accent: "#158A80" },
  { icon: PenTool, title: "Design", detail: "Develop the appropriate solution.", accent: "#1F5AA6" },
  { icon: Rocket, title: "Deliver", detail: "Deploy the right people, expertise and resources.", accent: "#6E3E9E" },
  { icon: TrendingUp, title: "Measure", detail: "Evaluate outcomes and value delivered.", accent: "#2C3E8C" },
  { icon: ArrowUpRight, title: "Improve", detail: "Continuously enhance the solution for better business impact.", accent: "#B4801F" },
];

const industries = [
  { icon: Cpu, label: "Technology & IT" },
  { icon: Factory, label: "Engineering & Manufacturing" },
  { icon: Car, label: "Automotive" },
  { icon: Plane, label: "Aerospace" },
  { icon: Zap, label: "Energy" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Building2, label: "BFSI" },
  { icon: Network, label: "Infrastructure" },
  { icon: Landmark, label: "Government & Public Sector" },
  { icon: Briefcase, label: "Professional Services" },
];

const regions = ["India", "Europe", "Middle East", "Asia Pacific", "North America"];

export default function IntegratedBusinessSolutionsPage() {
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
          <span className="text-white/80">Integrated Business Solutions</span>
        </div>

        <div className="container-x relative grid gap-14 pb-20 pt-4 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="text-balance text-4xl font-bold uppercase leading-[1.1] text-white sm:text-5xl">
              01 | Integrated
              <br />
              <span className="text-teal">Business Solutions</span>
            </h1>
            <p className="mt-5 text-lg font-semibold text-gold">
              People. Engineering. Manufacturing. Experiences.
            </p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/70">
              Integrated capabilities for organizations seeking to build, transform and grow.
            </p>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-white/60">
              APIONEER brings together specialized capabilities across Learning &amp; Development, HRM Services,
              Engineering Services, Advanced Manufacturing and Premium Corporate Gifting to support organizations
              through different stages of their business journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionButton to="#divisions" variant="gold" size="lg">
                Explore Our Solutions
              </ActionButton>
              <ActionButton to="/contact" variant="ghost-light" size="lg">
                Talk to APIONEER
              </ActionButton>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[24rem]">
            <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
            <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-teal/20 text-teal">
              <span className="text-center text-[0.65rem] font-bold uppercase tracking-wide">APIONEER</span>
            </div>
            {divisions.map((d, i) => {
              const angle = (i / divisions.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 44;
              const left = 50 + radius * Math.cos(angle);
              const top = 50 + radius * Math.sin(angle);
              return (
                <div
                  key={d.slug}
                  className="absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <span
                    className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full border-2 bg-navy"
                    style={{ borderColor: `${d.accent}66`, color: d.accent }}
                  >
                    <d.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="block text-[0.65rem] leading-tight text-white/70">{d.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- One group. Multiple capabilities. ---------------- */}
      <section className="section-y container-x">
        <SectionHeading
          eyebrow="Why one group"
          title="One group. Multiple capabilities. One commitment."
          description="Organizations achieve stronger outcomes when their people, capabilities, technology and business requirements are addressed through connected solutions."
          align="center"
          maxWidth="max-w-4xl"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {capabilityGroups.map((g) => (
            <div key={g.label} className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-full" style={{ backgroundColor: `${g.accent}14`, color: g.accent }}>
                <g.icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="text-sm font-bold uppercase tracking-wide" style={{ color: g.accent }}>{g.label}</p>
              <p className="text-xs text-muted-foreground">{g.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Divisions ---------------- */}
      <section id="divisions" className="section-y bg-surface">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {divisions.map((d) => (
            <Link
              key={d.slug}
              href={`/group-of-apioneer/${d.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
            >

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: d.accent }}
                  >
                    {d.number}
                  </span>
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: `${d.accent}14`, color: d.accent }}
                  >
                    <d.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                </div>
                <h5 className="mt-4 text-base leading-snug text-navy transition-colors duration-300">{d.title}</h5>
               <div className="relative h-30 w-full overflow-hidden, mt-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.image}
                  alt={d.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110, rounded-lg"
                />
                {/* <div className="absolute inset-0" style={{ backgroundColor: `${d.accent}55` }} aria-hidden /> */}
                <span
                  className="absolute inset-x-0 top-0 h-1 transition-all duration-300 group-hover:h-2 mb-2.5"
                  style={{ backgroundColor: d.accent }}
                  aria-hidden
                />
              </div>
                {d.subtitle ? <p className="mt-0.5 text-xs font-medium text-muted-foreground">{d.subtitle}</p> : null}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.tagline}</p>
                <ul className="mt-5 grid gap-2">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-navy sm:text-sm">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: d.accent }} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <span
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: d.accent }}
                >
                  {d.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- The aPIONEER advantage ---------------- */}
      <section className="section-y container-x">
        <SectionHeading eyebrow="Why one group" title="The APIONEER Advantage" align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {advantages.map((a) => (
            <div key={a.title} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-teal/10 text-teal">
                <a.icon className="h-4.5 w-4.5" aria-hidden />
              </span>
              <p className="text-sm font-semibold text-navy">{a.title}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{a.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Our approach ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="Our approach" title="Understand. Design. Deliver. Measure. Improve." align="center" />
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-5">
            {approach.map((s, i) => (
              <div key={s.title} className="relative flex flex-col items-center gap-3 text-center">
                {i < approach.length - 1 ? (
                  <span className="absolute left-[calc(50%+2rem)] top-6 hidden h-px w-[calc(100%-4rem)] bg-border sm:block" aria-hidden />
                ) : null}
                <span className="relative grid h-12 w-12 place-items-center rounded-full text-white" style={{ backgroundColor: s.accent }}>
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-sm font-bold text-navy">{s.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

 
      {/* ---------------- Who we serve + Global capability ---------------- */}
      <section className="section-y container-x">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Who We Serve</h2>
            <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-5">
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
 
          <div className="relative overflow-hidden rounded-3xl border border-border p-8 shadow-soft">
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/globe.png"
                alt=""
                className="h-full w-full  object-cover"
              />
              <div className="absolute inset-0 bg-card/92" />
            </div>
            <div className="relative">
              <h2 className="text-xl text-navy">Global Business Capability</h2>
              <p className="mt-1.5 text-sm font-semibold text-teal">From India to the World</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                APIONEER is developing a global network of capabilities, partnerships and delivery opportunities. Our
                objective is to combine local understanding, specialist expertise and global delivery capability to
                support organizations across markets.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-5">
                {regions.map((r) => (
                  <div key={r} className="flex flex-col items-center gap-2 text-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-teal/25 bg-card text-teal">
                      <MapPin className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="text-xs leading-tight text-muted-foreground">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's engineer growth together"
        description="Whether you need to develop your workforce, strengthen your HR capabilities, solve an engineering challenge, manufacture precision components or create meaningful corporate experiences, aPIONEER brings the capabilities together under one global organization."
        primary={{ label: "Talk to aPIONEER", to: "/contact" }}
        secondary={{ label: "Back to Group of aPIONEER", to: "/group-of-apioneer" }}
      />
    </>
  );
}