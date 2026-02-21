"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { getWhatsAppUrl } from "@/lib/helpers";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";

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
  const { addItem, updateQuantity, items } = useCart();
  const [showFeedback, setShowFeedback] = useState(false);
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

  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

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
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
    }
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
          {quantity > 0 ? (
            <div className="flex items-center justify-center gap-2 w-full sm:flex-1">
              <button
                onClick={handleDecreaseQuantity}
                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-lg min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="w-full sm:flex-1 flex items-center justify-center gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          )}
          <Button
            href={whatsappUrl}
            variant="outline"
            size="sm"
            className="w-full sm:flex-1 uppercase"
          >
            Inquire on WhatsApp
          </Button>
        </div>
        {showFeedback && (
          <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
            <Check className="w-4 h-4" />
            Added to cart!
          </div>
        )}
      </div>
    </article>
  );
}
