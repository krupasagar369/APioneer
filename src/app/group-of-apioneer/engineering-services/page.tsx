import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Boxes,
  Car,
  Cog,
  CheckCircle2,
  FileText,
  Fuel,
  Lightbulb,
  LayoutGrid,
  LineChart,
  PenTool,
  Plane,
  Settings2,
  Ship,
  ShieldCheck,
  TramFront,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { ActionButton, CtaBand, SectionHeading } from "@/components/site/ui";

const title = "Engineering Services — Group of APIONEER";
const description =
  "Engineering excellence that powers innovation. Intelligent engineering, design and technical solutions delivered by APIONEER.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const capabilities = [
  { icon: Cog, title: "Engineering Consulting", detail: "Strategic engineering consulting to solve complex business challenges." },
  { icon: PenTool, title: "Design & Development", detail: "Innovative product design and development that brings ideas to life." },
  { icon: Boxes, title: "CAD / CAE / CAM", detail: "Advanced CAD modeling, engineering analysis and CAM programming." },
  { icon: LineChart, title: "Analysis & Simulation", detail: "Virtual testing and simulation to ensure performance, safety and reliability." },
  { icon: FileText, title: "Technical Documentation", detail: "High-quality technical documentation and compliance support." },
  { icon: Settings2, title: "Project & Plant Engineering", detail: "End-to-end project engineering for plants, process and infrastructure." },
  { icon: Wrench, title: "Support & Sustainment", detail: "Engineering support and sustainment to maximize asset performance." },
];

const whatWeDo = [
  "Product Design & Development",
  "CAD/CAE/CAM Services",
  "Simulation & Analysis",
  "Technical Documentation",
  "Prototyping Engineering",
  "Industrial Engineering",
  "Plant Engineering",
  "Reverse Engineering",
  "Value Engineering",
  "Project & Plant Engineering",
];

const industries = [
  { icon: Car, label: "Automotive" },
  { icon: Plane, label: "Aerospace" },
  { icon: Cog, label: "Industrial Equipment" },
  { icon: Zap, label: "Energy & Utilities" },
  { icon: Fuel, label: "Oil & Gas" },
  { icon: TramFront, label: "Railways & Metro" },
  { icon: Settings2, label: "Heavy Engineering" },
  { icon: Ship, label: "Marine & Shipbuilding" },
  { icon: LayoutGrid, label: "More Industries" },
];

const techPartners = ["Siemens", "PTC", "Ansys", "Autodesk", "Dassault Systèmes", "Bentley"];

const whyChoose = [
  { icon: Lightbulb, title: "Deep Domain Expertise", detail: "Decades of experience across industries and technologies." },
  { icon: Settings2, title: "Advanced Tools & Technologies", detail: "Leveraging best-in-class tools for superior results." },
  { icon: ShieldCheck, title: "Quality & Reliability", detail: "Commitment to highest standards and precision." },
  { icon: Truck, title: "End-to-End Support", detail: "From concept to commissioning and beyond." },
];

export default function EngineeringServicesPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div
          aria-hidden
          className="absolute -left-24 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.13 260 / 0.2), transparent 60%)" }}
        />
        <div className="container-x relative py-6 text-xs text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/group-of-apioneer" className="hover:text-white">Group of APIONEER</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">Engineering Services</span>
        </div>

        <div className="container-x relative grid gap-12 pb-20 pt-4 md:pb-24 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-[#5f7fe8]">03</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-[#8aa1ec]">
                <Cog className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold uppercase leading-[1.1] text-white sm:text-5xl">
              Engineering Services
            </h1>
            <p className="mt-4 text-lg font-semibold text-[#8aa1ec]">
              Engineering excellence that powers innovation.
            </p>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70">
              We deliver intelligent engineering, design and technical solutions that drive efficiency, quality and
              growth across industries.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionButton to="#capabilities" variant="navy" size="lg">
                Explore Capabilities
              </ActionButton>
              <ActionButton to="/contact" variant="ghost-light" size="lg">
                Talk to an Expert
              </ActionButton>
            </div>
          </div>

          <div className="relative">
          <div className="relative aspect-[5/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy to-teal/40 shadow-lift">
            <Image
              src="/images/engineering-services-hero.jpg"
              alt="Engineering Services Hero Image"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="rounded-3xl object-cover"
            />
          </div>
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:grid-cols-4">
              {[
                { icon: Lightbulb, label: "Innovation Driven" },
                { icon: ShieldCheck, label: "Quality Focused" },
                { icon: Settings2, label: "Advanced Technologies" },
                { icon: Truck, label: "On-time Delivery" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                  <f.icon className="h-5 w-5 text-[#8aa1ec]" aria-hidden />
                  <span className="text-xs leading-tight text-white/75">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Our Engineering Capabilities ---------------- */}
      <section id="capabilities" className="section-y container-x">
        <SectionHeading eyebrow="What we offer" title="Our Engineering Capabilities" align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#5f7fe8]/25 text-[#5f7fe8]">
                <c.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-navy">{c.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- What We Do + Industries ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl text-navy">What We Do</h2>
            <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {whatWeDo.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-navy">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#5f7fe8]" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
         <div className="relative aspect-[10/2.2] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy to-teal/40 shadow-lift, mt-2.5">
              <Image
                src="/images/Engineering.jpg"
                alt="Engineering Services Hero Image"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="rounded-3xl object-cover"
              />
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Industries We Serve</h2>
            <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-5 lg:grid-cols-9">
              {industries.map((ind) => (
                <div key={ind.label} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[#5f7fe8]/25 text-[#5f7fe8]">
                    <ind.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <span className="text-xs leading-tight text-muted-foreground">{ind.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Technology Partners ---------------- */}
      <section className="section-y container-x">
        <SectionHeading eyebrow="Powered by" title="Our Technology Partners" align="center" />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {techPartners.map((p) => (
            <div key={p} className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <span className="font-display text-base font-bold text-navy">{p}</span>
              <p className="text-xs text-muted-foreground">Technology Partner</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ActionButton to="/contact" variant="outline">
            View All Partners
          </ActionButton>
        </div>
      </section>

      {/* ---------------- Why choose + Have a project in mind ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep py-20">
        <div
          aria-hidden
          className="absolute -right-20 bottom-0 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.13 260 / 0.2), transparent 60%)" }}
        />
        <div className="container-x relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#8aa1ec]">Why choose APIONEER?</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {whyChoose.map((w) => (
                <div key={w.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-[#8aa1ec]">
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

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#8aa1ec]">Have a project in mind?</p>
            <h2 className="mt-3 text-2xl text-white">
              Let&apos;s engineer innovative solutions that drive your business forward.
            </h2>
            <div className="mt-7">
              <ActionButton to="/contact" variant="gold" size="lg">
                Talk to an Expert
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Solve. Design. Deliver."
        description="Let our engineering expertise power your ideas and accelerate innovation."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Back to Group of APIONEER", to: "/group-of-apioneer" }}
      />
    </>
  );
}