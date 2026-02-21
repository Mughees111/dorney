import SEO from '../components/SEO';
import HeroSection from '../components/sections/HeroSection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import CoreValues from '../components/sections/CoreValues';
import ProductCategories from '../components/sections/ProductCategories';
import ManufacturingProcess from '../components/sections/ManufacturingProcess';
import TrustSection from '../components/sections/TrustSection';
import CTASection from '../components/sections/CTASection';
import AboutPreview from '../components/sections/AboutPreview';

export default function Home() {
  return (
    <>
      <SEO
        title="Premium FMCG Manufacturer | Bakery & Confectionery - Dornay"
        description="Leading FMCG bakery and confectionery manufacturer in Pakistan. Quality cakes, cream cakes, and biscuits for retailers nationwide. Competitive wholesale prices and reliable delivery."
        keywords="FMCG manufacturer Pakistan, bakery products wholesale, confectionery supplier, cakes manufacturer, biscuits wholesale, cream cakes supplier"
      />
      <HeroSection />
      <FeaturedProducts />
      <CoreValues />
      <ProductCategories />
      <ManufacturingProcess />
      <TrustSection />
      <CTASection />
      <AboutPreview />
    </>
  );
}
