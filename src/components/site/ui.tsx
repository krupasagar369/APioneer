import Link from "next/link";
import { type LucideIcon, ArrowRight, Star } from "lucide-react";

/* ---------------- Section primitives ---------------- */

export function Eyebrow({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "gold" | "light" }) {
  const tones = {
    teal: "bg-teal/12 text-navy ring-teal/25",
    gold: "bg-gold/16 text-navy ring-gold/35",
    light: "bg-white/10 text-on-dark ring-white/20",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] ring-1 ${tones[tone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold-gradient" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  action,
  maxWidth,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
  action?: React.ReactNode;
  maxWidth?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-6 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className={`flex min-w-0 flex-col gap-4 ${centered ? "items-center" : ""} ${maxWidth ?? (centered ? "max-w-3xl" : "max-w-2xl")}`}>
        {eyebrow ? <Eyebrow tone={tone === "light" ? "light" : "teal"}>{eyebrow}</Eyebrow> : null}
        <h2
          className={`text-balance text-3xl leading-[1.12] sm:text-4xl xl:text-[2.85rem] ${tone === "light" ? "text-on-dark" : "text-navy"}`}
        >
          {title}
        </h2>
        {description ? (
          <p className={`text-pretty text-base leading-relaxed ${tone === "light" ? "text-on-dark-muted" : "text-muted-foreground"}`}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb: { label: string; to?: string }[];
  children?: React.ReactNode;
  image?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-beach">
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
            loading="lazy"
          />
          <div aria-hidden className="absolute inset-0 bg-beach opacity-90" />
        </>
      ) : null}
      <div
        aria-hidden
        className="absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.68 0.106 195 / 0.28), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-20 h-[22rem] w-[22rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.79 0.132 82 / 0.3), transparent 70%)" }}
      />
      <div className="container-x relative pb-16 pt-14 md:pb-20 md:pt-20">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden className="text-muted-foreground/50">/</span> : null}
                {crumb.to ? (
                  <Link href={crumb.to} className="transition-colors hover:text-teal">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-navy">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-balance text-4xl leading-[1.08] text-navy-deep sm:text-5xl xl:text-[3.75rem]">{title}</h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </div>
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-navy/12 to-transparent" />
    </header>
  );
}

/* ---------------- Buttons ---------------- */

type BtnProps = {
  to?: string;
  href?: string;
  variant?: "gold" | "navy" | "outline" | "ghost-light";
  size?: "md" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button";
  onClick?: () => void;
};

const btnBase =
  "group/btn inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60";

const btnVariants = {
  gold: "bg-gold-gradient text-navy-deep shadow-soft hover:shadow-lift hover:-translate-y-0.5",
  navy: "bg-navy text-on-dark shadow-soft hover:bg-navy-deep hover:-translate-y-0.5 hover:shadow-lift",
  outline: "border border-navy/20 bg-background text-navy hover:border-teal hover:bg-teal/8 hover:-translate-y-0.5",
  "ghost-light": "border border-white/25 bg-white/8 text-on-dark backdrop-blur-md hover:bg-white/16 hover:-translate-y-0.5",
} as const;

const btnSizes = { md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-[0.95rem]" } as const;

export function ActionButton({ to, href, variant = "gold", size = "md", children, className = "", type, onClick }: BtnProps) {
  const cls = `${btnBase} ${btnVariants[variant]} ${btnSizes[size]} ${className}`;
  const inner = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden />
    </>
  );
  if (to) {
    return (
      <Link href={to} className={cls}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ---------------- Badges & meta ---------------- */

export function PartnerLogo({
  logo,
  name,
  short,
  accent,
  className = "h-16 w-16 rounded-2xl",
}: {
  logo?: string;
  name: string;
  short: string;
  accent: string;
  className?: string;
}) {
  if (logo) {
    return (
      <span className={`grid shrink-0 place-items-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={`${name} logo`} className="h-full w-full object-contain" />
      </span>
    );
  }
  return (
    <span className={`grid shrink-0 place-items-center bg-gradient-to-br ${accent} shadow-soft ${className}`}>
      <span className="font-display text-sm font-bold text-white">{short}</span>
    </span>
  );
}

export function Pill({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "teal" | "gold" | "navy" }) {
  const tones = {
    muted: "bg-surface-2 text-muted-foreground",
    teal: "bg-teal/14 text-navy",
    gold: "bg-gold/18 text-navy-deep",
    navy: "bg-navy text-on-dark",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Rating({ value, learners }: { value: number; learners?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
      <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
      {value.toFixed(1)}
      {learners ? <span className="font-medium text-muted-foreground">({learners})</span> : null}
    </span>
  );
}

/* ---------------- Feature card ---------------- */

export function FeatureCard({ icon: Icon, title, detail }: { icon: LucideIcon; title: string; detail: string }) {
  return (
    <article className="group card-lift rounded-2xl border border-border bg-card p-7 shadow-soft">
      <span className="icon-tile">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-5 text-lg text-navy">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{detail}</p>
    </article>
  );
}

/* ---------------- CTA band ---------------- */

export function CtaBand({
  title,
  description,
  primary = { label: "Book a Free Consultation", to: "/contact" },
  secondary = { label: "Download Brochure", to: "/resources" },
}: {
  title: string;
  description: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="container-x py-16 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-navy-gradient px-7 py-14 shadow-lift md:px-14 md:py-16">
        <div
          aria-hidden
          className="absolute -right-16 -top-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.79 0.132 82 / 0.5), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.106 195 / 0.45), transparent 70%)" }}
        />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl leading-tight text-on-dark md:text-4xl">{title}</h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-on-dark-muted">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionButton to={primary.to} variant="gold" size="lg">
              {primary.label}
            </ActionButton>
            <ActionButton to={secondary.to} variant="ghost-light" size="lg">
              {secondary.label}
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}