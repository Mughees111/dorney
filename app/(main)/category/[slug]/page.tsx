import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { getProductsFromDb, getCategoriesFromDb } from "@/lib/data-server";
import {
  getCategoryBySlug,
  getProductsByCategory,
  getAbsoluteUrl,
} from "@/lib/data";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const apiCategories = await getCategoriesFromDb();
  if (apiCategories?.length) {
    return apiCategories.map((c) => ({ slug: c.slug }));
  }
  const { categories } = await import("@/lib/data");
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const apiCategories = await getCategoriesFromDb();
  const apiCategory = apiCategories?.find((c) => c.slug === slug);
  const mockCategory = getCategoryBySlug(slug);
  const category = apiCategory || mockCategory;
  if (!category) return { title: "Category Not Found" };

  const imageUrl = getAbsoluteUrl(
    (category as { image?: string; imageUrl?: string }).image ||
      (category as { imageUrl?: string }).imageUrl ||
      ""
  );

  return {
    title: (category as { metaTitle?: string }).metaTitle || category.name,
    description: (category as { metaDescription?: string }).metaDescription || "",
    keywords: (category as { keywords?: string[] }).keywords,
    alternates: {
      canonical: getAbsoluteUrl(`/category/${slug}`),
    },
    openGraph: {
      title: (category as { metaTitle?: string }).metaTitle || category.name,
      description: (category as { metaDescription?: string }).metaDescription || "",
      url: getAbsoluteUrl(`/category/${slug}`),
      images: imageUrl ? [{ url: imageUrl, alt: category.name }] : [],
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [apiProducts, apiCategories] = await Promise.all([
    getProductsFromDb(),
    getCategoriesFromDb(),
  ]);

  const apiCategory = apiCategories?.find((c) => c.slug === slug);
  const mockCategory = getCategoryBySlug(slug);
  const category = apiCategory || mockCategory;
  if (!category) notFound();

  const categoryProducts =
    apiProducts !== null && apiProducts !== undefined
      ? apiProducts.filter((p) => {
          const catSlug = (p.category as { slug?: string })?.slug;
          return catSlug === slug || p.categoryId === (apiCategory?.id ?? "");
        })
      : getProductsByCategory(slug);

  const products = (categoryProducts ?? []).map((p) =>
    "category" in p && typeof (p as { category: unknown }).category === "object"
      ? { ...p, category: (p as { category: { slug?: string } }).category?.slug ?? slug }
      : p
  );

  const catName = (category as { name: string }).name;

  return (
    <section className="py-12 md:py-20 bg-bgLight min-h-screen">
      <Container>
        <nav className="mb-8 text-sm text-neutral">
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-dark font-medium">{catName}</span>
        </nav>

        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cookie text-primary mb-4">
            {catName}
          </h1>
          <p className="text-lg md:text-xl text-neutral max-w-3xl mx-auto">
            {(category as { description?: string }).description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  shortDescription: product.shortDescription ?? undefined,
                  category:
                    typeof product.category === "object" && product.category
                      ? (product.category as { slug?: string }).slug ?? slug
                      : (product.category as string) ?? slug,
                }}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-neutral py-12">
              No products found in this category.
            </p>
          )}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="text-primary font-semibold hover:underline"
          >
            ← View All Products
          </Link>
        </div>
      </Container>
    </section>
  );
}
