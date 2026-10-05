import { getPageSeoRecord } from "@/lib/seo";

export async function JsonLd({ path }: { path: string }) {
  const record = await getPageSeoRecord(path);
  if (!record?.jsonLd) return null;

  // Validate it's parseable JSON before rendering, so a malformed paste in
  // admin doesn't break the page or ship broken structured data.
  try {
    JSON.parse(record.jsonLd);
  } catch {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: record.jsonLd }}
    />
  );
}