export type AiCertsCourseSummary = {
  id: number;
  title: string;
  description?: string;
  categories?: string[];
  certification_price?: string;
};

export type AiCertsCoursesListResponse = {
  success: boolean;
  data: AiCertsCourseSummary[];
  total_pages: number;
};

/** A single module within a certification's syllabus. */
export type AiCertsCertificationModule = {
  certification_module_title?: string;
  certification_module_description?: string;
};

/** A tool/technology referenced in a certification's curriculum. */
export type AiCertsTool = {
  name?: string;
  tool_image?: string;
};

export type AiCertsCertificateOverview = {
  prerequisites?: string;
  certificate_duration?: string;
  included_items?: string;
  exam_format?: string;
};

/**
 * Full course detail record from the AI CERTs partner API's single-course endpoint
 * (`aicerts-api/v1/course/{id}`) — richer than the list endpoint, with modules,
 * tools, and certificate overview data.
 */
export type AiCertsCourseFull = {
  id: number;
  title: string;
  description?: string;
  course_tagline?: string;
  certificate_code?: string;
  certificate_badge_url?: string;
  feature_image_url?: string;
  certificate_overview?: AiCertsCertificateOverview;
  certification_modules?: AiCertsCertificationModule[];
  ai_tools?: AiCertsTool[];
  categories?: string[];
  certification_price?: string;
};

export type AiCertsCourseFullResponse = {
  success: boolean;
  data: AiCertsCourseFull;
};

/**
 * WordPress REST API v2 post shape for the detail endpoint. WP renders `title`/`content`
 * as { rendered: string } objects rather than plain strings.
 */
export type AiCertsCourseDetail = {
  id: number;
  title: { rendered: string } | string;
  content: { rendered: string } | string;
  excerpt?: { rendered: string } | string;
  featured_media?: number;
  categories?: number[];
};