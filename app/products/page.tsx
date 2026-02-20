import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/ui/ProductCard";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { categories as mockCategories, products as mockProducts } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products - Premium Cakes, Biscuits, Toffees | Dorney",
  description:
    "Explore our full range of FMCG products: cup cakes, toffees, lollipops, biscuits, and snacks. Premium quality for retailers across Pakistan.",
  keywords: [
    "Dorney products",
    "FMCG Pakistan",
    "cakes biscuits toffees",
    "wholesale products",
  ],
  openGraph: {
    title: "All Products | Dorney FMCG Pakistan",
    description:
      "Premium cakes, biscuits, toffees, lollipops, and snacks for retailers.",
  },
};

export default async function ProductsPage() {
  const [apiProducts, apiCategories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const categories = apiCategories?.length
    ? apiCategories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description ?? "",
        image: c.image || c.imageUrl || "",
      }))
    : mockCategories;

  const products = apiProducts?.length
    ? apiProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category?.slug ?? p.categoryId,
        shortDescription: p.shortDescription ?? "",
        description: p.description ?? "",
        price: p.price,
        images: p.images,
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        keywords: p.keywords,
        featured: p.featured,
      }))
    : mockProducts;

  const productsByCategory = categories
    .map((cat) => ({
      ...cat,
      products: products.filter((p) => p.category === cat.slug),
    }))
    .filter((cat) => cat.products.length > 0);

  return (
    <section className="py-12 md:py-20 bg-bgLight min-h-screen">
      <Container>
        <div className="mb-12 text-center">
          <SectionTitle subtitle="Explore Our Range">All Products</SectionTitle>
          <p className="text-lg text-neutral mt-4 max-w-3xl mx-auto">
            Premium cakes, biscuits, toffees, lollipops & more – made with finest
            ingredients for retailers & distributors across Pakistan.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-poppins font-bold text-dark mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image || "/images/categories/cakes.webp"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white drop-shadow-md">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-16 md:space-y-24">
          {productsByCategory.map((cat) => (
            <div key={cat.id}>
              <h2 className="text-3xl sm:text-4xl font-cookie text-primary mb-6 text-center md:text-left">
                {cat.name}
              </h2>
              <p className="text-neutral text-center md:text-left mb-8 max-w-2xl mx-auto md:mx-0">
                {cat.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {cat.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
