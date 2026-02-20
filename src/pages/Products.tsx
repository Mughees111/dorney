import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle'; 
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categorySlug = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState<string | null>(categorySlug);

  useEffect(() => {
    setActiveCategory(categorySlug);
  }, [categorySlug]);

  // Filter products based on category or show all
  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  // Get current category object if filtered
  const currentCategory = activeCategory
    ? categories.find((cat) => cat.slug === activeCategory)
    : null;

  // Group products by category when showing all
  const productsByCategory = activeCategory
    ? null
    : categories.map((cat) => ({
        ...cat,
        products: products.filter((p) => p.category === cat.slug),
      })).filter((cat) => cat.products.length > 0);

  return (
    <section className="py-12 md:py-20 bg-bgLight min-h-screen mt-2 ">
      <Container>
        {/* Page Title / Category Header */}
        <div className="mb-12 text-center">
          {activeCategory && currentCategory ? (
            <>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cookie text-primary mb-4">
                {currentCategory.name}
              </h1>
              <p className="text-lg md:text-xl text-neutral max-w-3xl mx-auto">
                {currentCategory.description}
              </p>
            </>
          ) : (
            <>
              <SectionTitle subtitle="Explore Our Range">
                All Products
              </SectionTitle>
              <p className="text-lg text-neutral mt-4 max-w-3xl mx-auto">
                Premium cakes, cream cakes, biscuits & more – made with finest ingredients for retailers & distributors across Pakistan.
              </p>
            </>
          )}
        </div>

        {/* When no category selected → Show Category Cards first */}
        {!activeCategory && (
          <div className="mb-20">
            <h2 className="text-3xl font-poppins font-bold text-dark mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white drop-shadow-md">
                        {category.name}
                      </h3>
                      <p className="text-white/90 text-sm mt-1 line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div>
          {activeCategory ? (
            // Single category view
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    category={product.categoryName}
                    image={product.image}
                    description={product.description}
                  />
                ))
              ) : (
                <p className="text-center text-neutral col-span-full py-12">
                  No products found in this category.
                </p>
              )}
            </div>
          ) : (
            // All products grouped by category
            <div className="space-y-16 md:space-y-24">
              {productsByCategory?.map((cat) => (
                <div key={cat.id}>
                  <h2 className="text-3xl sm:text-4xl font-cookie text-primary mb-6 text-center md:text-left">
                    {cat.name}
                  </h2>
                  <p className="text-neutral text-center md:text-left mb-8 max-w-2xl mx-auto md:mx-0">
                    {cat.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {cat.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        name={product.name}
                        category={product.categoryName}
                        image={product.image}
                        description={product.description}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}