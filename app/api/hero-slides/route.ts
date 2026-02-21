/**
 * Hero Slides API - GET (list) and POST (create)
 * POST requires admin auth
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { z } from "zod";

const createSlideSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  displayOrder: z.number().optional(),
});

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(slides);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch hero slides" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = createSlideSchema.parse(body);
    const slide = await prisma.heroSlide.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        imageUrl: data.imageUrl,
        imageAlt: data.imageAlt,
        displayOrder: data.displayOrder ?? 0,
      },
    });
    return NextResponse.json(slide);
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues ?? e }, { status: 400 });
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create hero slide" },
      { status: 500 }
    );
  }
}
