import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-bgLight">
      <Container>
        <SectionTitle subtitle="What Our Partners Say">Customer Testimonials</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-neutral leading-relaxed mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-dark">{testimonial.name}</h4>
                <p className="text-sm text-neutral">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}