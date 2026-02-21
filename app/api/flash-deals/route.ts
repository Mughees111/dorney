/**
 * Flash Deals API - GET (list) and POST (create)
 * POST requires admin auth
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { z } from "zod";

const createFlashDealSchema = z.object({
  name: z.string().min(1),
  subtitle: z.string().optional(),
  originalPrice: z.number().positive(),
  salePrice: z.number().positive(),
  discount: z.number().min(0).max(100).optional(),
  emoji: z.string().optional(),
  tag: z.string().optional(),
  bgColor: z.string().optional(),
  accentColor: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().optional(),
});

export async function GET() {
  try {
    const deals = await prisma.flashDeal.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(
      deals.map((d) => ({
        id: d.id,
        name: d.name,
        subtitle: d.subtitle,
        originalPrice: Number(d.originalPrice),
        salePrice: Number(d.salePrice),
        discount: d.discount,
        emoji: d.emoji,
        tag: d.tag,
        bgColor: d.bgColor,
        accentColor: d.accentColor,
        imageUrl: d.imageUrl,
        isActive: d.isActive,
        displayOrder: d.displayOrder,
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch flash deals" },
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
    const data = createFlashDealSchema.parse(body);
    
    const discount = data.discount ?? Math.round(
      ((data.originalPrice - data.salePrice) / data.originalPrice) * 100
    );

    const deal = await prisma.flashDeal.create({
      data: {
        name: data.name,
        subtitle: data.subtitle,
        originalPrice: data.originalPrice,
        salePrice: data.salePrice,
        discount,
        emoji: data.emoji,
        tag: data.tag,
        bgColor: data.bgColor || "#FFF3E0",
        accentColor: data.accentColor || "#FF6B00",
        imageUrl: data.imageUrl,
        isActive: data.isActive ?? true,
        displayOrder: data.displayOrder ?? 0,
      },
    });
    return NextResponse.json({
      id: deal.id,
      name: deal.name,
      salePrice: Number(deal.salePrice),
    });
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues ?? e }, { status: 400 });
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create flash deal" },
      { status: 500 }
    );
  }
}
