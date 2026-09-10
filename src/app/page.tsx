import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  Building2,
  Cpu,
  GiftIcon,
  Globe2,
  GraduationCap,
  Handshake,
  Landmark,
  Layers,
  LineChart,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import {
  blogs,
  caseStudies,
  categories,
  clients,
  courses,
  industries,
  partners,
  stats,
  testimonials,
  webinars,
  workshops,
} from "@/data/site";
import { ActionButton, CtaBand, SectionHeading, FeatureCard, PartnerLogo } from "@/components/site/ui";
import { BlogCard, CourseCard, PartnerCard, TestimonialCard, WebinarCard, WorkshopCard } from "@/components/site/cards";
import { Reveal } from "@/components/site/Stats";

const title = "APIONEER Business Solutions — Enterprise Training & Certification";
const description =
  "Accredited corporate training, professional certification, government upskilling and IT consulting for enterprise teams in 42 countries.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

export default function Home() {
  const featured = courses.filter((c) => c.featured);
  const recommended = courses.filter((c) => c.recommended);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-globe.jpg"
            alt="Illuminated global network spanning the earth, representing APIONEER's international reach"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/92 to-navy-deep/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/30" />
        </div>

        <div className="container-x relative py-20 md:py-28">
          <div className="max-w-2xl animate-fade-up">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-teal">
              A Global Business &amp; Engineering Group
            </p>
            <h1 className="mt-5 text-balance text-4xl font-bold uppercase leading-[1.08] text-white sm:text-5xl lg:text-[]">
              Engineering Growth.
              <br />
              <span className="text-gold">Enabling Success.</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
              We empower organisations and industries across the globe with people, technology, engineering
              excellence and meaningful experiences.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ActionButton to="/services" variant="gold" size="lg">
                Explore Our Solutions
              </ActionButton>
              <ActionButton to="/contact" variant="ghost-light" size="lg">
                Talk to an Expert
              </ActionButton>
            </div>
          </div>

          <div className="mt-16 border-t border-white/15 pt-8">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {s.value.toLocaleString()}
                    <span className="text-gold">{s.suffix}</span>
                  </dd>
                  <p className="mt-1.5 max-w-[10rem] text-xs leading-snug text-white/65 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- Three strategic pillars ---------------- */}
      <section id="pillars" className="section-y ">
        <div className="container-x">
          <SectionHeading eyebrow="One group. Three strategic pillars." title="Everything your organisation needs, under one roof" align="center" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                number: "01",
                icon: Users,
                title: "Business Solutions",
                subtitle: "Building People. Engineering Solutions. Creating Experiences.",
                image: "/images/Business Solutions.jpeg",
                imageAlt: "Facilitator leading a corporate training session",
                cta: { label: "Explore Business Solutions", to: "/business-pillars/integrated-business-solutions" },
                items: [
                  { icon: GraduationCap, title: "Learning & Development", detail: "Empowering minds. Building capabilities." },
                  { icon: Users, title: "HRM Services", detail: "People strategies that drive performance." },
                  { icon: Layers, title: "Engineering Services", detail: "Innovate. Design. Engineer. Deliver." },
                  { icon: Building2, title: "Advanced Manufacturing", detail: "Precision. Quality. Performance." },
                  { icon: GiftIcon, title: "Corporate Gifting - Arghya", detail: "Thoughtful gifts for your valued clients and employees." },
                ],
              },
              {
                number: "02",
                icon: BadgeCheck,
                title: "Enterprise Technology & Certification Solutions",
                subtitle: "Build Skills. Earn Credentials. Transform Enterprises.",
                image: "/images/Enterprise Technology & Certification Solutions.jpeg",
                imageAlt: "Professional completing an online certification course",
                cta: { label: "Explore Enterprise Solutions", to: "/business-pillars/enterprise-learning-certifications" },
                items: [
                  { logo: "https://ik.imagekit.io/iq6dnzo5f/aicert.jpg", title: "AI CERTs", detail: "AI & Emerging Technology Certifications" },
                  { logo: "https://ik.imagekit.io/iq6dnzo5f/PECB_Logo.png?updatedAt=1784091400773", title: "PECB", detail: "Governance. Risk. Compliance." },
                  { logo: "https://ik.imagekit.io/iq6dnzo5f/Microsoft-Learning-Partner.webp?updatedAt=1771827020366", title: "Microsoft", detail: "Certifications. Authorized Training." },
                  { logo: "https://ik.imagekit.io/iq6dnzo5f/scrumalliance.png?updatedAt=1784010605297", title: "Scrum Alliance", detail: "Agile Training & Certifications" },
                  { logo: "https://ik.imagekit.io/iq6dnzo5f/ibm.jpg", title: "IBM Certifications", detail: "Authorized Training & Certifications" },

                ],
              },
              {
                number: "03",
                icon: Layers,
                title: "Technology & Product Solutions",
                subtitle: "Technology. Applications. Licensing. Enablement.",
                image: "/images/Technology & Product Solutions.jpeg",
                imageAlt: "Cloud and enterprise technology network visualisation",
                cta: { label: "Explore Technology Solutions", to: "/business-pillars/technology-product-solutions" },
                items: [
                  { logo: "https://ik.imagekit.io/iq6dnzo5f/aicert.jpg", title: "AI CERTs", detail: "AI & Emerging Technology Solutions" },
                  { logo: "https://ik.imagekit.io/iq6dnzo5f/Microsoft-Learning-Partner.webp?updatedAt=1771827020366", title: "Microsoft", detail: "Applications. Productivity. Cloud." },
                  { logo: "https://ik.imagekit.io/iq6dnzo5f/ibm.jpg", title: "IBM Applications", detail: "Enterprise Software Solutions" },
                  { logo: "https://ik.imagekit.io/iq6dnzo5f/vmware-logo.png", title: "VMware", detail: "Virtualization & Cloud Solutions" },
                ],
              },
            ].map((pillar) => (
              <Reveal key={pillar.number}>
                <Link
                  href={pillar.cta.to}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <div className="p-7">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-gradient text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <pillar.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="font-display text-3xl font-bold text-navy/20">{pillar.number}</span>
                    </div>
                    <h3 className="mt-4 text-lg leading-snug text-navy">{pillar.title}</h3>
                    <p className="mt-2 border-b border-border pb-5 text-sm leading-relaxed text-muted-foreground">
                      {pillar.subtitle}
                    </p>
                    <ul className="mt-6 grid gap-4">
                      {pillar.items.map((item) => (
                        <li key={item.title} className="flex items-center gap-3">
                          {"logo" in item && item.logo ? (
                            <span className="grid h-16 w-16 shrink-0 place-items-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={item.logo} alt={`${item.title} logo`} className="h-full w-full object-contain" />
                            </span>
                          ) : "icon" in item && item.icon ? (
                            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-teal/12 text-navy">
                              <item.icon className="h-4 w-4" aria-hidden />
                            </span>
                          ) : null}
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-navy">{item.title}</span>
                            <span className="block text-xs leading-snug text-muted-foreground">{item.detail}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative mt-auto h-36 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-120"
                    />
                    <div className="absolute inset-0 bg-navy-deep/45 transition-colors duration-300 group-hover:bg-navy-deep/30" />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-navy-deep py-3.5 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-navy">
                      {pillar.cta.label}
                      <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Trusted partners strip ---------------- */}
      {/* <section className="border-y border-border bg-card py-10">
        <div className="container-x flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-xs">
            <p className="text-lg font-bold uppercase leading-snug text-navy">
              Trusted Partners.
              <br />
              <span className="text-teal">Global Recognition.</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Delivering value through world-class partnerships.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {partners.slice(0, 4).map((p) => (
              <div key={p.slug} className="flex items-center gap-3">
                <PartnerLogo logo={p.logo} name={p.name} short={p.short} accent={p.accent} className="h-11 w-11 rounded-lg" />
                <div>
                  <p className="text-sm font-semibold text-navy">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.tagline.split(".")[0].split(",")[0]}</p>
                </div>
              </div>
            ))}
          </div>
          <ActionButton to="/learning-partners" variant="outline" size="md">
            View All Partners
          </ActionButton>
        </div>
      </section> */}

      {/* ---------------- Learning partners ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Learning partners"
            title="Accredited authority, delivered by practitioners"
            description="Our partnerships give your teams official curriculum, sanctioned labs and recognised credentials — taught by consultants who work in these environments daily."
            action={
              <ActionButton to="/learning-partners" variant="outline" size="lg">
                View all partners
              </ActionButton>
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {partners.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <PartnerCard partner={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Why choose apioneer ---------------- */}
      <section className="section-y container-x">
        <SectionHeading
          eyebrow="Why choose APIONEER?"
          title={
            <>
              We go beyond solutions. We build partnerships
              <br />
              that drive growth and create lasting impact.
            </>
          }
          maxWidth="max-w-6xl"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Globe2, title: "Global Expertise", detail: "Local Understanding" },
            { icon: Target, title: "Outcome Driven", detail: "Solutions" },
            { icon: Cpu, title: "Innovation &", detail: "Technology Focused" },
            { icon: Handshake, title: "Partnership for", detail: "Long-Term Success" },
            { icon: ShieldCheck, title: "Quality. Integrity.", detail: "Excellence." },
          ].map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-7 text-center shadow-soft">
                <span className="icon-tile">
                  <w.icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-sm font-semibold leading-snug text-navy">
                  {w.title}
                  <br />
                  {w.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Client marquee ---------------- */}
      <section className="border-b border-border bg-surface py-10" aria-label="Trusted by enterprise clients">
        <p className="container-x text-center text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by technology and transformation leaders worldwide
        </p>
        <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-14 pr-14">
            {[...clients, ...clients].map((c, i) => (
              <span key={`${c}-${i}`} className="font-display text-lg font-bold tracking-[0.18em] text-navy/35">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="section-y container-x">
        <SectionHeading
          eyebrow="What we do"
          title="One partner across the full enterprise capability lifecycle"
          description="From executive strategy to hands-on engineering labs, our practices are built to work together — assess, train, certify and advise."
          action={
            <ActionButton to="/services" variant="outline" size="lg">
              All services
            </ActionButton>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            { icon: Building2, title: "Corporate Training", detail: "Private cohorts, capability academies and role-based learning paths designed around your architecture and delivery model." },
            { icon: Landmark, title: "Government Training", detail: "Large-scale technical upskilling for ministries, departments and public undertakings, with transparent outcome reporting." },
            { icon: Award, title: "Professional Certification", detail: "Accredited delivery across Microsoft, AWS, PECB and Scrum Alliance with exam readiness built into every cohort." },
            { icon: Layers, title: "IT Consulting", detail: "Cloud architecture, security posture and platform engineering advisory delivered by the same experts who teach." },
            { icon: GraduationCap, title: "Technical Upskilling", detail: "Assessment-led reskilling with baseline measurement, targeted labs and verified competency uplift." },
            { icon: LineChart, title: "Enterprise Learning Solutions", detail: "Learning strategy, LMS readiness, curated content architecture and outcome analytics for L&D functions." },
          ].map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <FeatureCard {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      

      {/* ---------------- Featured certifications ---------------- */}
      {/* <section className="section-y container-x">
        <SectionHeading
          eyebrow="Featured programmes"
          title="Certification tracks our clients request most"
          description="Every programme includes exam readiness coaching, hands-on labs and post-training mentor access."
          action={
            <ActionButton to="/courses" variant="outline" size="lg">
              Browse all courses
            </ActionButton>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <CourseCard course={c} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-xl text-navy rule-gold">
            <span className="mb-3 block">Recommended for enterprise teams</span>
          </h3>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recommended.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* ---------------- Corporate training split ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-3xl shadow-lift">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/corporate leadership.jpg"
                alt="Facilitator leading a corporate leadership training session in a modern boardroom"
                width={1408}
                height={1008}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-border bg-card p-5 shadow-lift sm:block lg:-right-8">
              <p className="font-display text-3xl font-bold text-navy">
                96<span className="text-gold">%</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">cohort completion rate</p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Corporate training"
              title="Programmes engineered around your delivery roadmap"
              description="We start with a capability baseline, design the cohort journey against your architecture and tooling, then report on competency uplift the way your executives measure everything else."
            />
            <ul className="mt-7 grid gap-4">
              {[
                { title: "Capability baselining", detail: "Role-mapped assessments establish where each team genuinely stands before a single session is scheduled." },
                { title: "Tailored curriculum", detail: "Official partner modules blended with your internal standards, reference architecture and case studies." },
                { title: "Outcome reporting", detail: "Dashboards covering attendance, lab completion, certification results and manager-observed application." },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal/14 text-navy">
                    <BadgeCheck className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-navy">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <ActionButton to="/corporate-training" variant="navy" size="lg">
                Corporate Inquiry
              </ActionButton>
              <ActionButton to="/resources" variant="outline" size="lg">
                Download Brochure
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Industries ---------------- */}
      <section className="section-y container-x">
        <SectionHeading
          eyebrow="Industries served"
          title="Sector fluency, not generic content"
          description="Regulatory context, risk appetite and technology estate differ by industry. So do our programmes."
          align="center"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 60}>
              <article className="group card-lift h-full rounded-2xl border border-border bg-surface-gradient p-7 shadow-soft">
                <span className="icon-tile">
                  <Users className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg text-navy">{ind.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{ind.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Case studies ---------------- */}
      {/* <section className="section-y bg-beach">
        <div className="container-x">
          <SectionHeading
            title="Programmes that held up under scrutiny."
            action={
              <ActionButton to="/resources" variant="outline" size="lg">
                View all case studies
              </ActionButton>
            }
          />
          <div className="mt-12 grid gap-6">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.title} delay={i * 90}>
                <article className="grid overflow-hidden rounded-3xl border border-navy/8 bg-card shadow-card lg:grid-cols-2"> */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {/* <img
                    src={cs.image}
                    alt={cs.imageAlt}
                    loading="lazy"
                    className={`h-64 w-full object-cover lg:h-full ${i % 2 === 1 ? "lg:order-2" : ""}`}
                  />
                  <div className="p-8 lg:p-10">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-teal">{cs.sector}</p>
                    <h3 className="mt-4 text-xl leading-snug text-navy-deep sm:text-2xl">{cs.title}</h3>
                    <div className="mt-6 border-t border-border pt-6">
                      <dl className="grid gap-5">
                        {[
                          { k: "Challenge", v: cs.challenge },
                          { k: "Solution", v: cs.solution },
                          { k: "Outcome", v: cs.outcome },
                        ].map((row) => (
                          <div key={row.k}>
                            <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                              {row.k}
                            </dt>
                            <dd className={`mt-1.5 text-sm leading-relaxed ${row.k === "Outcome" ? "text-teal" : "text-navy"}`}>
                              {row.v}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <Link
                      href="/contact"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
                    >
                      Read the full story
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* ---------------- Success stories / testimonials ---------------- */}
      {/* <section className="relative overflow-hidden bg-navy-gradient section-y">
        <div
          aria-hidden
          className="absolute -left-24 top-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.79 0.132 82 / 0.25), transparent 70%)" }}
        />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Success stories"
            title="Outcomes our clients can point to"
            description="We are measured on business results — migration velocity, audit outcomes, retention — not attendance sheets."
            tone="light"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <TestimonialCard item={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* ---------------- Workshops ---------------- */}
      <section className="section-y container-x">
        <SectionHeading
          eyebrow="Upcoming workshops"
          title="Hands-on intensives, capped for depth"
          description="Small-cohort labs where teams solve real problems with practitioners in the room."
          action={
            <ActionButton to="/workshops" variant="outline" size="lg">
              All workshops
            </ActionButton>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {workshops.slice(0, 3).map((w, i) => (
            <Reveal key={w.slug} delay={i * 70}>
              <WorkshopCard item={w} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Webinars ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Upcoming webinars"
            title="Free live sessions with our practice leads"
            description="Forty-five focused minutes on the questions enterprise teams are actually wrestling with."
            action={
              <ActionButton to="/webinars" variant="outline" size="lg">
                All webinars
              </ActionButton>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {webinars.map((w, i) => (
              <Reveal key={w.slug} delay={i * 70}>
                <WebinarCard item={w} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Categories strip ---------------- */}
      <section className="section-y container-x">
        <SectionHeading
          eyebrow="Explore by category"
          title="Find the right pathway for every role"
          align="center"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href="/categories"
              className="group card-lift flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="min-w-0">
                <span className="block text-base font-semibold text-navy">{c.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{c.blurb}</span>
              </span>
              <span className="shrink-0 rounded-lg bg-teal/12 px-3 py-1.5 text-xs font-bold text-navy">{c.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Blogs ---------------- */}
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Latest insights"
            title="Research and perspective from our practice"
            action={
              <ActionButton to="/blogs" variant="outline" size="lg">
                Visit the blog
              </ActionButton>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {blogs.slice(0, 3).map((b, i) => (
              <Reveal key={b.slug} delay={i * 70}>
                <BlogCard item={b} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to close your capability gap?"
        description="Speak with a senior learning advisor about a tailored programme for your teams — no obligation, no scripted sales call."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Download Brochure", to: "/resources" }}
      />
    </>
  );
}