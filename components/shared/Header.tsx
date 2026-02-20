"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { categories } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/helpers";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products", hasDropdown: true },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const whatsappUrl = getWhatsAppUrl(
    undefined,
    "Hi, I want to place an order"
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/dornyLogo.png"
              alt="Dorney Logo"
              width={72}
              height={64}
              className="w-[72px] h-16"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8 font-poppins">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                      className={`flex items-center space-x-1 font-medium transition-colors ${
                        pathname === link.path
                          ? "text-primary"
                          : "text-dark hover:text-primary"
                      }`}
                      aria-expanded={isProductsOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="block px-6 py-3 text-dark hover:bg-bgLight hover:text-primary transition-colors"
                        >
                          <div className="font-semibold">{category.name}</div>
                          <div className="text-sm text-neutral line-clamp-2">
                            {category.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.path}
                    className={`font-medium transition-colors ${
                      pathname === link.path
                        ? "text-primary"
                        : "text-dark hover:text-primary"
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
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
                            isProductsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isProductsOpen && (
                        <div className="mt-2 ml-4 space-y-2">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/category/${category.slug}`}
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
                      href={link.path}
                      className={`block font-medium transition-colors ${
                        pathname === link.path
                          ? "text-primary"
                          : "text-dark hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Button
                href={whatsappUrl}
                variant="primary"
                size="md"
                className="uppercase w-full"
              >
                Order Now
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
