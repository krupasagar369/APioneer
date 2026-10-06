import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ActionButton, CtaBand, PageHero, SectionHeading } from "@/components/site/ui";
import { BlogCard } from "@/components/site/cards";
import { Reveal } from "@/components/site/Stats";
import { getPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/blogs", {
    title: "Blogs & Insights on Enterprise Learning | aPIONEER",
    description:
      "Research and perspective on capability building, certification ROI, AI upskilling, compliance and learning design.",
  });
}

export default async function BlogsPage() {
  const posts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });

  if (posts.length === 0) {
    return (
      <>
        <JsonLd path="/blogs" />
        <PageHero
          eyebrow="Insights"
          title="Perspective from the people delivering the work"
          description="Research, field notes and practical guidance from our consulting and faculty teams."
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Blogs" }]}
        />
        <section className="section-y container-x">
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-sm font-semibold text-navy">No articles published yet</p>
            <p className="mt-1.5 text-sm text-muted-foreground">Check back soon for research and perspective from our team.</p>
          </div>
        </section>
      </>
    );
  }

  const [lead, ...rest] = posts;
  const categories = [...new Set(posts.map((p) => p.category))];

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "aPIONEER Insights",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      author: { "@type": "Person", name: p.author },
      datePublished: p.date.toISOString(),
    })),
  };

  // Shape each Prisma row into what <BlogCard> expects (it expects `date`/`read` as strings).
  const toCardItem = (p: (typeof posts)[number]) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.date.toISOString().slice(0, 10),
    read: p.readTime,
  });

  return (
    <>
      <JsonLd path="/blogs" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />

      <PageHero
        eyebrow="Insights"
        title="Perspective from the people delivering the work"
        description="Research, field notes and practical guidance from our consulting and faculty teams."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Blogs" }]}
      />

      {categories.length > 1 ? (
        <section className="container-x pt-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-lg border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-navy"
              >
                {c}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-y container-x">
        <SectionHeading eyebrow="Featured" title={lead.title} description={lead.excerpt} />
        <div className="mt-6">
          <BlogCard item={toCardItem(lead)} />
        </div>

        {rest.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((b, i) => (
              <Reveal key={b.slug} delay={i * 60}>
                <BlogCard item={toCardItem(b)} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>

      <CtaBand
        title="Get our monthly briefing"
        description="Research, certification updates and capability benchmarks for technology and L&D leaders."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Browse Resources", to: "/resources" }}
      />
    </>
  );
}