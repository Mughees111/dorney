import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import { categories } from '../../data/categories';

export default function ProductCategories() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCategories =
    activeFilter === 'all'
      ? categories
      : categories.filter((cat) => cat.slug === activeFilter);

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle subtitle="Explore Our Range">
          Product Categories
        </SectionTitle>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-gradient-primary text-white shadow-lg'
                : 'bg-gray-100 text-dark hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.slug)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category.slug
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-gray-100 text-dark hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-200 mb-3">{category.description}</p>
                <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
