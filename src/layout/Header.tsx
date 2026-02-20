import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import { navLinks } from '../data/navLinks';
import { categories } from '../data/categories';
import logo from '../assets/images/dornyLogo.png'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  }, [location]);

  const whatsappNumber = '923001234567';
  const message = 'Hi, I want to place an order';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"> */}
              <img src={logo} alt="Dorney Logo" className="w-18 h-16" />

            {/* </div> */}
            {/* <div> */}
              {/* <div className="font-poppins font-bold text-xl text-dark">Dorney</div> */}
              {/* <div className="text-xs text-neutral -mt-1">Premium FMCG</div> */}
            {/* </div> */}
          </Link>

          <nav className="hidden lg:flex items-center space-x-8 font-poppins">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                      className={`flex items-center space-x-1 font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'text-primary'
                          : 'text-dark hover:text-primary'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/products?category=${category.slug}`}
                          className="block px-6 py-3 text-dark hover:bg-bgLight hover:text-primary transition-colors"
                        >
                          <div className="font-semibold">{category.name}</div>
                          <div className="text-sm text-neutral">{category.description}</div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary'
                        : 'text-dark hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href={whatsappUrl} variant="primary" size="sm" className="uppercase">
              Order Now
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-dark"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 font-poppins">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className="flex items-center justify-between w-full font-medium text-dark hover:text-primary transition-colors"
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isProductsOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isProductsOpen && (
                        <div className="mt-2 ml-4 space-y-2">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/products?category=${category.slug}`}
                              className="block py-2 text-neutral hover:text-primary transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'text-primary'
                          : 'text-dark hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Button href={whatsappUrl} variant="primary" size="md" className="uppercase w-full">
                Order Now
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
