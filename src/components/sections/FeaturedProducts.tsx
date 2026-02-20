import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import ProductCard from '../ProductCard';
import { products } from '../../data/products';

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const featuredProducts = products.filter((product) => product.featured);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle subtitle="Our Bestsellers">
          Featured Products
        </SectionTitle>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <ProductCard
                  name={product.name}
                  category={product.categoryName}
                  image={product.image}
                  description={product.description}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </Container>
    </section>
  );
}
