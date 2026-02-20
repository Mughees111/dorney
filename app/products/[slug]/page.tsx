import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  getProductBySlug,
  getProductsByCategory,
  getCategoryBySlug,
  getAbsoluteUrl,
} from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/helpers";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { products } = await import("@/lib/data");
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const category = getCategoryBySlug(product.category);
  const categoryName = category?.name ?? product.category;

  const imageUrl = product.images[0]
    ? getAbsoluteUrl(product.images[0].url)
    : undefined;

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
    alternates: {
      canonical: getAbsoluteUrl(`/products/${product.slug}`),
    },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: getAbsoluteUrl(`/products/${product.slug}`),
      images: imageUrl ? [{ url: imageUrl, alt: product.images[0].alt }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle,
      description: product.metaDescription,
      images: imageUrl ? [imageUrl] : [],
    },
    robots: { index: true, follow: true },
  };
}

function ProductJsonLd({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
  const category = getCategoryBySlug(product.category);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => getAbsoluteUrl(i.url)),
    brand: { "@type": "Brand", name: "Dorney" },
    category: category?.name,
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
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const relatedProducts = getProductsByCategory(product.category).filter(
    (p) => p.id !== product.id
  );
  const categoryDisplay = category?.name ?? product.category.replace(/-/g, " ");
  const whatsappUrl = getWhatsAppUrl(
    undefined,
    `Hi, I'm interested in ordering ${product.name}`
  );

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
            <Link href={`/category/${product.category}`} className="hover:text-primary">
              {categoryDisplay}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-dark font-medium">{product.name}</span>
          </nav>

          <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl">
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt}
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
                {categoryDisplay}
              </p>
              <p className="text-2xl font-bold text-dark mb-6">
                Rs. {product.price}
              </p>
              <p className="text-lg text-neutral leading-relaxed mb-8">
                {product.description}
              </p>
              <Button href={whatsappUrl} variant="primary" size="lg" className="uppercase">
                Order on WhatsApp
              </Button>
            </div>
          </article>

          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-poppins font-bold text-dark mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.slice(0, 6).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
