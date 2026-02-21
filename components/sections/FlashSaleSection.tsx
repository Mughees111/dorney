"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, Clock, ArrowRight, Tag, Flame } from "lucide-react";
import { Container } from "@/components/ui/Container";

// Countdown timer hook
function useCountdown(targetHours = 8) {
  const [time, setTime] = useState({ h: targetHours, m: 0, s: 0 });

  useEffect(() => {
    const end = Date.now() + targetHours * 60 * 60 * 1000;
    const tick = setInterval(() => {
      const diff = Math.max(0, end - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ h, m, s });
      if (diff === 0) clearInterval(tick);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return time;
}

const deals = [
  {
    id: 1,
    name: "Cream Cupcakes",
    subtitle: "Vanilla & Chocolate Mix",
    originalPrice: 250,
    salePrice: 175,
    discount: 30,
    emoji: "🧁",
    tag: "Best Seller",
    bgColor: "#FFF3E0",
    accentColor: "#FF6B00",
  },
  {
    id: 2,
    name: "Lollipop Bucket",
    subtitle: "Mixed Flavors — 50pcs",
    originalPrice: 500,
    salePrice: 350,
    discount: 30,
    emoji: "🍭",
    tag: "Bulk Deal",
    bgColor: "#FCE4EC",
    accentColor: "#E91E63",
  },
  {
    id: 3,
    name: "Candy Mix Pack",
    subtitle: "Assorted Flavors — 100pcs",
    originalPrice: 400,
    salePrice: 299,
    discount: 25,
    emoji: "🍬",
    tag: "Hot Deal",
    bgColor: "#E8F5E9",
    accentColor: "#2E7D32",
  },
  {
    id: 4,
    name: "Mini Donuts Box",
    subtitle: "Glazed & Sprinkled — 12pcs",
    originalPrice: 320,
    salePrice: 220,
    discount: 31,
    emoji: "🍩",
    tag: "New Arrival",
    bgColor: "#EDE7F6",
    accentColor: "#6A1B9A",
  },
];

export function FlashSaleSection() {
  const { h, m, s } = useCountdown(8);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "#FFF8F0" }}
    >
      {/* Background decoration */}
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
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div>
            {/* Flash label */}
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

          {/* Countdown Timer */}
          {/* <div
            style={{
              background: "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)",
              borderRadius: "20px",
              padding: "20px 28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              minWidth: "260px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Sale Ends In
              </span>
            </div>
            <div className="flex items-center gap-3">
              {[pad(h), pad(m), pad(s)].map((val, i) => (
                <>
                  <div
                    key={i}
                    style={{
                      background: "#FF6B00",
                      color: "white",
                      borderRadius: "10px",
                      padding: "8px 14px",
                      fontFamily: "'Courier New', monospace",
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      lineHeight: 1,
                      minWidth: "60px",
                      textAlign: "center",
                    }}
                  >
                    {val}
                  </div>
                  {i < 2 && (
                    <span
                      style={{
                        color: "#FF6B00",
                        fontSize: "1.8rem",
                        fontWeight: 700,
                      }}
                    >
                      :
                    </span>
                  )}
                </>
              ))}
            </div>
            <div className="flex gap-6">
              {["Hours", "Mins", "Secs"].map((label) => (
                <span
                  key={label}
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div> */}
        </div>

        {/* Deal Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {deals.map((deal) => (
            <div
              key={deal.id}
              style={{
                background: deal.bgColor,
                borderRadius: "24px",
                padding: "24px",
                border: "2px solid transparent",
                transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 20px 48px rgba(0,0,0,0.12)";
                el.style.borderColor = deal.accentColor;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = "transparent";
              }}
            >
              {/* Discount Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: deal.accentColor,
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  padding: "4px 10px",
                  borderRadius: "100px",
                }}
              >
                -{deal.discount}%
              </div>

              {/* Tag */}
              <div className="flex items-center gap-1 mb-3">
                <Tag className="w-3 h-3" style={{ color: deal.accentColor }} />
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: deal.accentColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {deal.tag}
                </span>
              </div>

              {/* Emoji */}
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "12px",
                  lineHeight: 1,
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                }}
              >
                {deal.emoji}
              </div>

              {/* Product info */}
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
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#666",
                  marginBottom: "16px",
                }}
              >
                {deal.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: deal.accentColor,
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

              {/* CTA */}
              <Link href="/products">
                <button
                  style={{
                    width: "100%",
                    background: deal.accentColor,
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
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.opacity = "0.85")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.opacity = "1")
                  }
                >
                  <Flame className="w-4 h-4" />
                  Grab This Deal
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link href="/products">
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #FF6B00, #FF8C00)",
                color: "white",
                fontWeight: 700,
                fontSize: "1.05rem",
                padding: "16px 36px",
                borderRadius: "100px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(255,107,0,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(255,107,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(255,107,0,0.35)";
              }}
            >
              Ready for a Creamy Treat? Let&apos;s Shop! 🛒
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p style={{ color: "#999", marginTop: "12px", fontSize: "0.85rem" }}>
            Bulk orders? Call us: <strong style={{ color: "#FF6B00" }}>0300-1234567</strong>
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
