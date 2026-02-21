"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { categories as fallbackCategories } from "@/lib/data";
import type { ApiCategory } from "@/lib/api";

interface CatItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export function ProductCategories() {
  const [categories, setCategories] = useState<CatItem[]>(
    fallbackCategories.map((c) => ({ ...c, image: c.image }))
  );
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ApiCategory[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setCategories(
            data.map((c) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              description: c.description ?? "",
              image: c.image || c.imageUrl || "/images/categories/cakes.webp",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const filteredCategories =
    activeFilter === "all"
      ? categories
      : categories.filter((cat) => cat.slug === activeFilter);

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle subtitle="Explore Our Range">
          Product Categories
        </SectionTitle>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeFilter === "all"
                ? "bg-gradient-primary text-white shadow-lg"
                : "bg-gray-100 text-dark hover:bg-gray-200"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.slug)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category.slug
                  ? "bg-gradient-primary text-white shadow-lg"
                  : "bg-gray-100 text-dark hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
