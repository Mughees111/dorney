/**
 * Products API - GET (list) and POST (create)
 * POST requires admin auth
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  categoryId: z.string().min(1),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive(),
  featured: z.boolean().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
    const mapped = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      categoryId: p.categoryId,
      category: p.category
        ? { id: p.category.id, name: p.category.name, slug: p.category.slug }
        : null,
      shortDescription: p.shortDescription,
      description: p.description,
      price: Number(p.price),
      featured: p.featured,
      image: p.image,
      imageAlt: p.imageAlt,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      keywords: (p.keywords as string[]) || [],
    }));
    return NextResponse.json(mapped);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch products" },
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
    const data = createProductSchema.parse(body);
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        categoryId: data.categoryId,
        shortDescription: data.shortDescription,
        description: data.description,
        price: data.price,
        featured: data.featured ?? false,
        image: data.image,
        imageAlt: data.imageAlt,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords as object,
      },
      include: { category: true },
    });
    // Revalidate the product page and products listing
    revalidatePath(`/products/${product.slug}`);
    revalidatePath('/products');
    return NextResponse.json({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: Number(product.price),
      image: product.image,
    });
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues ?? e }, { status: 400 });
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
