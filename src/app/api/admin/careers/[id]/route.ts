import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const career = await prisma.career.findUnique({ where: { id } });
  if (!career) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(career);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await request.json();
  try {
    const career = await prisma.career.update({ where: { id }, data });
    return NextResponse.json(career);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update role." }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.career.delete({ where: { id } });
  return NextResponse.json({ success: true });
}