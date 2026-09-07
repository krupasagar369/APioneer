import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, Download, MapPin, Users, Video } from "lucide-react";
import type { BlogPost, Career, Course, Partner, Resource, Testimonial, Webinar, Workshop } from "@/data/site";
import { PartnerLogo, Pill, Rating } from "./ui";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="relative h-1.5 w-full bg-gradient-to-r from-navy via-teal to-gold" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <Pill tone="teal">{course.partner}</Pill>
          <Rating value={course.rating} />
        </div>
        <h3 className="mt-4 text-pretty text-lg leading-snug text-navy">
          <Link href={`/courses/${course.slug}`} className="link-underline">
            {course.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{course.summary}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-teal" aria-hidden />
            <dd>{course.duration}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Video className="h-3.5 w-3.5 text-teal" aria-hidden />
            <dd>{course.mode}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-teal" aria-hidden />
            <dd>{course.learners} learners</dd>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            <dd>{course.level}</dd>
          </div>
        </dl>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
          <span className="font-display text-lg font-semibold text-navy">{course.price}</span>
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-teal"
          >
            View programme
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article className="group card-lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft">
      <PartnerLogo
        logo={partner.logo}
        name={partner.name}
        short={partner.short}
        accent={partner.accent}
        className="h-14 w-14 rounded-xl"
      />
      <h3 className="mt-5 text-xl text-navy">{partner.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{partner.tagline}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {partner.certifications.slice(0, 2).map((c) => (
          <Pill key={c}>{c}</Pill>
        ))}
      </div>
      <Link
        href={`/learning-partners/${partner.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-navy transition-colors hover:text-teal"
      >
        Explore {partner.name} programmes
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </Link>
    </article>
  );
}

export function WorkshopCard({ item }: { item: Workshop }) {
  return (
    <article className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-navy-gradient text-center">
          <span className="font-display text-lg font-bold leading-none text-on-dark">{item.date.split(" ")[0]}</span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-gold">{item.date.split(" ")[1]}</span>
        </div>
        <Pill tone="gold">{item.focus}</Pill>
      </div>
      <h3 className="mt-5 text-lg leading-snug text-navy">{item.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-teal" aria-hidden />
          {item.city}
        </li>
        <li className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-teal" aria-hidden />
          {item.duration}
        </li>
        <li className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-teal" aria-hidden />
          {item.seats}
        </li>
      </ul>
      <Link
        href="/contact"
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy transition-colors hover:text-teal"
      >
        Reserve a seat
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}

export function WebinarCard({ item }: { item: Webinar }) {
  return (
    <article className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-surface-gradient p-6 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="teal">Live webinar</Pill>
        <Pill>{item.duration}</Pill>
      </div>
      <h3 className="mt-4 text-lg leading-snug text-navy">{item.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal/15 font-display text-xs font-bold text-navy">
          {item.speaker
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-navy">{item.speaker}</p>
          <p className="truncate text-xs text-muted-foreground">{item.role}</p>
        </div>
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-navy">
        <CalendarDays className="h-3.5 w-3.5 text-gold" aria-hidden />
        {item.date} · {item.time}
      </p>
      <Link
        href="/contact"
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy transition-colors hover:text-teal"
      >
        Register free
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}

export function BlogCard({ item }: { item: BlogPost }) {
  return (
    <article className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <Pill tone="gold">{item.category}</Pill>
        <span>{item.date}</span>
        <span aria-hidden>·</span>
        <span>{item.read}</span>
      </div>
      <h3 className="mt-4 text-pretty text-lg leading-snug text-navy">
        <Link href={`/blogs/${item.slug}`} className="link-underline">
          {item.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
      <p className="mt-auto pt-6 text-xs font-semibold uppercase tracking-wider text-navy-soft">{item.author}</p>
    </article>
  );
}

export function ResourceCard({ item }: { item: Resource }) {
  return (
    <article className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="icon-tile">
          <Download className="h-5 w-5" aria-hidden />
        </span>
        <Pill tone="teal">{item.type}</Pill>
      </div>
      <h3 className="mt-5 text-lg leading-snug text-navy">{item.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
      <p className="mt-4 text-xs font-medium text-muted-foreground">{item.pages}</p>
      <Link
        href="/contact"
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy transition-colors hover:text-teal"
      >
        Download brochure
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}

export function CareerCard({ item }: { item: Career }) {
  return (
    <article className="group card-lift grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="teal">{item.team}</Pill>
          <Pill>{item.type}</Pill>
          <Pill>{item.exp}</Pill>
        </div>
        <h3 className="mt-3 text-lg leading-snug text-navy">{item.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{item.blurb}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-navy-soft">
          <MapPin className="h-3.5 w-3.5 text-teal" aria-hidden />
          {item.location}
        </p>
      </div>
      <Link
        href="/contact"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-300 hover:border-teal hover:bg-teal/8"
      >
        Apply now
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="card-lift flex h-full flex-col rounded-2xl border border-white/12 bg-white/6 p-7 backdrop-blur-xl">
      <span aria-hidden className="font-display text-5xl leading-none text-gold">&ldquo;</span>
      <blockquote className="mt-3 text-pretty text-[0.98rem] leading-relaxed text-on-dark">{item.quote}</blockquote>
      <figcaption className="mt-auto pt-7">
        <p className="text-sm font-semibold text-on-dark">{item.name}</p>
        <p className="text-xs text-on-dark-muted">{item.role}</p>
        <p className="mt-3 inline-flex rounded-md bg-gold/20 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-gold">
          {item.metric}
        </p>
      </figcaption>
    </figure>
  );
}