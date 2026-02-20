import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container';
import Button from '../Button';

export default function AboutPreview() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Modern bakery facility"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-secondary rounded-2xl -z-10"></div>
          </div>

          <div>
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-dark mt-3 mb-6">
              Pakistan's Premier FMCG Manufacturer
            </h2>
            <p className="text-lg text-neutral leading-relaxed mb-4">
              With over a decade of experience, we have established ourselves as a leading manufacturer
              of premium bakery and confectionery products in Pakistan. Our commitment to quality,
              hygiene, and customer satisfaction has made us the preferred choice for retailers nationwide.
            </p>
            <p className="text-lg text-neutral leading-relaxed mb-8">
              From our state-of-the-art production facilities to our dedicated distribution network,
              every aspect of our operation is designed to deliver excellence. We combine traditional
              recipes with modern manufacturing techniques to create products that delight customers
              and drive sales for our retail partners.
            </p>
            <Link to="/about">
              <Button variant="primary" size="lg" className="inline-flex items-center">
                <span>Learn More About Us</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
