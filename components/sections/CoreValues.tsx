"use client";

import { ShieldCheck, Truck, Award, Leaf, HeartHandshake, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import Image from "next/image";

const values = [
  {
    icon: ShieldCheck,
    title: "100% Hygienic",
    desc: "ISO-certified production facility. Every product is made in a safe, clean environment.",
    color: "#AF3336",
    bg: "#FFEBEE",
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
              <circle cx="12" cy="12" r="1.5" fill="#AF3336" />
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
              background: "linear-gradient(135deg, #AF3336, #D32F2F)",
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
                background: "linear-gradient(135deg, #AF3336, #E53935)",
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border border-white/20 rounded-[32px] p-6 sm:p-8 md:p-10 lg:px-12 lg:py-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6"
          style={{
            background: "linear-gradient(135deg, #AF3336 0%, #CE1F25 50%, #E53935 100%)",
            boxShadow: "0 25px 60px rgba(175, 51, 54, 0.25)",
          }}
        >
          {/* Background decoration */}
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 w-[180px] h-[180px] rounded-full bg-white/10"
          />

          <div className="relative z-10 max-w-lg text-center lg:text-left">
            <h3
              className="font-serif text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight"
            >
              Certified Excellence
            </h3>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Hamare products internationally recognized standards pe khare utarte hain. We never compromise on your health and safety.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-10 md:gap-x-16 md:gap-y-12 relative z-10 w-full lg:w-auto"
          >
            {trustBadges.map((badge, idx) => (
              <motion.div
                key={badge.alt}
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: idx % 2 === 0 ? -2 : 2 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.2 + (idx * 0.1),
                  duration: 0.6,
                  ease: "easeOut",
                  y: {
                    duration: 4 + idx,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 0,
                  transition: { duration: 0.2 }
                }}
                animate={{
                  y: [0, idx % 2 === 0 ? -8 : -12, 0],
                }}
                className={`flex flex-row items-center gap-4 cursor-pointer group px-2 ${
                  idx % 2 === 1 ? 'translate-y-4 md:translate-y-10' : ''
                }`}
              >
                <div className="relative w-[85px] h-[65px] md:w-[95px] md:h-[75px] flex items-center justify-center bg-white p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow overflow-hidden">
                  <Image
                    src={badge.src}
                    alt={badge.alt}
                    fill
                    className="p-2 object-contain"
                  />
                </div>
                <div
                  className="text-[10px] md:text-[11px] text-white font-extrabold uppercase tracking-wider max-w-[80px] md:max-w-[90px] leading-tight"
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
