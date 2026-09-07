export type GroupDivision = {
  slug: string;
  number: string;
  name: string;
  tag: string;
  accent: string;
  title: string;
  blurb: string;
  cta: string;
};

export const groupDivisions: GroupDivision[] = [
  {
    slug: "learning-development",
    number: "01",
    name: "Learning & Development",
    tag: "Learning & Development",
    accent: "#158A80",
    title: "Future-ready learning for individuals and enterprises",
    blurb:
      "World-class training, certifications and technology learning that builds future-ready capabilities — from cloud and AI to leadership and soft skills.",
    cta: "Explore Programs",
  },
  {
    slug: "hrm-services",
    number: "02",
    name: "HRM Services",
    tag: "HRM Services",
    accent: "#1F5AA6",
    title: "People solutions that build stronger organizations",
    blurb:
      "End-to-end HR consulting, talent acquisition and outsourcing that helps organizations attract, engage and retain the right talent.",
    cta: "Explore Services",
  },
  {
    slug: "engineering-services",
    number: "03",
    name: "Engineering Services",
    tag: "Engineering Services",
    accent: "#2C3E8C",
    title: "Engineering excellence that powers innovation",
    blurb:
      "Intelligent engineering, design and technical solutions — CAD/CAE, simulation and plant engineering — that drive efficiency and quality.",
    cta: "Explore Capabilities",
  },
  {
    slug: "advanced-manufacturing",
    number: "04",
    name: "Advanced Manufacturing",
    tag: "Advanced Manufacturing · Pighalitadhatu Innovative Solutions Pvt. Ltd.",
    accent: "#B4801F",
    title: "Precision manufacturing, engineered to perform",
    blurb:
      "High-precision die casting and engineering manufacturing solutions built for demanding industries worldwide.",
    cta: "Explore Capabilities",
  },
  {
    slug: "arghya-corporate-gifting",
    number: "05",
    name: "ARGHYA",
    tag: "ARGHYA · Premium Corporate Gifting",
    accent: "#6E1424",
    title: "Thoughtful gifts, lasting impressions",
    blurb:
      "Curated corporate gifting experiences — from executive gifts to bulk employee hampers — that strengthen relationships and brand recall.",
    cta: "Explore Collections",
  },
];

export const groupStats = [
  { value: "5", label: "Business Divisions" },
  { value: "25+", label: "Countries Served" },
  { value: "3,000+", label: "Clients Worldwide" },
  { value: "15+", label: "Years of Group Experience" },
];

export const groupWhy = [
  {
    number: "01",
    title: "One Relationship, Five Capabilities",
    detail: "A single point of contact for learning, people, engineering, manufacturing and gifting needs.",
  },
  {
    number: "02",
    title: "Cross-Division Expertise",
    detail: "Businesses that work together — from workforce training through to plant engineering and delivery.",
  },
  {
    number: "03",
    title: "Consistent Quality Standards",
    detail: "Every division operates against the same certifications, governance and delivery discipline.",
  },
  {
    number: "04",
    title: "Global Reach, Local Delivery",
    detail: "Serving clients across 25+ countries with teams based close to where the work happens.",
  },
];