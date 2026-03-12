/**
 * Product API - GET, PUT, DELETE by ID
 * PUT and DELETE require admin auth
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { deleteImage } from "@/lib/cloudinary";

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  featured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      ...product,
      price: Number(product.price),
      keywords: (product.keywords as string[]) || [],
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch product" },
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
    const existing = await prisma.product.findUnique({ where: { id } });
    const body = await req.json();
    const data = updateProductSchema.parse(body);
    const updateData: Record<string, unknown> = {};
    if (data.name) updateData.name = data.name;
    if (data.slug) updateData.slug = data.slug;
    if (data.categoryId) updateData.categoryId = data.categoryId;
    if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.image !== undefined) {
      if (existing?.imagePublicId && data.image !== existing.image) {
        await deleteImage(existing.imagePublicId);
        updateData.imagePublicId = null;
      }
      updateData.image = data.image;
    }
    if (data.imageAlt !== undefined) updateData.imageAlt = data.imageAlt;
    if (data.metaTitle !== undefined) updateData.metaTitle = data.metaTitle;
    if (data.metaDescription !== undefined) updateData.metaDescription = data.metaDescription;
    if (data.keywords) updateData.keywords = data.keywords as object;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });
    // Revalidate the product page and products listing
    revalidatePath(`/products/${product.slug}`);
    revalidatePath('/products');
    return NextResponse.json(product);
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues ?? e }, { status: 400 });
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update product" },
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
    const existing = await prisma.product.findUnique({ where: { id } });
    if (existing?.imagePublicId) {
      await deleteImage(existing.imagePublicId);
    }
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
