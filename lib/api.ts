/**
 * API client helpers for frontend
 * Falls back to mock data when API/database is unavailable
 */

const BASE = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category?: { id: string; name: string; slug: string } | null;
  shortDescription?: string | null;
  description?: string | null;
  price: number;
  featured: boolean;
  imageAlt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords: string[];
  images: { url: string; alt: string }[];
}

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords: string[];
}

export interface ApiHeroSlide {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  displayOrder: number;
}

async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    const text = await res.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

export async function fetchProducts(): Promise<ApiProduct[] | null> {
  return fetchApi<ApiProduct[]>("/api/products");
}

export async function fetchProductBySlug(slug: string): Promise<ApiProduct | null> {
  return fetchApi<ApiProduct>(`/api/products/by-slug/${slug}`);
}

export async function fetchCategories(): Promise<ApiCategory[] | null> {
  return fetchApi<ApiCategory[]>("/api/categories");
}

export async function fetchHeroSlides(): Promise<ApiHeroSlide[] | null> {
  return fetchApi<ApiHeroSlide[]>("/api/hero-slides");
}
