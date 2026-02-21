"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { products as fallbackProducts } from "@/lib/data";
import type { ApiProduct } from "@/lib/api";

function toProductCardFormat(p: ApiProduct | (typeof fallbackProducts)[0]) {
  const cat = "category" in p && typeof (p as ApiProduct).category === "object"
    ? (p as ApiProduct).category?.slug
    : (p as { category: string }).category;
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: cat ?? "",
    shortDescription: (p as { shortDescription?: string }).shortDescription ?? "",
    price: (p as { price: number }).price,
    images: (p as { images: { url: string; alt: string }[] }).images ?? [],
  };
}

export function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<(ApiProduct | (typeof fallbackProducts)[0])[]>(
    fallbackProducts.filter((p) => p.featured)
  );

  useEffect(() => {
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ApiProduct[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const featured = data.filter((p) => p.featured);
          setProducts(featured.length > 0 ? featured : data.slice(0, 6));
        }
      })
      .catch(() => { });
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <SectionTitle subtitle="Our Bestsellers">Featured Products</SectionTitle>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <ProductCard product={toProductCardFormat(product)} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        {/* <Link href="/products">
          <Button variant="outline" size="lg" className="mt-6 w-full sm:w-auto">
            Explore products
          </Button>
        </Link> */}
      </Container>
    </section>
  );
}
