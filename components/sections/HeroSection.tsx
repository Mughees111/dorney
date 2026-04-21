"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/helpers";

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  displayOrder: number;
  isFullWidth?: boolean;
}

const defaultSlides: HeroSlide[] = [
  {
    id: "promo-3",
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "/images/3.png",
    imageAlt: "Dornay Premium Banner",
    displayOrder: -1,
    isFullWidth: true,
  },
  {
    id: "1",
    title: "Baked to Perfection",
    subtitle: "Premium Cream Cakes & Cupcakes for Retailers",
    imageUrl: "/images/products/featuredProduct1.png",
    imageAlt: "Assorted premium cakes and cupcakes",
    displayOrder: 0,
  },
  {
    id: "2",
    title: "Crunchy Delights",
    subtitle: "High-Quality Biscuits – Nationwide Supply",
    imageUrl: "/images/products/featuredProduct6.png",
    imageAlt: "Freshly baked biscuits and cookies assortment",
    displayOrder: 1,
  },
  {
    id: "3",
    title: "Sweet Moments",
    subtitle: "Custom & Ready-to-Sell Cakes for Every Occasion",
    imageUrl: "/images/products/featured7.png",
    imageAlt: "Colorful sweet cakes display",
    displayOrder: 2,
  },
  {
    id: "4",
    title: "Creamy Perfection",
    subtitle: "Partner with Pakistan's Trusted FMCG Bakery",
    imageUrl: "/images/products/featured8.png",
    imageAlt: "Elegant creamy layered cakes",
    displayOrder: 3,
  },
];

const mainDescription = "Delicious cakes, cupcakes, biscuits & confectionery made with premium ingredients. Order online for delivery across Pakistan or visit our retailers nationwide.";

export function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const whatsappUrl = getWhatsAppUrl(
    undefined,
    "Hi, I want to place an order / become a distributor"
  );

  useEffect(() => {
    fetch("/api/hero-slides")
      .then((res) => res.ok ? res.json() : null)
      .then((data: any[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => a.displayOrder - b.displayOrder);
          // Check if we already have the promo slide and maintain it
          setSlides([defaultSlides[0], ...sorted]);
        }
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[currentSlide];
  const isFullWidth = slide?.isFullWidth;

  return (
    <section className={`relative flex bg-bgLight overflow-hidden transition-all duration-700 ${
      isFullWidth ? "min-h-[75vh] lg:min-h-screen" : "min-h-[75vh] lg:min-h-screen"
    }`}>
      {/* Background Orbs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-10">
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      {/* Full Width Slider Background */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            {s.isFullWidth ? (
              <div className="relative w-full h-full">
                {/* Desktop View: 1920x1080 (3.png) */}
                <div className="hidden lg:block absolute inset-0 bg-neutral-900">
                  <Image
                    src={s.imageUrl && !["/images/3.png", "/images/1 (2).png", "/images/2 (1).png"].includes(s.imageUrl) ? s.imageUrl : "/images/3.png"}
                    alt={s.imageAlt || "Banner Desktop"}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
                {/* Tablet View: 1080x1350 (2 (1).png) */}
                <div className="hidden md:block lg:hidden absolute inset-0 bg-neutral-900">
                  <Image
                    src={s.imageUrl && !["/images/3.png", "/images/1 (2).png", "/images/2 (1).png"].includes(s.imageUrl) ? s.imageUrl : "/images/2 (1).png"}
                    alt={s.imageAlt || "Banner Tablet"}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
                {/* Mobile View: 570x728 (1 (2).png) */}
                <div className="md:hidden absolute inset-0">
                  <Image
                    src={s.imageUrl && !["/images/3.png", "/images/1 (2).png", "/images/2 (1).png"].includes(s.imageUrl) ? s.imageUrl : "/images/1 (2).png"}
                    alt={s.imageAlt || "Banner Mobile"}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                {/* Overlay to ensure text readability if banner is too bright */}
                <div className="absolute inset-0 bg-black/5" />
              </div>
            ) : (
              <div className="w-full h-full" />
            )}
          </div>
        ))}
      </div>

      <Container className="relative z-20 flex items-center min-h-inherit pb-4 lg:pb-0">
        <div className="w-full py-12 lg:py-0">
          {isFullWidth ? (
            /* Full Width Slide Interaction Area */
            <div className="flex flex-col items-center justify-center text-center animate-fade-in">
              {slide.title && (
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-cookie text-primary leading-tight mb-8">
                  {slide.title}
                </h1>
              )}
              {/* Positioned the button to be perfectly visible on all banners */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4 mt-[35vh] lg:mt-[50vh]">
                <Link href="/products">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto group h-11 lg:h-12 bg-white/50 backdrop-blur-md border-white/60 text-primary-dark hover:bg-primary hover:text-white transition-all shadow-xl font-bold uppercase tracking-wide">
                    <span>View Collection</span>
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Standard 2-Column Hero Layout */
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-center lg:text-left space-y-7 lg:space-y-9 animate-fade-in order-2 lg:order-1 pt-8 lg:pt-0 pb-4 lg:pb-0">
                <div className="inline-block px-4 lg:px-0">
                  <span className="px-3 md:px-5 py-2 md:py-2.5 bg-gradient-primary text-white text-[10px] md:text-sm font-semibold rounded-full uppercase tracking-wider shadow-sm text-center block md:inline-block whitespace-normal md:whitespace-nowrap">
                    Pakistans no 1 international confectionery brand
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-cookie text-primary leading-tight">
                  {slide?.title}
                </h1>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-semibold text-dark">
                  {slide?.subtitle}
                </h2>

                <p className="text-base md:text-lg text-neutral max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  {slide?.description || mainDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start pt-4">
                  <Link href="/products">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto group h-12 text-base px-10">
                      <span>Explore Products</span>
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button href={whatsappUrl} variant="outline" size="lg" className="w-full sm:w-auto group h-12 text-base bg-white/60 border-primary/20 hover:border-primary">
                    Order Now
                  </Button>
                </div>
              </div>

              <div className="relative order-1 lg:order-2 w-full max-w-[550px] lg:max-w-none mx-auto drop-shadow-2xl">
                {/* Standard Slider Container */}
                <div className="overflow-hidden rounded-3xl aspect-[4/3] lg:aspect-square relative w-full">
                  {slides.map((s, index) => !s.isFullWidth && (
                    <Image
                      key={s.id}
                      src={s.imageUrl || "/images/products/featuredProduct1.png"}
                      alt={s.imageAlt || s.title}
                      fill
                      className={`object-contain transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Slider Indicators */}
      <div className={`absolute bottom-2 lg:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-40 transition-all duration-500`}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
              ? "bg-primary scale-125 shadow-md"
              : "bg-neutral/20 hover:bg-primary/40"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 translate-y-1 z-20">
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path
            d="M0 128C120 100 240 80 360 85C480 90 600 110 720 115C840 120 960 110 1080 95C1200 80 1320 90 1440 110V140H0V128Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

