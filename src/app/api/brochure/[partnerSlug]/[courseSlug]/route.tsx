import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import path from "node:path";
import { partnerCourses } from "@/data/partner-courses";
import { microsoftCourses } from "@/data/microsoft-courses";
import { CourseBrochureDocument } from "@/lib/pdf/BrochureDocument";
import type { BrochureData } from "@/lib/pdf/types";
import type { PartnerCourse } from "@/data/partner-types";

// react-pdf needs Node APIs (fs, buffers) — must not run on the Edge runtime.
export const runtime = "nodejs";

const allCourses: PartnerCourse[] = [...partnerCourses, ...microsoftCourses];

function toBrochureData(course: PartnerCourse): BrochureData {
  return {
    title: course.title,
    partner: course.partner,
    category: course.category,
    credential: course.credential,
    duration: course.duration,
    examDuration: course.examDuration,
    intro: course.whyAttend,
    objectives: course.learningObjectives,
    audience: course.whoShouldAttend,
    prerequisites: course.prerequisites ? [course.prerequisites] : undefined,
    outline: course.agenda?.map((day) => ({
      heading: `${day.day}: ${day.title}`,
      points: day.points,
    })),
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ partnerSlug: string; courseSlug: string }> },
) {
  const { partnerSlug, courseSlug } = await params;

  const course = allCourses.find((c) => c.partnerSlug === partnerSlug && c.slug === courseSlug);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const logoPath = path.join(process.cwd(), "public", "images", "logo-mark.png");
  const data = toBrochureData(course);

  const buffer = await renderToBuffer(<CourseBrochureDocument data={data} logoPath={logoPath} />);
  const body = new Uint8Array(buffer);

  const fileName = `${course.slug}-brochure.pdf`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}