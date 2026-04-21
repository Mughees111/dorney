"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { manufacturingSteps } from "@/lib/data";
import { motion } from "framer-motion";

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

  const colors = [
    "from-orange-400 to-orange-600",
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-yellow-600",
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#FFFDF9]">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
              The Journey of Quality
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight leading-tight">
              Our <span className="text-primary">Delicious</span> Process
            </h2>
            <p className="text-neutral mt-4 text-lg">
              Every bite of Dornay is crafted with secret techniques, modern tech, and a whole lot of love.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 bg-white border border-neutral-100 rounded-2xl shadow-sm flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 bg-white border border-neutral-100 rounded-2xl shadow-sm flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto overflow-y-visible scrollbar-hide scroll-smooth pb-12 pt-4 px-4 -mx-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {manufacturingSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="flex-shrink-0 w-[320px] bg-white rounded-[2.5rem] p-8 shadow-xl shadow-neutral-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-neutral-100 relative group overflow-hidden"
              >
                {/* Step number badge */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colors[index % colors.length]} opacity-5 rounded-bl-[4rem] group-hover:opacity-10 transition-opacity`} />
                <div className={`absolute top-6 right-8 w-12 h-12 bg-gradient-to-br ${colors[index % colors.length]} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg rotate-3 group-hover:rotate-12 transition-transform duration-500`}>
                  {index + 1}
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div>
                    <span className="text-primary/60 font-bold text-xs uppercase tracking-widest mb-4 block">
                      {step.step}
                    </span>
                    <h3 className="text-2xl font-bold text-dark mb-4 pr-12 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <div className={`w-12 h-1 bg-gradient-to-r ${colors[index % colors.length]} rounded-full mb-6 group-hover:w-20 transition-all duration-500`} />
                  </div>
                  <p className="text-neutral/80 leading-relaxed font-poppins mb-6 flex-grow text-[1.05rem]">
                    {step.description}
                  </p>
                  
                  {/* Subtle decorative dot */}
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${colors[index % colors.length]} opacity-20`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

