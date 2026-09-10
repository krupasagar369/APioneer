import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Cog,
  DollarSign,
  FileSearch,
  Flame,
  Handshake,
  Package,
  Ruler,
  Settings2,
  ShieldCheck,
  Thermometer,
  Users2,
  Wrench,
} from "lucide-react";
import { ActionButton, CtaBand, SectionHeading } from "@/components/site/ui";

const title = "Advanced Manufacturing — Pighalitadhatu Innovative Solutions Pvt. Ltd. | Group of APIONEER";
const description =
  "Precision Manufacturing. Engineered to Perform. High-precision die casting and engineering manufacturing solutions delivered by APIONEER.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const capabilities = [
  { icon: Flame, title: "Die Casting (Aluminum & Zinc)", detail: "High-pressure die casting with superior dimensional accuracy and surface finish." },
  { icon: Wrench, title: "Tooling & Dies", detail: "In-house design and manufacturing of dies and tooling for high performance." },
  { icon: Cog, title: "Machining & Finishing", detail: "CNC machining, drilling, threading and finishing for tight tolerance components." },
  { icon: Thermometer, title: "Heat Treatment & Coating", detail: "Heat treatment and surface coating for enhanced strength, durability and corrosion resistance." },
  { icon: ClipboardCheck, title: "Quality Assurance & Testing", detail: "Advanced inspection and testing to ensure zero-defect and reliable performance." },
  { icon: Package, title: "Assembly & Packaging", detail: "Component assembly and custom packaging as per customer requirements." },
];

const whatWeManufacture = [
  "Aluminum & Zinc Die Castings",
  "Complex & Thin Wall Castings",
  "High Strength Components",
  "Precision Machined Parts",
  "Prototypes to High Volume Production",
  "Custom Solutions as per Drawings and Specifications",
];

const keyProducts = ["Automotive Components", "Industrial Components", "Machinery Parts", "Precision Housings", "Heat Sink & Enclosures"];

const qualityStandards = [
  "Advanced Testing & Inspection Facilities",
  "Statistical Process Control (SPC)",
  "PPAP, APQP & FMEA Compliance",
  "100% Dimensional Inspection for Critical Parts",
  "Traceability & Documentation",
];

const facilities = [
  { icon: Building2, value: "20,000+", label: "Sq. Ft. Facility" },
  { icon: Cog, value: "50+", label: "Machines" },
  { icon: Award, value: "15+", label: "Years of Experience" },
  { icon: Users2, value: "100+", label: "Skilled Professionals" },
  { icon: Settings2, value: "", label: "Advanced Machinery & Automation" },
  { icon: Wrench, value: "", label: "In-house Tool Room & Die Making" },
  { icon: FileSearch, value: "", label: "R&D & Process Improvement" },
  { icon: Clock, value: "", label: "On-time Delivery Assurance" },
];

const certifications = [
  { label: "ISO 9001:2015", detail: "Quality Management" },
  { label: "ISO 14001:2015", detail: "Environmental Management" },
  { label: "ISO 45001:2018", detail: "Occupational Health & Safety" },
  { label: "IATF 16949:2016", detail: "Automotive Quality Management" },
  { label: "RoHS", detail: "Compliant" },
];

