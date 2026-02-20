import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import { stats } from "@/lib/data";

export function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-trust relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 md:left-20 w-64 md:w-96 h-64 md:h-96 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-10 right-10 md:right-20 w-80 md:w-96 h-80 md:h-96 bg-gold/10 rounded-full blur-3xl animate-glow-pulse" />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-cookie text-white mb-4 tracking-tight">
            Trusted Across Pakistan
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Real numbers that reflect our dedication to quality, reliability, and
            retailer success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              number={stat.number}
              label={stat.label}
              description={stat.description}
              className="animate-count-up"
              style={{ animationDelay: `${index * 150}ms` }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
