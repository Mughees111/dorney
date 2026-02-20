import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import Button from '../Button';
import featuredProduct1 from '../../assets/images/featuredProduct1.png';
import featuredProduct2 from '../../assets/images/featuredProduct2.png';
import featuredProduct3 from '../../assets/images/featuredProduct3.png';
import featuredProduct4 from '../../assets/images/featuredProduct4.png';
import featuredProduct5 from '../../assets/images/featuredProduct5.png';
import featuredProduct6 from '../../assets/images/featuredProduct6.png';
import featuredProduct7 from '../../assets/images/featured7.png';
import featuredProduct8 from '../../assets/images/featured8.png';

const slides = [
  {
    image: featuredProduct1,
    alt: 'Assorted premium cakes and cupcakes',
    title: 'Baked to Perfection',
    subtitle: 'Premium Cream Cakes & Cupcakes for Retailers',
  },
  {
    image: featuredProduct6,
    alt: 'Freshly baked biscuits and cookies assortment',
    title: 'Crunchy Delights',
    subtitle: 'High-Quality Biscuits – Nationwide Supply',
  },
  {
    image: featuredProduct7,
    alt: 'Colorful sweet cakes display',
    title: 'Sweet Moments',
    subtitle: 'Custom & Ready-to-Sell Cakes for Every Occasion',
  },
  {
    image: featuredProduct8,
    alt: 'Elegant creamy layered cakes',
    title: 'Creamy Perfection',
    subtitle: 'Partner with Pakistan’s Trusted FMCG Bakery',
  },
];

// const slides = [
//   {
//     image: featuredProduct1,
//     alt: 'Assorted premium cakes and cupcakes',
//     title: 'Baked to Perfection',
//     subtitle: 'Premium Cream Cakes & Cupcakes for Retailers',
//   },
//   {
//     image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     alt: 'Freshly baked biscuits and cookies assortment',
//     title: 'Crunchy Delights',
//     subtitle: 'High-Quality Biscuits – Nationwide Supply',
//   },
//   {
//     image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     alt: 'Colorful sweet cakes display',
//     title: 'Sweet Moments',
//     subtitle: 'Custom & Ready-to-Sell Cakes for Every Occasion',
//   },
//   {
//     image: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     alt: 'Elegant creamy layered cakes',
//     title: 'Creamy Perfection',
//     subtitle: 'Partner with Pakistan’s Trusted FMCG Bakery',
//   },
// ];

export default function HeroSection() {
  const whatsappNumber = '923001234567';
  const message = 'Hi, I want to place an order / become a distributor';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10500); // change slide every 5.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-bgLight overflow-hidden">
      {/* Subtle blurred orbs for depth */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            {/* <div className="inline-block">
              <span className="px-5 py-2.5 bg-gradient-primary text-white text-sm font-semibold rounded-full uppercase tracking-wider shadow-sm">
                Premium FMCG Bakery
              </span>
            </div> */}
            <div className="inline-block mt-20">
              <span className="px-5 py-2.5 bg-gradient-primary text-white text-sm font-semibold rounded-full uppercase tracking-wider shadow-sm">
                Premium FMCG Bakery
              </span>
            </div>


            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-cookie text-primary leading-tight">
              {slides[currentSlide].title}
            </h1>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-semibold text-dark">
              {slides[currentSlide].subtitle}
            </h2>

            <p className="text-lg text-neutral max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Manufacturing premium sweet cakes, creamy cakes, cupcakes & biscuits with finest ingredients.
              Trusted partner for distributors & retailers across Pakistan – consistent quality & reliable delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <Link to="/products">
                <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button href={whatsappUrl} variant="outline" size="lg" className="w-full sm:w-auto">
                Order / Become Distributor
              </Button>
            </div>
          </div>

          {/* Right - Slider */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl  aspect-[4/3] lg:aspect-square ">
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide.image}
                  alt={slide.alt}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                />

              ))}
              {/* Subtle overlay gradient for text readability if needed in future */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40"></div> */}
            </div>

            {/* Simple dots indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-white scale-125 shadow-lg'
                    : 'bg-white/50 hover:bg-white/80'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom wave curve – visible on white bg */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1">
        <svg viewBox="0 0 1440 140" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 128C120 100 240 80 360 85C480 90 600 110 720 115C840 120 960 110 1080 95C1200 80 1320 90 1440 110V140H0V128Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}