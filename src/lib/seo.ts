import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

const SITE_URL = "https://apioneerbusiness.com";

type Fallback = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

// Cached so the same request-render only hits the DB once per path, even
// though both generateMetadata() and the page component call this.
export const getPageSeoRecord = cache(async (path: string) => {
  try {
    return await prisma.pageSeo.findUnique({ where: { path } });
  } catch {
    return null;
  }
});

export async function getPageMetadata(path: string, fallback: Fallback): Promise<Metadata> {
  const override = await getPageSeoRecord(path);

  const title = override?.title || fallback.title;
  const description = override?.description || fallback.description;
  const ogTitle = override?.ogTitle || fallback.ogTitle || title;
  const ogDescription = override?.ogDescription || fallback.ogDescription || description;
  const ogImage = override?.ogImage || fallback.ogImage;
  const twitterTitle = override?.twitterTitle || ogTitle;
  const twitterDescription = override?.twitterDescription || ogDescription;
  const twitterImage = override?.twitterImage || ogImage;
  const canonicalUrl = override?.canonicalUrl || `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords: override?.keywords || undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: override?.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: "APIONEER Business Solutions",
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      ...(twitterImage ? { images: [twitterImage] } : {}),
    },
  };
}

export { SITE_URL };