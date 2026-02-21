"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { getWhatsAppUrl, formatOrderForWhatsApp } from "@/lib/helpers";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalAmount, clearCart } = useCart();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const handleOrderOnline = async () => {
    if (items.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      setOrderError("Please enter your name and phone number.");
      return;
    }
    setPlacingOrder(true);
    setOrderError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim() || undefined,
          customerPhone: customerPhone.trim(),
          customerAddress: customerAddress.trim() || undefined,
          items: items.map((i) => ({
            productId: i.productId,
            productName: i.name,
            quantity: i.quantity,
            price: i.price,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");
      setOrderSuccess(data.orderNumber);
      clearCart();
    } catch (e) {
      setOrderError(e instanceof Error ? e.message : "Order failed. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleOrderWhatsApp = () => {
    const message = formatOrderForWhatsApp(
      items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      totalAmount,
      customerName.trim() || undefined
    );
    window.open(getWhatsAppUrl(undefined, message), "_blank");
  };

  if (items.length === 0 && !orderSuccess) {
    return (
      <section className="py-16 md:py-24 bg-bgLight min-h-screen">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-cookie text-primary mb-4">Your cart is empty</h1>
            <p className="text-neutral mb-8">Add some products to get started.</p>
            <Link href="/products">
              <Button variant="primary" size="lg">Browse Products</Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  if (orderSuccess) {
    return (
      <section className="py-16 md:py-24 bg-bgLight min-h-screen">
        <Container>
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-3xl font-cookie text-primary mb-4">Order Placed!</h1>
            <p className="text-dark mb-2">Order number: <strong>{orderSuccess}</strong></p>
            <p className="text-neutral mb-8">We will contact you shortly to confirm.</p>
            <Link href="/products">
              <Button variant="primary" size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-bgLight min-h-screen">
      <Container>
        <h1 className="text-4xl font-cookie text-primary mb-8">Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-white rounded-xl shadow-md"
              >
                {item.image && (
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                )}
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-dark truncate">{item.name}</h3>
                  <p className="text-primary font-bold">Rs. {item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right font-bold">
                  Rs. {item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4 sticky top-24">
              <h2 className="text-xl font-bold text-dark">Order Details</h2>
              <input
                type="text"
                placeholder="Your Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Delivery Address (optional)"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <p className="text-lg font-bold">Total: Rs. {totalAmount}</p>
              {orderError && (
                <p className="text-red-600 text-sm">{orderError}</p>
              )}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleOrderOnline}
                disabled={placingOrder}
              >
                {placingOrder ? "Placing Order…" : "Order Online"}
              </Button>
              <button
                type="button"
                onClick={handleOrderWhatsApp}
                className="w-full px-8 py-4 text-lg font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Order on WhatsApp
              </button>
              <Link href="/products" className="block">
                <Button variant="outline" size="sm" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
