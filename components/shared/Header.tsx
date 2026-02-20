"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { categories as mockCategories } from "@/lib/data";
import type { ApiCategory } from "@/lib/api";
import { getWhatsAppUrl } from "@/lib/helpers";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products", hasDropdown: true },
  { name: "Contact", path: "/contact" },
];

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>(mockCategories);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ApiCategory[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setCategories(
            data.map((c) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              description: c.description ?? null,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

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

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-dark hover:text-primary transition-colors"
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
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
              <Link href="/cart" className="flex items-center justify-center gap-2 py-2 font-medium text-dark hover:text-primary">
                <ShoppingCart className="w-5 h-5" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
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
