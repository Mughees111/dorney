import type { Metadata } from "next";
import { Poppins, Cookie, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const cookie = Cookie({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cookie",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dornyfood.com"
  ),
  title: {
    default:
      "Dorney – Premium Bakery & Confectionery Manufacturer | Pakistan",
    template: "%s | Dorney",
  },
  description:
    "Dorney – Pakistan's trusted FMCG manufacturer of premium cakes, cream cakes, biscuits and confectionery. Wholesale quality products with nationwide delivery for retailers and distributors.",
  keywords: [
    "Dorney",
    "bakery manufacturer Pakistan",
    "confectionery FMCG",
    "premium cakes Pakistan",
    "cream cakes wholesale",
    "biscuits supplier Lahore",
    "food manufacturing Pakistan",
    "retailer partnership",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Dorney",
    locale: "en_PK",
    images: [{ url: "/Meta.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  themeColor: "#AF3336",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${cookie.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col font-inter bg-bgLight antialiased">
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
