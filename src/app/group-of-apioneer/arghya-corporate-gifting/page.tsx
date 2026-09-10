import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Boxes,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Heart,
  Landmark,
  Leaf,
  PenTool,
  Quote,
  Rocket,
  Sparkles,
  Tag,
  Truck,
  Users2,
} from "lucide-react";
import { ActionButton, CtaBand, SectionHeading } from "@/components/site/ui";

const title = "ARGHYA — Premium Corporate Gifting | Group of APIONEER";
const description =
  "Thoughtful gifts. Lasting impressions. Premium corporate gifting experiences by ARGHYA, part of the Group of APIONEER.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const giftingSolutions = [
  { icon: Briefcase, title: "Executive Gifts", detail: "Premium gifts for clients, partners and stakeholders that reflect your brand value." },
  { icon: Boxes, title: "Premium Hampers", detail: "Curated hampers for festivals, celebrations and corporate occasions." },
  { icon: Award, title: "Employee Recognition", detail: "Celebrate achievements and motivate your teams with meaningful gifts." },
  { icon: Sparkles, title: "Event Appreciation", detail: "Thoughtful gifts for events, conferences and special engagements." },
  { icon: CalendarDays, title: "Festival Gifting", detail: "Wide range of festive gifting solutions for every occasion and culture." },
  { icon: Tag, title: "Custom Merchandise", detail: "Branded merchandise customized to elevate your brand presence." },
];

const collections = [
  "Luxury Gift Hampers",
  "Premium Desk Accessories",
  "Tech & Lifestyle Gifts",
  "Eco-friendly Gifts",
  "Bespoke & Customized Gifts",
  "Bulk Corporate Gifting",
];

const whyChoose = [
  { icon: Heart, title: "Premium quality products" },
  { icon: Sparkles, title: "Thoughtfully curated options" },
  { icon: PenTool, title: "Customization as per your needs" },
  { icon: Globe2, title: "Pan India & Global Delivery" },
];

const whoWeServe = [
  { icon: Building2, label: "Corporates" },
  { icon: Rocket, label: "Startups" },
  { icon: Landmark, label: "Institutions" },
  { icon: CalendarDays, label: "Events" },
  { icon: Users2, label: "Associations" },
  { icon: Globe2, label: "Global Clients" },
];

const maroon = "#6E1424";
const maroonSoft = "#8c1c30";

export default function ArghyaCorporateGiftingPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, #2a0a10 0%, ${maroon} 55%, #2a0a10 100%)` }}
      >
        <div
          aria-hidden
          className="absolute -right-24 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(232,169,53,.16), transparent 60%)" }}
        />
        <div className="container-x relative py-6 text-xs text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/group-of-apioneer" className="hover:text-white">Group of APIONEER</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">ARGHYA — Corporate Gifting</span>
        </div>

        <div className="container-x relative grid gap-12 pb-20 pt-4 md:pb-24 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-gold">05</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-gold">
                <Boxes className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold uppercase leading-[1.1] text-white sm:text-5xl">
              ARGHYA
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-gold">
              Premium Corporate Gifting
            </p>
            <p className="mt-2 text-lg font-semibold text-white/90">Thoughtful gifts. Lasting impressions.</p>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70">
              We create premium gifting experiences that build stronger relationships and leave a lasting impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionButton to="#collections" variant="gold" size="lg">
                Explore Collections
              </ActionButton>
              <ActionButton to="/contact" variant="ghost-light" size="lg">
                Talk to an Expert
              </ActionButton>
            </div>
          </div>

          <div className="relative">
          <div className="relative aspect-[5/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy to-teal/40 shadow-lift">
            <Image
              src="/images/arghya-hero.jpg"
              alt="ARGHYA Corporate Gifting Hero Image"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="rounded-3xl object-cover"
            />
          </div>
          </div>
        </div>

        <div className="border-t border-white/10" style={{ backgroundColor: "rgba(0,0,0,.18)" }}>
          <div className="container-x grid grid-cols-2 gap-6 py-6 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: Sparkles, label: "Premium Quality" },
              { icon: Boxes, label: "Curated Collections" },
              { icon: Building2, label: "Corporate Focused" },
              { icon: Truck, label: "Timely Delivery" },
              { icon: CheckCircle2, label: "End-to-End Solutions" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2.5">
                <f.icon className="h-4.5 w-4.5 shrink-0 text-gold" aria-hidden />
                <span className="text-xs leading-tight text-white/80">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Our Gifting Solutions ---------------- */}
      <section id="collections" className="section-y container-x">
        <SectionHeading eyebrow="What we offer" title="Our Gifting Solutions" align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {giftingSolutions.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border" style={{ borderColor: `${maroon}40`, color: maroon }}>
                <s.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Our Collections + Why Choose ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Our Collections</h2>
            <div className="mt-6 grid gap-3">
              {collections.map((c) => (
                <div key={c} className="flex items-center gap-2.5 text-sm text-navy">
                  <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: maroon }} aria-hidden />
                  {c}
                </div>
              ))}
            </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy to-teal/40 shadow-lift, mt-6">
            <Image
              src="/images/Arghyagifiting.jpg"
              alt="Trainer leading a technology learning and development session"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="rounded-3xl object-cover"
            />
          </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Why Choose ARGHYA?</h2>
            <div className="mt-6 grid gap-4">
              {whyChoose.map((w) => (
                <div key={w.title} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${maroon}14`, color: maroon }}>
                    <w.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-navy">{w.title}</span>
                </div>
              ))}
            </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy to-teal/40 shadow-lift, mt-6">
            <Image
              src="/images/Arghyagifiting.jpg"
              alt="Trainer leading a technology learning and development session"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="rounded-3xl object-cover"
            />
          </div>
          </div>
        </div>
      </section>

      {/* ---------------- Who We Serve + Testimonial ---------------- */}
      <section className="section-y container-x">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-xl text-navy">Who We Serve</h2>
            <div className="mt-6 grid grid-cols-3 gap-6">
              {whoWeServe.map((w) => (
                <div key={w.label} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full border" style={{ borderColor: `${maroon}40`, color: maroon }}>
                    <w.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <span className="text-xs leading-tight text-muted-foreground">{w.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-3xl p-8 text-white shadow-lift"
            style={{ background: `linear-gradient(160deg, ${maroon}, #2a0a10)` }}
          >
            <Quote className="h-7 w-7 text-gold" aria-hidden />
            <p className="mt-4 text-base italic leading-relaxed text-white/90">
              &ldquo;Arghya has been our trusted gifting partner for years. Their quality, attention to detail and
              timely delivery are unmatched.&rdquo;
            </p>
            <p className="mt-5 text-sm font-semibold text-gold">— Head, Marketing, Leading IT Company</p>
          </div>
        </div>
      </section>

      {/* ---------------- Make every gift meaningful ---------------- */}
      <CtaBand
        title="Make every gift meaningful."
        description="Let us help you create memorable gifting experiences for every occasion."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Back to Group of APIONEER", to: "/group-of-apioneer" }}
      />
    </>
  );
}