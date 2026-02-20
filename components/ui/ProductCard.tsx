"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { getWhatsAppUrl } from "@/lib/helpers";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

// Supports both API product shape and lib/data product shape
interface ProductCardProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription?: string | null;
  price: number;
  images: { url: string; alt: string }[];
}

interface ProductCardProps {
  product: ProductCardProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const category =
    typeof product.category === "string"
      ? product.category.replace(/-/g, " ")
      : (product as { category?: { name?: string } }).category?.name ?? "";
  const categoryDisplay =
    typeof category === "string"
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "";
  const mainImage = product.images?.[0];
  const imageUrl = mainImage?.url ?? "";
  const imageAlt = mainImage?.alt ?? product.name;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: imageUrl,
      imageAlt,
    });
  };

  const whatsappUrl = getWhatsAppUrl(
    undefined,
    `Hi, I'm interested in ordering ${product.name}`
  );

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden h-64">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
            {categoryDisplay}
          </div>
        </div>
      </Link>
      <div className="p-6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xl font-bold text-dark mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-neutral mb-2 line-clamp-2">{product.shortDescription}</p>
        <p className="text-primary font-bold mb-4">Rs. {product.price}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="primary"
            size="sm"
            className="w-full sm:flex-1 flex items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
          <Button
            href={whatsappUrl}
            variant="outline"
            size="sm"
            className="w-full sm:flex-1 uppercase"
          >
            Inquire on WhatsApp
          </Button>
        </div>
      </div>
    </article>
  );
}
