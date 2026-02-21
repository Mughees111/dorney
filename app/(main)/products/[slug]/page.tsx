import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { getProductBySlugFromDb, getProductsFromDb } from "@/lib/data-server";
import {
  getProductBySlug,
  getProductsByCategory,
  getCategoryBySlug,
  getAbsoluteUrl,
} from "@/lib/data";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const apiProducts = await getProductsFromDb();
  if (apiProducts?.length) {
    return apiProducts.map((p) => ({ slug: p.slug }));
  }
  const { products } = await import("@/lib/data");
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const apiProduct = await getProductBySlugFromDb(slug);
  const mockProduct = getProductBySlug(slug);
  const product = apiProduct || mockProduct;
  if (!product) return { title: "Product Not Found" };

  const category =
    typeof product.category === "object" && product.category
      ? (product.category as { name?: string }).name
      : getCategoryBySlug(product.category as string)?.name;
  const imageUrl = product.images?.[0]
    ? getAbsoluteUrl(product.images[0].url)
    : undefined;

  return {
    title: (product as { metaTitle?: string }).metaTitle || product.name,
    description: (product as { metaDescription?: string }).metaDescription || product.description || "",
    keywords: (product as { keywords?: string[] }).keywords,
    alternates: {
      canonical: getAbsoluteUrl(`/products/${product.slug}`),
    },
    openGraph: {
      title: (product as { metaTitle?: string }).metaTitle || product.name,
      description: (product as { metaDescription?: string }).metaDescription || "",
      url: getAbsoluteUrl(`/products/${product.slug}`),
      images: imageUrl ? [{ url: imageUrl, alt: product.images[0]?.alt || product.name }] : [],
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

function ProductJsonLd({
  product,
}: {
  product: {
    name: string;
    description?: string | null;
    images: { url: string }[];
    price: number;
    slug: string;
    category?: string | { slug?: string; name?: string } | null;
  };
}) {
  const catObj = (product as { category?: string | { slug?: string; name?: string } | null }).category;
  const categoryName =
    typeof catObj === "object" && catObj
      ? catObj.name
      : typeof catObj === "string"
        ? getCategoryBySlug(catObj)?.name
        : null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => getAbsoluteUrl(i.url)),
    brand: { "@type": "Brand", name: "Dornay" },
    category: categoryName ?? undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const apiProduct = await getProductBySlugFromDb(slug);
  const mockProduct = getProductBySlug(slug);
  const product = apiProduct || mockProduct;
  if (!product) notFound();

  const categorySlug =
    (typeof product.category === "object" && product.category
      ? (product.category as { slug?: string }).slug
      : (product.category as string)) ?? "";
  const category =
    typeof product.category === "object" && product.category
      ? product.category
      : categorySlug
        ? getCategoryBySlug(categorySlug)
        : null;
  const categoryDisplay =
    typeof category === "object" && category && "name" in category
      ? (category as { name?: string }).name ?? ""
      : "";
  const capitalizedCategory =
    categoryDisplay && categoryDisplay.charAt(0).toUpperCase() + categoryDisplay.slice(1);

  const relatedProducts = await (async () => {
    const allProducts = await getProductsFromDb();
    if (allProducts !== null && allProducts !== undefined && allProducts.length > 0) {
      return allProducts.filter(
        (p) =>
          ((p.category as { slug?: string })?.slug === categorySlug ||
            p.categoryId === (product as { categoryId?: string }).categoryId) &&
          p.id !== product.id
      );
    }
    return getProductsByCategory(categorySlug).filter((p) => p.id !== product.id);
  })();

  const mainImage = product.images?.[0];

  return (
    <>
      <ProductJsonLd product={product} />
      <section className="py-12 md:py-20 bg-bgLight min-h-screen">
        <Container>
          <nav className="mb-8 text-sm text-neutral">
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${categorySlug}`} className="hover:text-primary">
              {capitalizedCategory}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-dark font-medium">{product.name}</span>
          </nav>

          <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl">
              <Image
                src={mainImage?.url || "/images/products/featuredProduct1.png"}
                alt={mainImage?.alt || (product as { imageAlt?: string }).imageAlt || product.name}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-cookie text-primary mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-secondary font-semibold mb-2 capitalize">
                {capitalizedCategory}
              </p>
              <p className="text-2xl font-bold text-dark mb-6">Rs. {product.price}</p>
              <p className="text-lg text-neutral leading-relaxed mb-8">
                {product.description}
              </p>
              <ProductDetailClient
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  image: mainImage?.url,
                  imageAlt: mainImage?.alt || product.name,
                }}
              />
            </div>
          </article>

          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-poppins font-bold text-dark mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.slice(0, 6).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={{
                      id: p.id,
                      name: p.name,
                      slug: p.slug,
                      category: (p as { category?: { slug?: string } }).category?.slug ?? categorySlug,
                      shortDescription: (p as { shortDescription?: string }).shortDescription ?? undefined,
                      price: (p as { price: number }).price,
                      images: (p as { images: { url: string; alt: string }[] }).images ?? [],
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
