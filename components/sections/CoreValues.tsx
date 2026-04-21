"use client";

import { ShieldCheck, Truck, Award, Leaf, HeartHandshake, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const values = [
  {
    icon: ShieldCheck,
    title: "100% Hygienic",
    desc: "ISO-certified production facility. Every product is made in a safe, clean environment.",
    color: "#FF6B00",
    bg: "#FFF3E0",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    desc: "Made with premium quality ingredients. No artificial shortcuts, only real taste.",
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Reliable distribution across every corner of Pakistan. Place your order and get it delivered on time.",
    color: "#1565C0",
    bg: "#E3F2FD",
  },
  {
    icon: Award,
    title: "Quality Certified",
    desc: "PSQCA-approved manufacturing. Every batch is tested before it leaves our facility.",
    color: "#6A1B9A",
    bg: "#EDE7F6",
  },
  {
    icon: HeartHandshake,
    title: "Retailer Friendly",
    desc: "Competitive wholesale pricing, flexible MOQs, and dedicated account management.",
    color: "#C62828",
    bg: "#FFEBEE",
  },
  {
    icon: Star,
    title: "10+ Years of Trust",
    desc: "Over a decade of experience. Trusted by 1,000+ retailers for our products.",
    color: "#F57F17",
    bg: "#FFFDE7",
  },
];

const trustBadges = [
  { src: "/images/certifications/pk-standards.jpg", label: "PSQCA Certified", alt: "PSQCA", color: "#006738" },
  { src: "/images/certifications/iso.png", label: "ISO Standard", alt: "ISO", color: "#0054A6" },
  { src: "/images/certifications/Halal.png", label: "Halal Certified", alt: "Halal", color: "#2E7D32" },
  { src: "/images/certifications/haccp.png", label: "HACCP Compliant", alt: "HACCP", color: "#D32F2F" },
];

export function CoreValues() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#FFFDF9" }}
    >
      {/* Subtle background texture */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="1.5" fill="#FF6B00" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #FF6B00, #FF8C00)",
              color: "white",
              fontWeight: 700,
              fontSize: "0.78rem",
              padding: "6px 18px",
              borderRadius: "100px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "16px",
            }}
          >
            Why Dornay?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#1A1A1A",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Built on Values,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF6B00, #FFB347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Delivered with Love
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              color: "#666",
              fontSize: "1.05rem",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Our commitment to excellence and tradition ensures you get the best quality in every bite.
          </motion.p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0,0,0,0.06)" }}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "28px",
                  border: `1px solid #F0F0F0`,
                  display: "flex",
                  gap: "18px",
                  alignItems: "flex-start",
                  transition: "border-color 0.2s",
                  cursor: "default",
                }}
              >
                {/* Icon Box */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    minWidth: "52px",
                    background: v.bg,
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon style={{ color: v.color, width: "24px", height: "24px" }} />
                </div>

                {/* Text */}
                <div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: "#1A1A1A",
                      marginBottom: "6px",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      color: "#777",
                      fontSize: "0.88rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FFB347 100%)",
            borderRadius: "32px",
            padding: "32px 40px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            boxShadow: "0 25px 60px rgba(255,107,0,0.2)",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Background decoration */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-40px",
              top: "-40px",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "450px" }}>
            <h3
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "1.9rem",
                fontWeight: 800,
                color: "white",
                marginBottom: "8px",
                lineHeight: 1.2,
              }}
            >
              Certified Excellence
            </h3>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", lineHeight: 1.5 }}>
              Hamare products internationally recognized standards pe khare utarte hain. We never compromise on your health and safety.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px 48px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {trustBadges.map((badge, idx) => (
              <motion.div
                key={badge.alt}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.3 + (idx * 0.1),
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.5
                  }
                }}
                whileHover={{ 
                  scale: 1.1, 
                  transition: { duration: 0.2 }
                }}
                animate={{
                  y: [0, -6, 0],
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  width: "95px",
                  height: "75px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                  padding: "10px",
                  borderRadius: "16px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                }}>
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "white",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    opacity: 1,
                    maxWidth: "90px",
                    lineHeight: 1.3,
                  }}
                >
                  {badge.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
