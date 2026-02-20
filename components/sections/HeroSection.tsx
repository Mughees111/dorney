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
}

const defaultSlides: HeroSlide[] = [
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
      .then((data: HeroSlide[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => a.displayOrder - b.displayOrder);
          setSlides(sorted);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[currentSlide];
  const imageSrc = slide?.imageUrl || "/images/products/featuredProduct1.png";
  const imageAlt = slide?.imageAlt || "Dorney bakery products";

  return (
    <section className="relative min-h-screen flex items-center bg-bgLight overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-block mt-20">
              <span className="px-5 py-2.5 bg-gradient-primary text-white text-sm font-semibold rounded-full uppercase tracking-wider shadow-sm">
                Premium FMCG Bakery
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-cookie text-primary leading-tight">
              {slide?.title ?? defaultSlides[0].title}
            </h1>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-semibold text-dark">
              {slide?.subtitle ?? defaultSlides[0].subtitle}
            </h2>

            <p className="text-lg text-neutral max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Manufacturing premium sweet cakes, creamy cakes, cupcakes & biscuits
              with finest ingredients. Trusted partner for distributors &
              retailers across Pakistan – consistent quality & reliable delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <Link href="/products">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button href={whatsappUrl} variant="outline" size="lg" className="w-full sm:w-auto">
                Order / Become Distributor
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl aspect-[4/3] lg:aspect-square relative">
              {slides.map((s, index) => (
                <Image
                  key={s.id}
                  src={s.imageUrl || "/images/products/featuredProduct1.png"}
                  alt={s.imageAlt || s.title}
                  fill
                  className={`object-contain transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
              ))}
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125 shadow-lg"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 translate-y-1">
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
