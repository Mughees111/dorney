"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { manufacturingSteps } from "@/lib/data";

export function ManufacturingProcess() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-bgLight to-white">
      <Container>
        <SectionTitle subtitle="Our Process">
          Manufacturing Excellence
        </SectionTitle>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-visible scrollbar-hide scroll-smooth pb-4 pt-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {manufacturingSteps.map((step, index) => (
              <div
                key={step.id}
                className="flex-shrink-0 w-80 bg-white rounded-xl pt-12 pb-6 px-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative"
              >
                <div className="absolute -top-6 left-6 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>

                <div>
                  <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-dark mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < manufacturingSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-secondary">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </Container>
    </section>
  );
}
