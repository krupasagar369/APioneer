import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  try {
    const entry = await prisma.pageSeo.create({ data });
    return NextResponse.json(entry);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create. That path may already have an override." }, { status: 400 });
  }
}