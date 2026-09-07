import type { Metadata } from "next";
import { learningPartners } from "@/data/partners";
import { AiCertCourseDetail } from "./AiCertCourseDetail";

export const metadata: Metadata = {
  title: "AI CERTs Certification — APIONEER",
  description: "An applied AI certification delivered by AI CERTs, offered through APIONEER.",
};

type Props = { params: Promise<{ id: string }> };

export default async function AiCertCourseDetailPage({ params }: Props) {
  const { id } = await params;
  const partner = learningPartners.find((p) => p.slug === "ai-cert")!;

  return <AiCertCourseDetail id={id} partnerName={partner.name} />;
}