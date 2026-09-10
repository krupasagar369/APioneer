import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import path from "node:path";
import { CourseBrochureDocument } from "@/lib/pdf/BrochureDocument";
import type { BrochureData } from "@/lib/pdf/types";

// react-pdf needs Node APIs (fs, buffers) — must not run on the Edge runtime.
export const runtime = "nodejs";

// Used for course data that only exists live in a partner's own API (AI CERTs,
// Microsoft Learn) — there's no static partnerCourses/microsoftCourses entry to key
// off of, so the browser sends the course details it already fetched and rendered,
// and we turn that straight into the same brochure PDF used for the static partners.
function isValidBrochureData(body: unknown): body is BrochureData {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return typeof b.title === "string" && b.title.trim().length > 0 && typeof b.partner === "string";
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80) || "course";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidBrochureData(body)) {
    return NextResponse.json({ error: "title and partner are required" }, { status: 400 });
  }

  const logoPath = path.join(process.cwd(), "public", "images", "logo-mark.png");
  const buffer = await renderToBuffer(<CourseBrochureDocument data={body} logoPath={logoPath} />);
  const bytes = new Uint8Array(buffer);

  const fileName = `${slugify(body.title)}-brochure.pdf`;

  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}