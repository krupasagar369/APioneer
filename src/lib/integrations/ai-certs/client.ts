import type { AiCertsCourseDetail, AiCertsCoursesListResponse, AiCertsCourseSummary } from "./types";

// NOTE: This module must only be imported from Server Components / server-side code
// (never from a "use client" file) — it has no client-safe guard in place because we
// deliberately avoided adding the `server-only` package without your sign-off. If you'd
// like that extra safety net, say the word and I'll add it (single small dependency).

const API_BASE_URL = "https://www.aicerts.ai/wp-json/aicerts-api/v1";
const WP_API_BASE_URL = "https://www.aicerts.ai/wp-json/wp/v2";

const FETCH_TIMEOUT_MS = 8000;
// Revalidate the partner catalogue periodically rather than on every request —
// this is third-party content that doesn't change minute-to-minute.
const REVALIDATE_SECONDS = 3600;

async function fetchWithTimeout(url: string): Promise<Response | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return res;
  } catch (err) {
    console.error(`[ai-certs] fetch failed for ${url}:`, err);
    return null;
  }
}

/**
 * Fetches every published course/certification from the AI CERTs API, following
 * pagination until `total_pages` is reached. Returns an empty array (never throws)
 * if the upstream API is unreachable — callers should show a graceful "unavailable"
 * state rather than crash the page.
 */
export async function fetchAiCertsCourses(): Promise<AiCertsCourseSummary[]> {
  const all: AiCertsCourseSummary[] = [];
  let page = 1;
  const maxPages = 10; // matches the safety cap used on the legacy site

  while (page <= maxPages) {
    const res = await fetchWithTimeout(`${API_BASE_URL}/courses?page=${page}&per_page=50`);
    if (!res) break;

    let json: AiCertsCoursesListResponse | null = null;
    try {
      json = (await res.json()) as AiCertsCoursesListResponse;
    } catch (err) {
      console.error("[ai-certs] failed to parse courses list JSON:", err);
      break;
    }

    if (!json?.success || !json.data?.length) break;
    all.push(...json.data);

    if (page >= (json.total_pages ?? 1)) break;
    page += 1;
  }

  return all;
}

/**
 * Fetches a single course/certification's full detail record by numeric WordPress
 * post ID. Returns null if unavailable so the page can render a proper 404.
 */
export async function fetchAiCertsCourseDetail(id: number | string): Promise<AiCertsCourseDetail | null> {
  const res = await fetchWithTimeout(`${WP_API_BASE_URL}/courses/${id}`);
  if (!res) return null;
  try {
    return (await res.json()) as AiCertsCourseDetail;
  } catch (err) {
    console.error(`[ai-certs] failed to parse course detail JSON for id ${id}:`, err);
    return null;
  }
}

/** Strips basic HTML tags from WordPress rendered content for plain-text display. */
export function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/\s+/g, " ")
    .trim();
}

/** Best-effort level inference from a course title, mirroring the legacy site's heuristic. */
export function inferLevel(title: string): "beginner" | "intermediate" | "advanced" {
  const t = title.toLowerCase();
  if (t.includes("advanced") || t.includes("level 3")) return "advanced";
  if (t.includes("intermediate") || t.includes("level 2")) return "intermediate";
  if (t.includes("beginner") || t.includes("foundation") || t.includes("fundamental") || t.includes("level 1")) {
    return "beginner";
  }
  return "intermediate";
}