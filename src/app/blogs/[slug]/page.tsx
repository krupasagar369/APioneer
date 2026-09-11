import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, User } from "lucide-react";
import { blogs, type BlogPost } from "@/data/site";
import { ActionButton, PageHero, SectionHeading } from "@/components/site/ui";
import { BlogCard } from "@/components/site/cards";

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return { title: "Article not found — aPIONEER", robots: { index: false, follow: false } };
  const title = `${post.title} — aPIONEER`;
  return {
    title,
    description: post.excerpt,
    openGraph: { title, description: post.excerpt, type: "article", images: post.ogImage ? [post.ogImage] : undefined },
  };
}

// Fallback body used when a post doesn't yet have real `body` content in site.ts —
// keeps every article page functional while content gets filled in per-post.
function defaultBody(post: BlogPost) {
  return [
    {
      heading: "Start with the capability, not the catalogue",
      paragraphs: [
        "The first move is to describe the capability you need in operational terms: what a team should be able to design, ship or defend without external help. Once that is written down, the training decision becomes a gap-closing exercise rather than a procurement one.",
      ],
    },
    {
      heading: "Measure something your executives already track",
      paragraphs: [
        "Attendance and satisfaction scores do not survive a budget review. Migration velocity, audit findings, incident recurrence and retention do. Tie the programme to one of these before the first cohort runs, and agree how it will be reported.",
      ],
    },
    {
      heading: "Design for application, not completion",
      paragraphs: [
        "The highest-yield element of any programme is the four weeks after it ends. Structured mentor access, applied assignments on real backlog items and manager check-ins convert knowledge into practice — and they cost a fraction of the training itself.",
      ],
    },
  ];
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();

  const body = post.body ?? defaultBody(post);
  const related = blogs.filter((b) => b.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    articleSection: post.category,
    ...(post.ogImage ? { image: [post.ogImage] } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Blogs", item: "/blogs" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  const faqJsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Blogs", to: "/blogs" }, { label: post.category }]}
      >
        <div className="flex flex-wrap items-center gap-5 text-sm text-on-dark-muted">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-gold" aria-hidden />
            {post.author}
          </span>
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-gold" aria-hidden />
            {post.read} read
          </span>
        </div>
      </PageHero>

      <article className="section-y container-x">
        <div className="mx-auto max-w-3xl">
          {/* AEO: scannable takeaways an AI answer engine or a skimming reader can lift directly */}
          {post.keyTakeaways?.length ? (
            <div className="mb-10 rounded-2xl border border-teal/25 bg-teal/8 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-navy-soft">Key takeaways</p>
              <ul className="mt-3 grid gap-2">
                {post.keyTakeaways.map((k) => (
                  <li key={k} className="flex items-start gap-2.5 text-sm leading-relaxed text-navy">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="text-lg leading-relaxed text-navy">{post.excerpt}</p>

          <div className="mt-8 grid gap-6">
            {body.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl text-navy">{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {post.faqs?.length ? (
            <div className="mt-14">
              <h2 className="text-2xl text-navy">Frequently asked questions</h2>
              <div className="mt-6 grid gap-4">
                {post.faqs.map((f) => (
                  <details key={f.question} className="group rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <summary className="cursor-pointer list-none text-base font-semibold text-navy marker:content-none">
                      <span className="flex items-center justify-between gap-4">
                        {f.question}
                        <span aria-hidden className="shrink-0 text-teal transition-transform group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}

          {post.authorBio ? (
            <div className="mt-14 flex gap-4 rounded-2xl border border-border bg-surface p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-on-dark">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">{post.author}</p>
                {post.authorRole ? <p className="text-xs text-muted-foreground">{post.authorRole}</p> : null}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.authorBio}</p>
              </div>
            </div>
          ) : null}
        </div>
      </article>

      {related.length > 0 ? (
        <section className="bg-surface section-y">
          <div className="container-x">
            <SectionHeading eyebrow="Keep reading" title="Related articles" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((b) => (
                <BlogCard key={b.slug} item={b} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}