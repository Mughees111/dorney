import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  getCategoryBySlug,
  getProductsByCategory,
  getAbsoluteUrl,
} from "@/lib/data";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { categories } = await import("@/lib/data");
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  const imageUrl = getAbsoluteUrl(category.image);

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    keywords: category.keywords,
    alternates: {
      canonical: getAbsoluteUrl(`/category/${category.slug}`),
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: getAbsoluteUrl(`/category/${category.slug}`),
      images: [{ url: imageUrl, alt: category.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: category.metaTitle,
      description: category.metaDescription,
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);

  return (
    <section className="py-12 md:py-20 bg-bgLight min-h-screen">
      <Container>
        <nav className="mb-8 text-sm text-neutral">
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-dark font-medium">{category.name}</span>
        </nav>

        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cookie text-primary mb-4">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl text-neutral max-w-3xl mx-auto">
            {category.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categoryProducts.length > 0 ? (
            categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