export default function AdvancedManufacturingPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div
          aria-hidden
          className="absolute -left-24 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.79 0.132 82 / 0.16), transparent 60%)" }}
        />
        <div className="container-x relative py-6 text-xs text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/group-of-apioneer" className="hover:text-white">Group of APIONEER</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">Advanced Manufacturing</span>
        </div>

        <div className="container-x relative grid gap-12 pb-20 pt-4 md:pb-24 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-gold">04</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-gold">
                <Flame className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold uppercase leading-[1.1] text-white sm:text-5xl">
              Advanced Manufacturing
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-gold">
              Pighalitadhatu Innovative Solutions Pvt. Ltd.
            </p>
            <p className="mt-2 text-lg font-semibold text-white/90">Precision Manufacturing. Engineered to Perform.</p>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70">
              We deliver high-precision die casting and engineering manufacturing solutions for demanding industries
              worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionButton to="#capabilities" variant="gold" size="lg">
                Explore Capabilities
              </ActionButton>
              <ActionButton to="/contact" variant="ghost-light" size="lg">
                Request a Quote
              </ActionButton>
            </div>
          </div>

          <div className="relative">
          <div className="relative aspect-[5/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy to-teal/40 shadow-lift">
            <Image
              src="/images/advanced-manufacturing-hero.jpg"
              alt="Advanced Manufacturing Hero Image"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="rounded-3xl object-cover"
            />
          </div>
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:grid-cols-4">
              {[
                { icon: Ruler, label: "High Precision Manufacturing" },
                { icon: Settings2, label: "Advanced Technology" },
                { icon: ShieldCheck, label: "Consistent Quality" },
                { icon: Clock, label: "On-time Delivery" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                  <f.icon className="h-5 w-5 text-gold" aria-hidden />
                  <span className="text-xs leading-tight text-white/75">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Manufacturing Capabilities ---------------- */}
      <section id="capabilities" className="section-y container-x">
        <SectionHeading eyebrow="What we offer" title="Our Manufacturing Capabilities" align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold/30 text-gold-dark">
                <c.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-navy">{c.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- What We Manufacture + Key Products ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl text-navy">What We Manufacture</h2>
            <div className="mt-6 grid gap-3">
              {whatWeManufacture.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-navy">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-dark" aria-hidden />
                  {item}
                </div>
              ))}
            </div>

            <h3 className="mt-9 text-lg text-navy">Key Products We Manufacture</h3>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
              {keyProducts.map((p) => (
                <div key={p} className="text-center">
                  <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-navy/8 to-gold/15">
                    {/* Replace with a real product photo at /images/manufacturing-product-<slug>.jpg */}
                    <div className="flex h-full w-full items-center justify-center">
                      <Cog className="h-8 w-8 text-navy/20" aria-hidden />
                    </div>
                  </div>
                  <p className="mt-2 text-xs font-medium text-muted-foreground">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Quality Assurance + Facilities ---------------- */}
      <section className="section-y container-x">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl bg-navy-gradient p-8 text-on-dark shadow-lift">
            <h2 className="text-xl text-white">Quality Assurance &amp; Standards</h2>
            <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
              We are committed to delivering world-class quality through stringent processes and continuous
              improvement.
            </p>
            <div className="mt-6 grid gap-3">
              {qualityStandards.map((q) => (
                <div key={q} className="flex items-center gap-2.5 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                  {q}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Our Facilities</h2>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {facilities.map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold-dark">
                    <f.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  {f.value ? <p className="font-display text-lg font-bold text-navy">{f.value}</p> : null}
                  <span className="text-xs leading-tight text-muted-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Certifications ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="Compliance" title="Certifications" align="center" />
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {certifications.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-gold/40 text-gold-dark">
                  <Award className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">{c.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Precision. Performance. Trust. ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep py-16">
        <div className="container-x relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-gold">
              Precision. Performance. Trust.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Partner with Pighalitadhatu for reliable and high-performance manufacturing solutions.
            </p>
            <div className="mt-6">
              <ActionButton to="/contact" variant="gold" size="lg">
                Request a Quote
              </ActionButton>
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            {[
              { icon: DollarSign, label: "Competitive Pricing" },
              { icon: Handshake, label: "Customer Centric Approach" },
              { icon: ShieldCheck, label: "Long-term Partnership" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-gold">
                  <f.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <span className="max-w-[8rem] text-xs leading-tight text-white/75">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a manufacturing project in mind?"
        description="Speak with our engineering team about a tailored precision manufacturing solution."
        primary={{ label: "Request a Quote", to: "/contact" }}
        secondary={{ label: "Back to Group of APIONEER", to: "/group-of-apioneer" }}
      />
    </>
  );
}