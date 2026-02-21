import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CoreValues } from "@/components/sections/CoreValues";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { ManufacturingProcess } from "@/components/sections/ManufacturingProcess";
import { TrustSection } from "@/components/sections/TrustSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FAQSection } from "@/components/sections/FAQSection";
import type { Metadata } from "next";
import { FlashSaleSection } from "@/components/sections/FlashSaleSection";

export const metadata: Metadata = {
  title: "Premium FMCG Manufacturer | Bakery & Confectionery - Dorney",
  description:
    "Leading FMCG bakery and confectionery manufacturer in Pakistan. Quality cakes, cream cakes, and biscuits for retailers nationwide. Competitive wholesale prices and reliable delivery.",
  keywords: [
    "FMCG manufacturer Pakistan",
    "bakery products wholesale",
    "confectionery supplier",
    "cakes manufacturer",
    "biscuits wholesale",
    "cream cakes supplier",
  ],
  openGraph: {
    title: "Premium FMCG Manufacturer | Bakery & Confectionery - Dorney",
    description:
      "Leading FMCG bakery and confectionery manufacturer in Pakistan.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FlashSaleSection />
      <ProductCategories />
      <FeaturedProducts />
      <CoreValues />
      <ManufacturingProcess />
      <TrustSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
      {/* <AboutPreview /> */}
      <FAQSection />
    </>
  );
}
