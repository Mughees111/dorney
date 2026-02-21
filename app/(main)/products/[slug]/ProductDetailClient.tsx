"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/helpers";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";

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
  const { addItem, updateQuantity, items } = useCart();
  const [showFeedback, setShowFeedback] = useState(false);
  const whatsappUrl = getWhatsAppUrl(
    undefined,
    `Hi, I'm interested in ordering ${product.name}`
  );

  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

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
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {quantity > 0 ? (
        <div className="flex items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleDecreaseQuantity}
            className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors text-xl font-bold"
            aria-label="Decrease quantity"
          >
            <Minus className="w-6 h-6" />
          </button>
          <span className="font-bold text-2xl min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={handleIncreaseQuantity}
            className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors text-xl font-bold"
            aria-label="Increase quantity"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <Button
          variant="primary"
          size="lg"
          className="uppercase flex items-center gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </Button>
      )}
      <Button href={whatsappUrl} variant="outline" size="lg" className="uppercase">
        Inquire on WhatsApp
      </Button>
      {showFeedback && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
          <Check className="w-5 h-5" />
          Added to cart!
        </div>
      )}
    </div>
  );
}
