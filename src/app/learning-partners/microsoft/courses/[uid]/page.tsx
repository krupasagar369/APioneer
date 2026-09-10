import type { Metadata } from "next";
import { learningPartners } from "@/data/partners";
import { MicrosoftCourseDetail } from "./MicrosoftCourseDetail";

export const metadata: Metadata = {
  title: "Microsoft Learn Course — APIONEER",
  description: "A Microsoft Learn module or learning path, delivered through APIONEER.",
};

type Props = { params: Promise<{ uid: string }> };

export default async function MicrosoftCourseDetailPage({ params }: Props) {
  const { uid } = await params;
  const partner = learningPartners.find((p) => p.slug === "microsoft")!;

  return <MicrosoftCourseDetail uid={decodeURIComponent(uid)} partnerName={partner.name} />;
}