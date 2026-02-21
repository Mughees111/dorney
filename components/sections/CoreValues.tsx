import { ShieldCheck, Truck, Award, Leaf, HeartHandshake, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";

const values = [
  {
    icon: ShieldCheck,
    title: "100% Hygienic",
    desc: "ISO-certified production facility. Har product safe, clean environment mein banta hai.",
    color: "#FF6B00",
    bg: "#FFF3E0",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    desc: "Premium quality ingredients ka use. No artificial shortcuts — sirf real taste.",
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Pakistan ke har corner mein reliable distribution. Order karo, time pe milega.",
    color: "#1565C0",
    bg: "#E3F2FD",
  },
  {
    icon: Award,
    title: "Quality Certified",
    desc: "PSQCA approved manufacturing. Every batch tested before it leaves our facility.",
    color: "#6A1B9A",
    bg: "#EDE7F6",
  },
  {
    icon: HeartHandshake,
    title: "Retailer Friendly",
    desc: "Competitive wholesale prices, flexible MOQs, aur dedicated account management.",
    color: "#C62828",
    bg: "#FFEBEE",
  },
  {
    icon: Star,
    title: "10+ Years of Trust",
    desc: "Ek decade se zyada ka experience. 1000+ retailers ka bharosa hamare products pe.",
    color: "#F57F17",
    bg: "#FFFDE7",
  },
];

const trustBadges = [
  { value: "PSQCA", label: "Certified" },
  { value: "ISO", label: "Standard" },
  { value: "Halal", label: "Certified" },
  { value: "HACCP", label: "Compliant" },
];

export function CoreValues() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#FFFDF9" }}
    >
      {/* Subtle background texture */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
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
          <span
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
            Why Dorney?
          </span>
          <h2
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
          </h2>
          <p
            style={{
              color: "#666",
              fontSize: "1.05rem",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Pakistan mein trusted manufacturer ban'ne ki wajah sirf yahi hai — har cheez mein quality, har baar.
          </p>
        </div>

        {/* Values Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "64px",
          }}
        >
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "28px",
                  border: `1px solid #F0F0F0`,
                  display: "flex",
                  gap: "18px",
                  alignItems: "flex-start",
                  transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                  cursor: "default",
                }}
                // onMouseEnter={(e) => {
                //   const el = e.currentTarget;
                //   el.style.transform = "translateY(-4px)";
                //   el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.09)";
                //   el.style.borderColor = v.color;
                // }}
                // onMouseLeave={(e) => {
                //   const el = e.currentTarget;
                //   el.style.transform = "translateY(0)";
                //   el.style.boxShadow = "none";
                //   el.style.borderColor = "#F0F0F0";
                // }}
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
              </div>
            );
          })}
        </div>

        {/* Trust Strip */}
        <div
          style={{
            background: "linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FFB347 100%)",
            borderRadius: "24px",
            padding: "40px 32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            boxShadow: "0 20px 60px rgba(255,107,0,0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background decoration */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-40px",
              top: "-40px",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />

          <div style={{ position: "relative" }}>
            <h3
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "white",
                marginBottom: "6px",
              }}
            >
              Certifications &amp; Standards
            </h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem" }}>
              Hamare products internationally recognized standards pe khare utarte hain.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.value}
                style={{
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderRadius: "16px",
                  padding: "16px 24px",
                  textAlign: "center",
                  minWidth: "90px",
                }}
              >
                <div
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "white",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {badge.value}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.8)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: "2px",
                  }}
                >
                  {badge.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
