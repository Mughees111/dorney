/**
 * FAQ API - GET, PUT, DELETE by ID
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { z } from "zod";

const updateFAQSchema = z.object({
  question: z.string().min(1).optional(),
  answer: z.string().min(1).optional(),
  category: z.string().optional(),
  displayOrder: z.number().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const faq = await prisma.fAQ.findUnique({ where: { id } });
    if (!faq) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(faq);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch FAQ" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const data = updateFAQSchema.parse(body);
    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        ...(data.question && { question: data.question }),
        ...(data.answer && { answer: data.answer }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.displayOrder !== undefined && { displayOrder: data.displayOrder }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });
    return NextResponse.json(faq);
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues ?? e }, { status: 400 });
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(_req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.fAQ.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}