export type CourseAgendaDay = {
  day: string;
  title: string;
  points: string[];
};

export type CertificationRow = {
  credential: string;
  professional: string;
  project: string;
};

export type PartnerCourse = {
  id: string;
  slug: string;
  partner: string;
  partnerSlug: string;
  title: string;
  category: string;
  categorySlug: string;
  tagline: string;
  duration: string;
  examDuration: string;
  credential: string;
  whyAttend: string;
  prerequisites?: string;
  whoShouldAttend: string[];
  agenda?: CourseAgendaDay[];
  learningObjectives: string[];
  examDomains?: string[];
  certificationTable: CertificationRow[];
  generalInfo: string[];
};

export type LearningPartner = {
  slug: string;
  name: string;
  short: string;
  accent: string;
  logo?: string;
  tagline: string;
  description: string;
  website: string;
  status: "live" | "coming-soon";
  categories: { name: string; slug: string; count: number; icon?: string }[];
};