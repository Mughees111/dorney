"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
}

const defaultFAQs: FAQ[] = [
  {
    id: "1",
    question: "What products do you manufacture?",
    answer: "We specialize in premium bakery and confectionery products including cakes, cream cakes, biscuits, and various confectionery items. All products are made with high-quality ingredients and strict hygiene standards.",
    category: "general",
    displayOrder: 0,
    isActive: true,
  },
  {
    id: "2",
    question: "Do you offer wholesale pricing?",
    answer: "Yes, we provide competitive wholesale pricing for retailers and distributors. Contact our sales team for pricing details and minimum order quantities.",
    category: "retailer",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "3",
    question: "What is your delivery area?",
    answer: "We deliver across Pakistan with a reliable distribution network covering all major cities including Karachi, Lahore, Islamabad, and more.",
    category: "general",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "4",
    question: "How do you ensure product quality?",
    answer: "Quality is our top priority. We follow strict quality control processes from ingredient selection to final packaging, ensuring consistent taste and freshness.",
    category: "general",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "5",
    question: "Can I become a distributor?",
    answer: "We welcome new distributors. Please contact our sales team to discuss partnership opportunities and requirements.",
    category: "retailer",
    displayOrder: 4,
    isActive: true,
  },
];

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFAQs);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => res.ok ? res.json() : null)
      .then((data: FAQ[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => a.displayOrder - b.displayOrder);
          setFaqs(sorted);
        }
      })
      .catch(() => {});
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle subtitle="Frequently Asked Questions">Have Questions?</SectionTitle>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border border-neutral/30 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 bg-bgLight hover:bg-bgLight/80 transition-colors flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-dark">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white">
                  <p className="text-neutral leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}