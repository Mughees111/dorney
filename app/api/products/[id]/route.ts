/**
 * Product API - GET, PUT, DELETE by ID
 * PUT and DELETE require admin auth
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { z } from "zod";

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  featured: z.boolean().optional(),
  imageAlt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  images: z.array(z.object({ imageUrl: z.string(), imageAlt: z.string().optional() })).optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, productImages: true },
    });
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      ...product,
      price: Number(product.price),
      keywords: (product.keywords as string[]) || [],
      images: product.productImages.map((i) => ({
        url: i.imageUrl,
        alt: i.imageAlt || product.imageAlt || product.name,
      })),
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
    const body = await req.json();
    const data = updateProductSchema.parse(body);
    if (data.images) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
    }
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.slug && { slug: data.slug }),
        ...(data.categoryId && { categoryId: data.categoryId }),
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.imageAlt !== undefined && { imageAlt: data.imageAlt }),
        ...(data.metaTitle !== undefined && { metaTitle: data.metaTitle }),
        ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription }),
        ...(data.keywords && { keywords: data.keywords as object }),
        ...(data.images?.length && {
          productImages: {
            create: data.images.map((img) => ({
              imageUrl: img.imageUrl,
              imageAlt: img.imageAlt,
            })),
          },
        }),
      },
      include: { category: true, productImages: true },
    });
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
