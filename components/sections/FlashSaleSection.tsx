"use client";

import { useEffect, useState } from "react";
import { Zap, Tag, Flame, ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/context/CartContext";
import { constants } from "@/src/configs/constants";
interface FlashDeal {
  id: string;
  name: string;
  subtitle: string | null;
  originalPrice: number;
  salePrice: number;
  discount: number;
  emoji: string | null;
  tag: string | null;
  bgColor: string | null;
  accentColor: string | null;
  imageUrl: string | null;
}

const fallbackDeals: FlashDeal[] = [
  {
    id: "fallback-1",
    name: "Cream Cupcakes",
    subtitle: "Vanilla & Chocolate Mix",
    originalPrice: 250,
    salePrice: 175,
    discount: 30,
    emoji: "🧁",
    tag: "Best Seller",
    bgColor: "#FFF3E0",
    accentColor: "#FF6B00",
    imageUrl: null,
  },
  {
    id: "fallback-2",
    name: "Lollipop Bucket",
    subtitle: "Mixed Flavors — 50pcs",
    originalPrice: 500,
    salePrice: 350,
    discount: 30,
    emoji: "🍭",
    tag: "Bulk Deal",
    bgColor: "#FCE4EC",
    accentColor: "#E91E63",
    imageUrl: null,
  },
  {
    id: "fallback-3",
    name: "Candy Mix Pack",
    subtitle: "Assorted Flavors — 100pcs",
    originalPrice: 400,
    salePrice: 299,
    discount: 25,
    emoji: "🍬",
    tag: "Hot Deal",
    bgColor: "#E8F5E9",
    accentColor: "#2E7D32",
    imageUrl: null,
  },
  {
    id: "fallback-4",
    name: "Mini Donuts Box",
    subtitle: "Glazed & Sprinkled — 12pcs",
    originalPrice: 320,
    salePrice: 220,
    discount: 31,
    emoji: "🍩",
    tag: "New Arrival",
    bgColor: "#EDE7F6",
    accentColor: "#6A1B9A",
    imageUrl: null,
  },
];

export function FlashSaleSection() {
  const [deals, setDeals] = useState<FlashDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const { addItem, updateQuantity, items } = useCart();

  useEffect(() => {
    fetch("/api/flash-deals", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    } as RequestInit)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDeals(data);
        } else {
          setDeals(fallbackDeals);
        }
      })
      .catch(() => {
        setDeals(fallbackDeals);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (deal: FlashDeal) => {
    addItem({
      id: `deal-${deal.id}`,
      productId: deal.id,
      name: deal.name,
      price: deal.salePrice,
      image: deal.imageUrl || undefined,
      imageAlt: deal.name,
    });
    setAddedIds((prev) => new Set(prev).add(deal.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(deal.id);
        return next;
      });
    }, 2000);
  };

  const getCartQuantity = (dealId: string) => {
    const cartItem = items.find(item => item.id === `deal-${dealId}`);
    return cartItem?.quantity || 0;
  };

  const handleIncreaseQuantity = (deal: FlashDeal) => {
    const cartItem = items.find(item => item.id === `deal-${deal.id}`);
    if (cartItem) {
      updateQuantity(`deal-${deal.id}`, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (deal: FlashDeal) => {
    const cartItem = items.find(item => item.id === `deal-${deal.id}`);
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(`deal-${deal.id}`, cartItem.quantity - 1);
    }
  };

  if (loading) {
    return (
      <section className="py-20" style={{  background: "#FFF8F0" }}>
        <Container>
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
            <div className="h-4 w-64 bg-gray-200 rounded mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (deals.length === 0) return null;

  return (
    <section
      className="py-20 relative overflow-hidden md:mt-0 "
      style={{ background: "#FFF8F0" }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "-40px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,179,71,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "linear-gradient(135deg, #FF6B00, #FF3D00)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  boxShadow: "0 4px 16px rgba(255,107,0,0.35)",
                  animation: "pulse-badge 2s ease-in-out infinite",
                }}
              >
                <Zap className="w-3.5 h-3.5" />
                Flash Sale
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                color: "#1A1A1A",
                lineHeight: 1.1,
              }}
            >
              Today&apos;s Sweetest{" "}
              <span style={{ color: "#FF6B00" }}>Deals 🔥</span>
            </h2>
            <p
              style={{
                color: "#666",
                marginTop: "8px",
                fontSize: "1rem",
              }}
            >
              Limited stock — Order karo aaj hi, kal nahi milega!
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {deals.map((deal) => {
            const bgColor = deal.bgColor || "#FFF3E0";
            const accentColor = deal.accentColor || "#FF6B00";
            const isAdded = addedIds.has(deal.id);

            return (
              <div
                key={deal.id}
                style={{
                  background: bgColor,
                  borderRadius: "24px",
                  padding: "24px",
                  border: "2px solid transparent",
                  transition:
                    "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "0 20px 48px rgba(0,0,0,0.12)";
                  el.style.borderColor = accentColor;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                  el.style.borderColor = "transparent";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: accentColor,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    padding: "4px 10px",
                    borderRadius: "100px",
                  }}
                >
                  -{deal.discount}%
                </div>

                {deal.tag && (
                  <div className="flex items-center gap-1 mb-3">
                    <Tag className="w-3 h-3" style={{ color: accentColor }} />
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: accentColor,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {deal.tag}
                    </span>
                  </div>
                )}

                <div
                  style={{
                    fontSize: "4rem",
                    marginBottom: "12px",
                    lineHeight: 1,
                    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                  }}
                >
                  {deal.emoji || "🎁"}
                </div>

                <h3
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#1A1A1A",
                    marginBottom: "4px",
                  }}
                >
                  {deal.name}
                </h3>
                {deal.subtitle && (
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#666",
                      marginBottom: "16px",
                    }}
                  >
                    {deal.subtitle}
                  </p>
                )}

                <div className="flex items-baseline gap-3 mb-4">
                  <span
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: accentColor,
                    }}
                  >
                    Rs. {deal.salePrice}
                  </span>
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "#999",
                      textDecoration: "line-through",
                    }}
                  >
                    Rs. {deal.originalPrice}
                  </span>
                </div>

                {(() => {
                  const quantity = getCartQuantity(deal.id);
                  return quantity > 0 ? (
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleDecreaseQuantity(deal)}
                        className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-lg min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(deal)}
                        className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(deal)}
                      style={{
                        width: "100%",
                        background: isAdded ? "#22c55e" : accentColor,
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        padding: "12px",
                        borderRadius: "12px",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isAdded) e.currentTarget.style.opacity = "0.85";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  );
                })()}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p style={{ color: "#999", fontSize: "0.85rem" }}>
            Bulk orders? Call us:{" "}
            <strong style={{ color: "#FF6B00" }}>{constants.phone}</strong>
          </p>
        </div>
      </Container>

      <style>{`
        @keyframes pulse-badge {
          0%, 100% { box-shadow: 0 4px 16px rgba(255,107,0,0.35); }
          50% { box-shadow: 0 4px 28px rgba(255,107,0,0.6); }
        }
      `}</style>
    </section>
  );
}
