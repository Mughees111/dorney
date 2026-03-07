"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }
    fetch("/api/admin/me", { credentials: "include" })
      .then((res) => {
        setAuthChecked(true);
        if (!res.ok) {
          setIsAuth(false);
          router.replace("/admin/login");
        } else {
          setIsAuth(true);
        }
      })
      .catch(() => {
        setAuthChecked(true);
        router.replace("/admin/login");
      });
  }, [isLoginPage, pathname, router]);

  if (!authChecked && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;

  if (!isAuth) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="font-bold text-primary">
                Dornay Admin
              </Link>
              {/* Desktop Menu */}
              <div className="hidden md:flex gap-4">
                <Link
                  href="/admin"
                  className={`text-sm font-medium ${
                    pathname === "/admin" ? "text-primary" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/products"
                  className={`text-sm font-medium ${
                    pathname?.startsWith("/admin/products")
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Products
                </Link>
                <Link
                  href="/admin/categories"
                  className={`text-sm font-medium ${
                    pathname?.startsWith("/admin/categories")
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Categories
                </Link>
                <Link
                  href="/admin/hero"
                  className={`text-sm font-medium ${
                    pathname?.startsWith("/admin/hero")
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Hero Slides
                </Link>
                <Link
                  href="/admin/flash-deals"
                  className={`text-sm font-medium ${
                    pathname?.startsWith("/admin/flash-deals")
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Flash Deals
                </Link>
                <Link
                  href="/admin/faqs"
                  className={`text-sm font-medium ${
                    pathname?.startsWith("/admin/faqs")
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  FAQs
                </Link>
                <Link
                  href="/admin/orders"
                  className={`text-sm font-medium ${
                    pathname?.startsWith("/admin/orders")
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Orders
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                View Site
              </Link>
              <button
                onClick={async () => {
                  await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
                  router.replace("/admin/login");
                }}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 pt-2 pb-3 space-y-1 sm:px-6">
              <Link
                href="/admin"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname === "/admin"
                    ? "text-primary bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname?.startsWith("/admin/products")
                    ? "text-primary bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/admin/categories"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname?.startsWith("/admin/categories")
                    ? "text-primary bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/admin/hero"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname?.startsWith("/admin/hero")
                    ? "text-primary bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Hero Slides
              </Link>
              <Link
                href="/admin/flash-deals"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname?.startsWith("/admin/flash-deals")
                    ? "text-primary bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Flash Deals
              </Link>
              <Link
                href="/admin/faqs"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname?.startsWith("/admin/faqs")
                    ? "text-primary bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </Link>
              <Link
                href="/admin/orders"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname?.startsWith("/admin/orders")
                    ? "text-primary bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Orders
              </Link>
            </div>
          </div>
        )}
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}