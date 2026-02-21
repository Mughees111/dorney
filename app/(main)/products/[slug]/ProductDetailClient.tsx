"use client";

import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/helpers";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image?: string;
    imageAlt?: string;
  };
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const whatsappUrl = getWhatsAppUrl(
    undefined,
    `Hi, I'm interested in ordering ${product.name}`
  );

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      imageAlt: product.imageAlt,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        variant="primary"
        size="lg"
        className="uppercase flex items-center gap-2"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </Button>
      <Button href={whatsappUrl} variant="outline" size="lg" className="uppercase">
        Inquire on WhatsApp
      </Button>
    </div>
  );
}
