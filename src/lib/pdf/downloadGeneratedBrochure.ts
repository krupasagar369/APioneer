"use client";

import type { BrochureData } from "./types";

/**
 * Posts course data to /api/brochure/generate and triggers a browser download of the
 * returned PDF. For partners whose course data only exists live (AI CERTs, Microsoft
 * Learn) — there's no static partnerCourses/microsoftCourses entry, so we can't use
 * the /api/brochure/[partnerSlug]/[courseSlug] route those partners use.
 */
export async function downloadGeneratedBrochure(data: BrochureData): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/brochure/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return { ok: false, error: `Server responded ${res.status}` };
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "course"}-brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return { ok: true };
  } catch (err) {
    console.error("[brochure] download failed:", err);
    return { ok: false, error: "Network error" };
  }
}