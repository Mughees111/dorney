import { MetadataRoute } from "next";
import { products, categories } from "@/lib/data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dornyfood.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly" },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  }));

  return [...staticPages, ...productPages, ...categoryPages];
}
