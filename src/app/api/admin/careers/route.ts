import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  try {
    const career = await prisma.career.create({ data });
    return NextResponse.json(career);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create role. Slug may already be in use." }, { status: 400 });
  }
}