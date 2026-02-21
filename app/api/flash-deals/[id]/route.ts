/**
 * Flash Deal by ID - GET, PUT, DELETE
 * PUT/DELETE require admin auth
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { z } from "zod";

const updateFlashDealSchema = z.object({
  name: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  originalPrice: z.number().positive().optional(),
  salePrice: z.number().positive().optional(),
  discount: z.number().min(0).max(100).optional(),
  emoji: z.string().optional(),
  tag: z.string().optional(),
  bgColor: z.string().optional(),
  accentColor: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const deal = await prisma.flashDeal.findUnique({ where: { id } });
    if (!deal) return NextResponse.json(null, { status: 404 });
    return NextResponse.json({
      id: deal.id,
      name: deal.name,
      subtitle: deal.subtitle,
      originalPrice: Number(deal.originalPrice),
      salePrice: Number(deal.salePrice),
      discount: deal.discount,
      emoji: deal.emoji,
      tag: deal.tag,
      bgColor: deal.bgColor,
      accentColor: deal.accentColor,
      imageUrl: deal.imageUrl,
      isActive: deal.isActive,
      displayOrder: deal.displayOrder,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch flash deal" },
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
    const data = updateFlashDealSchema.parse(body);

    let discount = data.discount;
    if (
      discount === undefined &&
      data.originalPrice !== undefined &&
      data.salePrice !== undefined
    ) {
      discount = Math.round(
        ((data.originalPrice - data.salePrice) / data.originalPrice) * 100
      );
    }

    const deal = await prisma.flashDeal.update({
      where: { id },
      data: {
        name: data.name,
        subtitle: data.subtitle,
        originalPrice: data.originalPrice,
        salePrice: data.salePrice,
        discount,
        emoji: data.emoji,
        tag: data.tag,
        bgColor: data.bgColor,
        accentColor: data.accentColor,
        imageUrl: data.imageUrl,
        isActive: data.isActive,
        displayOrder: data.displayOrder,
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
      { error: "Failed to update flash deal" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.flashDeal.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete flash deal" },
      { status: 500 }
    );
  }
}
