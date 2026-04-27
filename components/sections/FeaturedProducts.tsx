"use client";

import { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products as fallbackProducts } from "@/lib/data";
import type { ApiProduct } from "@/lib/api";



export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    check(); // initial check
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
};


const MARQUEE_HEADLINE = "DORNAY FOODS";

/** ~Swiper margin between slides (EBM uses ~10px) */
const GAP_MOBILE = 8;
const GAP_DESKTOP = 10;

/** First-version motion feel */
const CAROUSEL_EASE = [0.22, 1, 0.36, 1] as const;
const CAROUSEL_TWEEN = {
  type: "tween" as const,
  duration: 0.58,
  ease: CAROUSEL_EASE,
};

const AUTO_ADVANCE_MS = 4000;

type ProductItem = ApiProduct | (typeof fallbackProducts)[0];

type SlotDims = { sideW: number; centerW: number; gap: number };

function productImage(p: ProductItem): string {
  const img = (p as { image?: string | null }).image;
  return img && img.length > 0 ? img : "/images/products/featuredProduct1.png";
}

function productAlt(p: ProductItem): string {
  return (p as { imageAlt?: string | null }).imageAlt ?? p.name;
}

/**
 * Fixed sizing to match image exactly:
 * Center image: 280px (mobile) / 360px (desktop)
 * Side images: 200px (mobile) / 260px (desktop)
 */
function measureSlots(containerWidth: number, isNarrow: boolean): SlotDims {
  const gap = isNarrow ? GAP_MOBILE : GAP_DESKTOP;
  if (isNarrow) {
    const centerW = 280;
    const sideW = 200;
    return { sideW, centerW, gap };
  }
  const centerW = 360;
  const sideW = 260;
  return { sideW, centerW, gap };
}

function computeTrackX(
  cw: number,
  activeIndex: number,
  length: number,
  d: SlotDims
): number {
  if (length === 0 || cw <= 0) return 0;
  const idx = Math.min(Math.max(0, activeIndex), length - 1);
  let left = 0;
  for (let i = 0; i < idx; i++) {
    left += d.sideW + d.gap;
  }
  return cw / 2 - (left + d.centerW / 2);
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<ProductItem[]>(fallbackProducts);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dims, setDims] = useState<SlotDims>({
    sideW: 200,
    centerW: 280,
    gap: GAP_MOBILE,
  });
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isNarrow, setIsNarrow] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const activeIndexRef = useRef(0);
  const prevLenRef = useRef(products.length);

  const isMobile = useIsMobile();


  activeIndexRef.current = activeIndex;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ApiProduct[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const featuredAndActive = data.filter(
            (p) =>
              (p as { featured?: boolean; isActive?: boolean }).featured === true &&
              (p as { isActive?: boolean }).isActive !== false
          );
          const source = featuredAndActive.length > 0 ? featuredAndActive : data;
          setProducts(source);
        }
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(0, products.length - 1)));
  }, [products.length]);

  const getTargetX = useCallback(() => {
    const el = containerRef.current;
    if (!el || products.length === 0) return 0;
    return computeTrackX(
      el.offsetWidth,
      activeIndex,
      products.length,
      dims
    );
  }, [activeIndex, products.length, dims]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || products.length === 0) return;
    const d = measureSlots(el.offsetWidth, isNarrow);
    setDims(d);
    x.set(
      computeTrackX(el.offsetWidth, activeIndexRef.current, products.length, d)
    );
  }, [products.length, isNarrow, x]);

  useEffect(() => {
    const target = getTargetX();
    const lenChanged = prevLenRef.current !== products.length;
    prevLenRef.current = products.length;
    if (lenChanged) {
      x.set(target);
      return;
    }
    const ctrl = animate(x, target, CAROUSEL_TWEEN);
    return () => ctrl.stop();
  }, [activeIndex, dims.sideW, dims.centerW, dims.gap, products.length, getTargetX, x]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const cw = el.offsetWidth;
      if (cw <= 0) return;
      const narrow = window.matchMedia("(max-width: 767px)").matches;
      setIsNarrow(narrow);
      setDims(measureSlots(cw, narrow));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (products.length <= 1 || paused || reducedMotion) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1 >= products.length ? 0 : i + 1));
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [products.length, paused, reducedMotion]);

  const go = (dir: -1 | 1) => {
    setActiveIndex((i) => {
      const next = i + dir;
      if (next < 0) return products.length - 1;
      if (next >= products.length) return 0;
      return next;
    });
  };

  const slotTransition = {
    type: "tween" as const,
    duration: 0.55,
    ease: CAROUSEL_EASE,
  };

  // Larger headline text - increased height so it extends downward
  // Slower animation speed
  const marqueeSpans = Array.from({ length: 8 }, (_, i) => (
    <span
      key={i}
      className="shrink-0 px-6 font-poppins font-black leading-none tracking-tight text-transparent md:px-10"
      style={{
        fontSize: "clamp(7rem, 18vw, 12rem)",
        WebkitTextStroke: "2px rgba(139, 92, 246, 0.38)",
        lineHeight: "1",
        marginTop: isMobile ? "50px" : "0px",

      }}
    >
      {MARQUEE_HEADLINE}
    </span>
  ));

  if (products.length === 0) return null;

  const { sideW, centerW, gap } = dims;
  const safeActive = Math.min(Math.max(0, activeIndex), products.length - 1);

  return (
    <section
      className="relative overflow-x-hidden overflow-y-visible bg-white"
      style={{ paddingTop: "5rem", paddingBottom: "4rem" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}

    >
      {/* ── Marquee: stays ABOVE images, just larger font so it extends down ── */}
      <div

        className="pointer-events-none absolute inset-x-0 top-0 z-[1] select-none overflow-hidden  "
        aria-hidden
      >
        <div className="opacity-[4.28] sm:opacity-[4.32] md:opacity-[4.38]">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <div className="flex shrink-0">{marqueeSpans}</div>
            <div className="flex shrink-0" aria-hidden>{marqueeSpans}</div>
          </motion.div>
        </div>
      </div>

      {/* ── Carousel - NO fixed heights anywhere ── */}
      <div
        className="relative z-[3] w-screen max-w-[100vw] -translate-x-1/2 left-1/2"
        style={{ marginTop: "2rem" }}
      >
        <div
          ref={containerRef}
          className="w-full overflow-x-hidden overflow-y-visible px-0"
        >
          <motion.div
            className="flex items-center"
            style={{ x, columnGap: gap }}
          >
            {products.map((product, i) => {
              const isCenter = i === safeActive;
              const dist = Math.abs(i - safeActive);
              const slotW = isCenter ? centerW : sideW;
              const zIndex = dist === 0 ? 30 : dist === 1 ? 20 : 10;

              return (
                <motion.div
                  key={product.id}
                  className="flex shrink-0 items-center justify-center will-change-transform"
                  animate={{ width: slotW }}
                  transition={slotTransition}
                  style={{ zIndex }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative block"
                    style={{
                      width: slotW,
                      height: slotW,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={productImage(product)}
                        alt={productAlt(product)}
                        fill
                        // className="object-contain"
                        style={{
                          borderRadius: "24px",
                        }}
                        sizes="(max-width: 768px) 280px, 360px"
                        priority={i === 0}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-10 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-dark shadow-md transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            aria-label="Previous product"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-dark shadow-md transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            aria-label="Next product"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}