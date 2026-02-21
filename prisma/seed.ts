/**
 * Prisma seed - creates initial admin, categories, products, and flash deals
 * Run: npx prisma db seed
 *
 * Default admin: admin@dorney.com / Admin123!
 * Change in production!
 * Images for categories and products - upload via Admin panel.
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const DEFAULT_CATEGORIES = [
  { name: "Cakes", slug: "cakes", description: "Freshly baked cakes with a variety of flavours and toppings" },
  { name: "Biscuit", slug: "biscuits", description: "Crispy and golden biscuits perfect for everyday snacking" },
  { name: "Sour Chew", slug: "sour-chew", description: "Tangy and chewy treats bursting with fruity flavour" },
  { name: "Candies", slug: "candies", description: "Colourful and sweet candies loved by kids and adults alike" },
  { name: "Waffers", slug: "waffers", description: "Light and crispy wafers layered with delicious cream filling" },
  { name: "Chocolates", slug: "chocolates", description: "Rich and velvety chocolates crafted for true chocolate lovers" },
  { name: "Cookies", slug: "cookies", description: "Soft-baked and crunchy cookies in a variety of flavours" },
  { name: "Toffees", slug: "toffees", description: "Smooth and buttery toffees with a melt-in-your-mouth taste" },
  { name: "Cream Cakes", slug: "cream-cakes", description: "Delicate cakes with fresh cream and premium toppings" },
];

const DEFAULT_PRODUCTS = [
  { name: "Dubai Kunafa", slug: "dubai-kunafa", categorySlug: "cakes", shortDescription: "Rich chocolate cake with premium cocoa", description: "Rich chocolate cake with premium cocoa", price: 0, featured: true },
  { name: "Sponge Lalaei Cake", slug: "sponge-lalaei-cake", categorySlug: "cream-cakes", shortDescription: "Soft vanilla cake with fresh cream", description: "Soft vanilla cake with fresh cream", price: 0, featured: true },
  { name: "Layer Cake", slug: "layer-cake", categorySlug: "biscuits", shortDescription: "Crispy butter cookies made with real butter", description: "Crispy butter cookies made with real butter", price: 0, featured: true },
  { name: "Knock Knock", slug: "knock-knock", categorySlug: "cream-cakes", shortDescription: "Fresh strawberry with whipped cream", description: "Fresh strawberry with whipped cream", price: 0, featured: true },
  { name: "Red Velvet Cake", slug: "red-velvet-cake", categorySlug: "cakes", shortDescription: "Classic red velvet with cream cheese frosting", description: "Classic red velvet with cream cheese frosting", price: 0, featured: false },
  { name: "Chocolate Chip Cookies", slug: "chocolate-chip-cookies", categorySlug: "biscuits", shortDescription: "Classic cookies with chocolate chips", description: "Classic cookies with chocolate chips", price: 0, featured: false },
  { name: "Caramel Cake", slug: "caramel-cake", categorySlug: "cakes", shortDescription: "Sweet caramel layered cake", description: "Sweet caramel layered cake", price: 0, featured: false },
  { name: "Coconut Biscuits", slug: "coconut-biscuits", categorySlug: "biscuits", shortDescription: "Crunchy biscuits with coconut flavor", description: "Crunchy biscuits with coconut flavor", price: 0, featured: false },
];

const DEFAULT_FLASH_DEALS = [
  {
    name: "Cream Cupcakes",
    subtitle: "Vanilla & Chocolate Mix",
    originalPrice: 250,
    salePrice: 175,
    discount: 30,
    emoji: "🧁",
    tag: "Best Seller",
    bgColor: "#FFF3E0",
    accentColor: "#FF6B00",
    displayOrder: 0,
  },
  {
    name: "Lollipop Bucket",
    subtitle: "Mixed Flavors — 50pcs",
    originalPrice: 500,
    salePrice: 350,
    discount: 30,
    emoji: "🍭",
    tag: "Bulk Deal",
    bgColor: "#FCE4EC",
    accentColor: "#E91E63",
    displayOrder: 1,
  },
  {
    name: "Candy Mix Pack",
    subtitle: "Assorted Flavors — 100pcs",
    originalPrice: 400,
    salePrice: 299,
    discount: 25,
    emoji: "🍬",
    tag: "Hot Deal",
    bgColor: "#E8F5E9",
    accentColor: "#2E7D32",
    displayOrder: 2,
  },
  {
    name: "Mini Donuts Box",
    subtitle: "Glazed & Sprinkled — 12pcs",
    originalPrice: 320,
    salePrice: 220,
    discount: 31,
    emoji: "🍩",
    tag: "New Arrival",
    bgColor: "#EDE7F6",
    accentColor: "#6A1B9A",
    displayOrder: 3,
  },
];

async function main() {
  const hashed = await bcrypt.hash("Admin123!", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@dorney.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@dorney.com",
      password: hashed,
      role: "admin",
      isActive: true,
    },
  });
  console.log("Admin created/updated:", admin.email);

  // Categories
  const categoryCount = await prisma.category.count();
  if (categoryCount === 0) {
    await prisma.category.createMany({ data: DEFAULT_CATEGORIES });
    console.log("Default categories created:", DEFAULT_CATEGORIES.length);
  } else {
    console.log("Categories already exist, skipping default seed");
  }

  // Products (require categories to exist)
  const productCount = await prisma.product.count();
  if (productCount === 0) {
    for (const p of DEFAULT_PRODUCTS) {
      const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
      if (!category) {
        console.warn(`Skipping product "${p.name}" - category "${p.categorySlug}" not found`);
        continue;
      }
      await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          categoryId: category.id,
          shortDescription: p.shortDescription,
          description: p.description,
          price: p.price,
          featured: p.featured,
        },
      });
    }
    console.log("Default products created:", DEFAULT_PRODUCTS.length);
  } else {
    console.log("Products already exist, skipping default seed");
  }

  // Flash deals
  const flashDealCount = await prisma.flashDeal.count();
  if (flashDealCount === 0) {
    await prisma.flashDeal.createMany({ data: DEFAULT_FLASH_DEALS });
    console.log("Default flash deals created:", DEFAULT_FLASH_DEALS.length);
  } else {
    console.log("Flash deals already exist, skipping default seed");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
