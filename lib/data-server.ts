/**
 * Server-side data fetchers using Prisma directly.
 * Use in Server Components instead of fetchApi to avoid HTTP round-trips.
 */

import { prisma } from "@/lib/db";
import type { ApiProduct, ApiCategory } from "@/lib/api";

export async function getProductsFromDb(): Promise<ApiProduct[] | null> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        productImages: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return products.map((p) => ({
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
      imageAlt: p.imageAlt,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      keywords: (p.keywords as string[]) || [],
      images: p.productImages.map((i) => ({
        url: i.imageUrl,
        alt: i.imageAlt || p.imageAlt || p.name,
      })),
    }));
  } catch (e) {
    console.error("[data-server] getProductsFromDb error:", e);
    return null;
  }
}

export async function getCategoriesFromDb(): Promise<ApiCategory[] | null> {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    });
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.imageUrl,
      imageUrl: c.imageUrl,
      imageAlt: c.imageAlt,
      metaTitle: c.metaTitle,
      metaDescription: c.metaDescription,
      keywords: (c.keywords as string[]) || [],
    }));
  } catch (e) {
    console.error("[data-server] getCategoriesFromDb error:", e);
    return null;
  }
}

export async function getProductBySlugFromDb(
  slug: string
): Promise<ApiProduct | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true, productImages: true },
    });
    if (!product) return null;
    return {
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
      imageAlt: product.imageAlt,
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription,
      keywords: (product.keywords as string[]) || [],
      images: product.productImages.map((i) => ({
        url: i.imageUrl,
        alt: i.imageAlt || product.imageAlt || product.name,
      })),
    };
  } catch (e) {
    console.error("[data-server] getProductBySlugFromDb error:", e);
    return null;
  }
}

export interface FlashDeal {
  id: string;
  name: string;
  subtitle: string | null;
  originalPrice: number;
  salePrice: number;
  discount: number;
  emoji: string | null;
  tag: string | null;
  bgColor: string | null;
  accentColor: string | null;
  imageUrl: string | null;
  isActive: boolean;
  displayOrder: number;
}

export async function getFlashDealsFromDb(): Promise<FlashDeal[] | null> {
  try {
    const deals = await prisma.flashDeal.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    return deals.map((d) => ({
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
    }));
  } catch (e) {
    console.error("[data-server] getFlashDealsFromDb error:", e);
    return null;
  }
}
