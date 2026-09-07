import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cog,
  Factory,
  Gift,
  GraduationCap,
  Users,
} from "lucide-react";
import { groupDivisions, groupStats, groupWhy } from "@/data/group";
import { ActionButton, CtaBand, SectionHeading } from "@/components/site/ui";

const divisionIcons = [GraduationCap, Users, Cog, Factory, Gift];

const title = "Group of APIONEER — Five Business Solutions, One Global Group";
const description =
  "APIONEER brings together five specialist businesses — learning, people, engineering, manufacturing and gifting — under a single group.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function GroupOfApioneerPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div
          aria-hidden
          className="absolute right-[8%] top-[10%] h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.79 0.132 82 / 0.16), transparent 60%)" }}
        />
        <div className="container-x relative grid gap-16 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-px w-8 bg-gold" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">
                Group of APIONEER
              </span>
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
              Five business solutions.
              <br />
              <span className="text-gold">One global group.</span>
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-white/70 md:text-lg">
              APIONEER brings together five specialist businesses — learning, people, engineering, manufacturing and
              gifting — under a single group, so organisations can build their people, products and partnerships
              with one trusted partner.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ActionButton to="#divisions" variant="gold" size="lg">
                Explore Our Businesses
              </ActionButton>
              <ActionButton to="/contact" variant="ghost-light" size="lg">
                Talk to an Expert
              </ActionButton>
            </div>
          </div>

          {/* Orbit graphic */}
          <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
            <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
            <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-gradient shadow-lift">
              <span className="text-center">
                <span className="block font-display text-sm font-bold text-navy-deep">APIONEER</span>
                <span className="block text-[0.65rem] text-navy-deep/70">Group</span>
              </span>
            </div>
            {groupDivisions.map((d, i) => {
              const Icon = divisionIcons[i];
              const angle = (i / groupDivisions.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 44; // percent
              const left = 50 + radius * Math.cos(angle);
              const top = 50 + radius * Math.sin(angle);
              return (
                <div
                  key={d.slug}
                  className="absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <span
                    className="mx-auto mb-2 grid h-11 w-11 place-items-center rounded-full border-2 text-white"
                    style={{ backgroundColor: d.accent, borderColor: `${d.accent}88` }}
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <span className="block text-[0.7rem] leading-tight text-white/70">{d.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Group stats ---------------- */}
      <div className="bg-navy">
        <div className="container-x grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {groupStats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
              <p className="mt-1.5 text-xs text-white/60 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Divisions ---------------- */}
      <section id="divisions" className="section-y container-x">
        <SectionHeading eyebrow="Our businesses" title="Five divisions, working as one group" align="center" />
        <div className="mt-12 grid gap-5">
          {groupDivisions.map((d, i) => {
            const Icon = divisionIcons[i];
            return (
              <Link
                key={d.slug}
                href={`/group-of-apioneer/${d.slug}`}
                className="group grid items-center gap-6 rounded-2xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift md:grid-cols-[4rem_1fr_auto]"
                style={{ borderLeftWidth: 4, borderLeftColor: d.accent }}
              >
                <span
                  className="hidden font-display text-3xl font-bold md:block"
                  style={{ color: d.accent }}
                >
                  {d.number}
                </span>
                <div className="min-w-0">
                  <span
                    className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-semibold"
                    style={{ backgroundColor: `${d.accent}1a`, color: d.accent }}
                  >
                    <Icon className="h-3 w-3" aria-hidden />
                    {d.tag}
                  </span>
                  <h3 className="text-lg text-navy">{d.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{d.blurb}</p>
                </div>
                <span className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-navy transition-colors">
                  <span className="group-hover:hidden">{d.cta}</span>
                  <span className="hidden group-hover:inline" style={{ color: d.accent }}>
                    {d.cta}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------------- Why one group ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="Why one group" title="Why organisations partner with the group" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {groupWhy.map((w) => (
              <div key={w.number} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p className="font-display text-sm font-bold text-gold">{w.number}</p>
                <h3 className="mt-3 text-base text-navy">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which division fits your need?"
        description="Tell us what you're trying to solve and we'll connect you with the right team across the group."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Explore Our Businesses", to: "#divisions" }}
      />
    </>
  );
}