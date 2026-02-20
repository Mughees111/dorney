import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/helpers";

export function CTASection() {
  const whatsappUrl = getWhatsAppUrl(
    undefined,
    "Hi, I want to stock your products in my store / discuss wholesale partnership"
  );

  return (
    <section className="py-20 md:py-28 bg-gradient-cta relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/5 via-transparent to-primary/5" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-cookie text-white mb-6 leading-tight">
            Ready to Partner with Dorney?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful retailers across Pakistan who rely on
            our premium cakes, cream cakes, biscuits & confectionery. Enjoy
            consistent quality, competitive wholesale pricing, and reliable
            nationwide delivery.
          </p>
          <Button
            href={whatsappUrl}
            variant="outline"
            size="xl"
            className="bg-white/10 backdrop-blur-sm border-2 border-gold text-white hover:bg-gold hover:text-charcoal transition-all duration-300 px-10 py-6 font-semibold uppercase tracking-wide group shadow-lg"
          >
            <MessageCircle className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform" />
            Stock & Partner on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
