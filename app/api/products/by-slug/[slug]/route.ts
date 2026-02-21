/**
 * Product by slug - GET (for product detail pages)
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!product) return NextResponse.json(null);
    return NextResponse.json({
      id: product.id,
      name: product.name,
      slug: product.slug,
      categoryId: product.categoryId,
      category: product.category
        ? { id: product.category.id, name: product.category.name, slug: product.category.slug }
        : null,
      shortDescription: product.shortDescription,
      description: product.description,
      price: Number(product.price),
      featured: product.featured,
      image: product.image,
      imageAlt: product.imageAlt,
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription,
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
