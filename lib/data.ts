/**
 * SEO-optimized mock data for categories and products.
 * Replace with API calls when backend is ready.
 */

export interface CategoryImage {
  url: string;
  alt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  images: ProductImage[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  featured?: boolean;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dornyfood.com";

export const categories: Category[] = [
  {
    id: "cup-cakes",
    name: "Cup Cakes",
    slug: "cup-cakes",
    description: "Delicious soft and creamy cupcakes in multiple flavors.",
    image: "/images/categories/cakes.webp",
    metaTitle: "Best Cup Cakes in Pakistan | Dorney FMCG",
    metaDescription:
      "Buy premium quality cup cakes in Pakistan. Fresh, soft and delicious flavors available.",
    keywords: ["cup cakes", "fmcg cupcakes", "bakery pakistan", "cupcakes wholesale"],
  },
  {
    id: "toffees",
    name: "Toffees",
    slug: "toffees",
    description: "Smooth and buttery toffees with a melt-in-your-mouth taste.",
    image: "/images/categories/dorneyToffees.webp",
    metaTitle: "Best Toffees in Pakistan | Dorney Confectionery",
    metaDescription:
      "Premium toffees and caramel candies in Pakistan. Quality confectionery for retailers.",
    keywords: ["toffees pakistan", "caramel candy", "confectionery wholesale"],
  },
  {
    id: "lollipops",
    name: "Lollipops",
    slug: "lollipops",
    description: "Colorful and sweet lollipops loved by kids and adults alike.",
    image: "/images/categories/dorneyCadies.webp",
    metaTitle: "Lollipops Wholesale Pakistan | Dorney Candies",
    metaDescription:
      "Buy delicious lollipops in Pakistan. Assorted flavors and colors for retail.",
    keywords: ["lollipops pakistan", "candies wholesale", "fmcg lollipops"],
  },
  {
    id: "biscuits",
    name: "Biscuits",
    slug: "biscuits",
    description: "Crispy and golden biscuits perfect for everyday snacking.",
    image: "/images/categories/biscuits.webp",
    metaTitle: "Biscuits Manufacturer Pakistan | Dorney FMCG",
    metaDescription:
      "Premium biscuits and cookies in Pakistan. Wholesale supply for retailers.",
    keywords: ["biscuits pakistan", "cookies wholesale", "bakery biscuits"],
  },
  {
    id: "snacks",
    name: "Snacks",
    slug: "snacks",
    description: "Light and crispy snacks – wafers, cookies and more.",
    image: "/images/categories/dorneyWaffers.webp",
    metaTitle: "Snacks Wholesale Pakistan | Dorney FMCG",
    metaDescription:
      "Quality snacks, wafers and cookies in Pakistan. FMCG snacks for retail.",
    keywords: ["snacks pakistan", "wafers wholesale", "fmcg snacks"],
  },
];

export const products: Product[] = [
  // Cup Cakes
  {
    id: "choco-cupcake",
    name: "Chocolate Cup Cake",
    slug: "chocolate-cup-cake",
    category: "cup-cakes",
    shortDescription: "Soft chocolate cupcake with creamy filling.",
    description:
      "Our Chocolate Cup Cake is made with premium cocoa and a soft, moist sponge. Each bite delivers rich chocolate flavor with a creamy frosting that melts in your mouth. Perfect for parties, gifts, and everyday indulgence.",
    price: 50,
    images: [
      {
        url: "/images/products/featuredProduct1.png",
        alt: "Chocolate Cup Cake - Dorney FMCG product",
      },
    ],
    metaTitle: "Chocolate Cup Cake Price in Pakistan | Dorney",
    metaDescription:
      "Buy delicious chocolate cup cake at best price in Pakistan.",
    keywords: ["chocolate cupcake pakistan", "buy cupcake online", "fmcg cakes"],
    featured: true,
  },
  {
    id: "vanilla-cupcake",
    name: "Vanilla Cup Cake",
    slug: "vanilla-cup-cake",
    category: "cup-cakes",
    shortDescription: "Classic vanilla cupcake with buttercream.",
    description:
      "A timeless vanilla cupcake with soft sponge and smooth buttercream frosting. Made with real vanilla extract for authentic flavor.",
    price: 45,
    images: [
      {
        url: "/images/products/featuredProduct2.png",
        alt: "Vanilla Cup Cake - Dorney FMCG product",
      },
    ],
    metaTitle: "Vanilla Cup Cake Pakistan | Dorney Bakery",
    metaDescription: "Premium vanilla cup cake – soft and creamy.",
    keywords: ["vanilla cupcake", "bakery pakistan", "cream cakes"],
    featured: true,
  },
  {
    id: "strawberry-cupcake",
    name: "Strawberry Cup Cake",
    slug: "strawberry-cup-cake",
    category: "cup-cakes",
    shortDescription: "Fresh strawberry flavor with whipped cream.",
    description:
      "Refreshing strawberry cupcake topped with light whipped cream and real strawberry pieces.",
    price: 55,
    images: [
      {
        url: "/images/products/featuredProduct4.png",
        alt: "Strawberry Cup Cake - Dorney FMCG product",
      },
    ],
    metaTitle: "Strawberry Cup Cake Price Pakistan | Dorney",
    metaDescription: "Buy strawberry cup cake online in Pakistan.",
    keywords: ["strawberry cupcake", "cream cakes pakistan"],
    featured: true,
  },
  {
    id: "red-velvet-cupcake",
    name: "Red Velvet Cup Cake",
    slug: "red-velvet-cup-cake",
    category: "cup-cakes",
    shortDescription: "Classic red velvet with cream cheese frosting.",
    description:
      "Indulgent red velvet cupcake with signature cream cheese frosting. A favorite for special occasions.",
    price: 60,
    images: [
      {
        url: "/images/products/featuredProduct5.png",
        alt: "Red Velvet Cup Cake - Dorney FMCG product",
      },
    ],
    metaTitle: "Red Velvet Cup Cake Pakistan | Dorney",
    metaDescription: "Best red velvet cupcake in Pakistan – Dorney quality.",
    keywords: ["red velvet cupcake", "cream cheese cake pakistan"],
  },
  {
    id: "caramel-cupcake",
    name: "Caramel Cup Cake",
    slug: "caramel-cup-cake",
    category: "cup-cakes",
    shortDescription: "Sweet caramel drizzle cupcake.",
    description:
      "Rich caramel-flavored cupcake with a luscious caramel drizzle. Perfect for caramel lovers.",
    price: 55,
    images: [
      {
        url: "/images/products/featured7.png",
        alt: "Caramel Cup Cake - Dorney FMCG product",
      },
    ],
    metaTitle: "Caramel Cup Cake Pakistan | Dorney",
    metaDescription: "Delicious caramel cup cake – buy in Pakistan.",
    keywords: ["caramel cupcake", "sweet cakes pakistan"],
  },
  {
    id: "coffee-cupcake",
    name: "Coffee Cup Cake",
    slug: "coffee-cup-cake",
    category: "cup-cakes",
    shortDescription: "Bold coffee flavor with mocha frosting.",
    description:
      "For coffee enthusiasts – our Coffee Cup Cake features bold coffee notes and smooth mocha frosting.",
    price: 50,
    images: [
      {
        url: "/images/products/featuredProduct1.png",
        alt: "Coffee Cup Cake - Dorney FMCG product",
      },
    ],
    metaTitle: "Coffee Cup Cake Pakistan | Dorney",
    metaDescription: "Coffee flavored cup cake – premium quality.",
    keywords: ["coffee cupcake", "mocha cake pakistan"],
  },
  // Toffees
  {
    id: "butter-toffee",
    name: "Butter Toffee",
    slug: "butter-toffee",
    category: "toffees",
    shortDescription: "Smooth buttery toffee – melt in your mouth.",
    description:
      "Classic butter toffee made with real butter and premium ingredients. Smooth, rich, and irresistibly delicious.",
    price: 25,
    images: [
      {
        url: "/images/categories/dorneyToffees.webp",
        alt: "Butter Toffee - Dorney FMCG product",
      },
    ],
    metaTitle: "Butter Toffee Price Pakistan | Dorney",
    metaDescription: "Best butter toffee in Pakistan – Dorney confectionery.",
    keywords: ["butter toffee", "toffee pakistan", "confectionery"],
    featured: true,
  },
  {
    id: "caramel-toffee",
    name: "Caramel Toffee",
    slug: "caramel-toffee",
    category: "toffees",
    shortDescription: "Rich caramel toffee pieces.",
    description:
      "Golden caramel toffees with a deep, sweet flavor. Perfect for sharing or personal indulgence.",
    price: 30,
    images: [
      {
        url: "/images/categories/dorneyToffees.webp",
        alt: "Caramel Toffee - Dorney FMCG product",
      },
    ],
    metaTitle: "Caramel Toffee Pakistan | Dorney",
    metaDescription: "Premium caramel toffee – buy wholesale.",
    keywords: ["caramel toffee", "toffee wholesale pakistan"],
  },
  {
    id: "chocolate-toffee",
    name: "Chocolate Toffee",
    slug: "chocolate-toffee",
    category: "toffees",
    shortDescription: "Chocolate-coated toffee bits.",
    description:
      "Decadent toffee pieces coated in smooth milk chocolate. The perfect combination of crunch and melt.",
    price: 35,
    images: [
      {
        url: "/images/categories/dorneyChocolates.webp",
        alt: "Chocolate Toffee - Dorney FMCG product",
      },
    ],
    metaTitle: "Chocolate Toffee Pakistan | Dorney",
    metaDescription: "Chocolate toffee – premium confectionery.",
    keywords: ["chocolate toffee", "confectionery pakistan"],
  },
  {
    id: "mint-toffee",
    name: "Mint Toffee",
    slug: "mint-toffee",
    category: "toffees",
    shortDescription: "Refreshing mint-flavored toffee.",
    description:
      "Cool and refreshing mint toffees. A classic flavor loved by all ages.",
    price: 25,
    images: [
      {
        url: "/images/categories/dorneyToffees.webp",
        alt: "Mint Toffee - Dorney FMCG product",
      },
    ],
    metaTitle: "Mint Toffee Pakistan | Dorney",
    metaDescription: "Mint toffee – refreshing confectionery.",
    keywords: ["mint toffee", "peppermint candy pakistan"],
  },
  {
    id: "fruit-toffee",
    name: "Fruit Toffee",
    slug: "fruit-toffee",
    category: "toffees",
    shortDescription: "Mixed fruit flavored toffees.",
    description:
      "Assorted fruit-flavored toffees including mango, strawberry, and orange. Fun for everyone.",
    price: 28,
    images: [
      {
        url: "/images/categories/dorneyToffees.webp",
        alt: "Fruit Toffee - Dorney FMCG product",
      },
    ],
    metaTitle: "Fruit Toffee Pakistan | Dorney",
    metaDescription: "Mixed fruit toffees – assorted flavors.",
    keywords: ["fruit toffee", "assorted toffees pakistan"],
  },
  {
    id: "coffee-toffee",
    name: "Coffee Toffee",
    slug: "coffee-toffee",
    category: "toffees",
    shortDescription: "Coffee-infused toffee for adults.",
    description:
      "Sophisticated coffee toffee with real coffee extract. Perfect for coffee lovers.",
    price: 32,
    images: [
      {
        url: "/images/categories/dorneyToffees.webp",
        alt: "Coffee Toffee - Dorney FMCG product",
      },
    ],
    metaTitle: "Coffee Toffee Pakistan | Dorney",
    metaDescription: "Coffee toffee – premium adult confectionery.",
    keywords: ["coffee toffee", "adult candy pakistan"],
  },
  // Lollipops
  {
    id: "classic-lollipop",
    name: "Classic Lollipop",
    slug: "classic-lollipop",
    category: "lollipops",
    shortDescription: "Classic fruit-flavored lollipops.",
    description:
      "Traditional round lollipops in assorted fruit flavors. A timeless treat for all ages.",
    price: 15,
    images: [
      {
        url: "/images/categories/dorneyCadies.webp",
        alt: "Classic Lollipop - Dorney FMCG product",
      },
    ],
    metaTitle: "Lollipops Wholesale Pakistan | Dorney",
    metaDescription: "Classic lollipops – assorted flavors.",
    keywords: ["lollipops pakistan", "candies wholesale"],
    featured: true,
  },
  {
    id: "sour-lollipop",
    name: "Sour Lollipop",
    slug: "sour-lollipop",
    category: "lollipops",
    shortDescription: "Tangy sour candy lollipops.",
    description:
      "Tangy and fun sour lollipops that deliver a punch of flavor. Popular with kids and teens.",
    price: 18,
    images: [
      {
        url: "/images/categories/dorneySourChew.webp",
        alt: "Sour Lollipop - Dorney FMCG product",
      },
    ],
    metaTitle: "Sour Lollipops Pakistan | Dorney",
    metaDescription: "Sour lollipops – tangy candy.",
    keywords: ["sour lollipops", "sour candy pakistan"],
  },
  {
    id: "chocolate-lollipop",
    name: "Chocolate Lollipop",
    slug: "chocolate-lollipop",
    category: "lollipops",
    shortDescription: "Chocolate swirl lollipops.",
    description:
      "Rich chocolate lollipops with a smooth, creamy texture. Perfect for chocolate enthusiasts.",
    price: 20,
    images: [
      {
        url: "/images/categories/dorneyChocolates.webp",
        alt: "Chocolate Lollipop - Dorney FMCG product",
      },
    ],
    metaTitle: "Chocolate Lollipop Pakistan | Dorney",
    metaDescription: "Chocolate lollipops – premium candy.",
    keywords: ["chocolate lollipop", "chocolate candy pakistan"],
  },
  {
    id: "gummy-lollipop",
    name: "Gummy Lollipop",
    slug: "gummy-lollipop",
    category: "lollipops",
    shortDescription: "Chewy gummy center lollipop.",
    description:
      "Unique lollipops with a soft gummy center. Two textures in one delicious treat.",
    price: 22,
    images: [
      {
        url: "/images/categories/dorneyCadies.webp",
        alt: "Gummy Lollipop - Dorney FMCG product",
      },
    ],
    metaTitle: "Gummy Lollipop Pakistan | Dorney",
    metaDescription: "Gummy center lollipops – fun candy.",
    keywords: ["gummy lollipop", "chewy candy pakistan"],
  },
  {
    id: "mega-lollipop",
    name: "Mega Lollipop",
    slug: "mega-lollipop",
    category: "lollipops",
    shortDescription: "Extra-large lollipop – value pack.",
    description:
      "Our Mega Lollipop offers great value with an extra-large size. Multiple flavors available.",
    price: 30,
    images: [
      {
        url: "/images/categories/dorneyCadies.webp",
        alt: "Mega Lollipop - Dorney FMCG product",
      },
    ],
    metaTitle: "Mega Lollipop Pakistan | Dorney",
    metaDescription: "Extra large lollipops – value candy.",
    keywords: ["mega lollipop", "large lollipop pakistan"],
  },
  {
    id: "sugar-free-lollipop",
    name: "Sugar Free Lollipop",
    slug: "sugar-free-lollipop",
    category: "lollipops",
    shortDescription: "Sugar-free lollipops for health-conscious.",
    description:
      "Delicious sugar-free lollipops. Same great taste without the sugar – ideal for diabetics.",
    price: 25,
    images: [
      {
        url: "/images/categories/dorneyCadies.webp",
        alt: "Sugar Free Lollipop - Dorney FMCG product",
      },
    ],
    metaTitle: "Sugar Free Lollipops Pakistan | Dorney",
    metaDescription: "Sugar-free candy – guilt-free treat.",
    keywords: ["sugar free lollipop", "sugar free candy pakistan"],
  },
  // Biscuits
  {
    id: "butter-biscuit",
    name: "Butter Biscuit",
    slug: "butter-biscuit",
    category: "biscuits",
    shortDescription: "Crispy butter cookies made with real butter.",
    description:
      "Golden butter biscuits made with the finest butter. Crispy, flavorful, and perfect with tea.",
    price: 40,
    images: [
      {
        url: "/images/products/featuredProduct3.png",
        alt: "Butter Biscuit - Dorney FMCG product",
      },
    ],
    metaTitle: "Butter Biscuit Pakistan | Dorney",
    metaDescription: "Premium butter biscuits – wholesale.",
    keywords: ["butter biscuit", "cookies pakistan", "tea biscuits"],
    featured: true,
  },
  {
    id: "chocolate-chip-biscuit",
    name: "Chocolate Chip Biscuit",
    slug: "chocolate-chip-biscuit",
    category: "biscuits",
    shortDescription: "Classic cookies with chocolate chips.",
    description:
      "Beloved chocolate chip biscuits loaded with real chocolate chunks. A household favorite.",
    price: 45,
    images: [
      {
        url: "/images/products/featuredProduct6.png",
        alt: "Chocolate Chip Biscuit - Dorney FMCG product",
      },
    ],
    metaTitle: "Chocolate Chip Biscuit Pakistan | Dorney",
    metaDescription: "Chocolate chip cookies – best price.",
    keywords: ["chocolate chip biscuit", "cookies pakistan"],
  },
  {
    id: "coconut-biscuit",
    name: "Coconut Biscuit",
    slug: "coconut-biscuit",
    category: "biscuits",
    shortDescription: "Crunchy biscuits with coconut flavor.",
    description:
      "Crunchy coconut biscuits with a tropical twist. Made with real coconut for authentic flavor.",
    price: 42,
    images: [
      {
        url: "/images/products/featured8.png",
        alt: "Coconut Biscuit - Dorney FMCG product",
      },
    ],
    metaTitle: "Coconut Biscuit Pakistan | Dorney",
    metaDescription: "Coconut biscuits – tropical flavor.",
    keywords: ["coconut biscuit", "coconut cookies pakistan"],
  },
  {
    id: "cream-biscuit",
    name: "Cream Biscuit",
    slug: "cream-biscuit",
    category: "biscuits",
    shortDescription: "Sandwich biscuits with vanilla cream.",
    description:
      "Two crispy biscuits with a layer of smooth vanilla cream in between. A classic treat.",
    price: 35,
    images: [
      {
        url: "/images/categories/dorneyCookies.webp",
        alt: "Cream Biscuit - Dorney FMCG product",
      },
    ],
    metaTitle: "Cream Biscuit Pakistan | Dorney",
    metaDescription: "Cream sandwich biscuits – premium.",
    keywords: ["cream biscuit", "sandwich biscuits pakistan"],
  },
  {
    id: "digestive-biscuit",
    name: "Digestive Biscuit",
    slug: "digestive-biscuit",
    category: "biscuits",
    shortDescription: "Whole wheat digestive biscuits.",
    description:
      "Wholesome whole wheat digestive biscuits. A healthier option without compromising on taste.",
    price: 38,
    images: [
      {
        url: "/images/categories/biscuits.webp",
        alt: "Digestive Biscuit - Dorney FMCG product",
      },
    ],
    metaTitle: "Digestive Biscuit Pakistan | Dorney",
    metaDescription: "Whole wheat digestive biscuits.",
    keywords: ["digestive biscuit", "whole wheat cookies pakistan"],
  },
  {
    id: "milk-biscuit",
    name: "Milk Biscuit",
    slug: "milk-biscuit",
    category: "biscuits",
    shortDescription: "Rich milk-flavored biscuits.",
    description:
      "Soft and crumbly milk biscuits with a rich, creamy taste. Perfect for dunking in tea.",
    price: 32,
    images: [
      {
        url: "/images/categories/biscuits.webp",
        alt: "Milk Biscuit - Dorney FMCG product",
      },
    ],
    metaTitle: "Milk Biscuit Pakistan | Dorney",
    metaDescription: "Milk biscuits – soft and creamy.",
    keywords: ["milk biscuit", "milk cookies pakistan"],
  },
  // Snacks
  {
    id: "vanilla-wafer",
    name: "Vanilla Wafer",
    slug: "vanilla-wafer",
    category: "snacks",
    shortDescription: "Light crispy wafers with vanilla cream.",
    description:
      "Light and crispy wafers layered with smooth vanilla cream. A delicate snack for any time.",
    price: 35,
    images: [
      {
        url: "/images/categories/dorneyWaffers.webp",
        alt: "Vanilla Wafer - Dorney FMCG product",
      },
    ],
    metaTitle: "Vanilla Wafer Pakistan | Dorney",
    metaDescription: "Crispy vanilla wafers – premium snacks.",
    keywords: ["vanilla wafer", "wafers pakistan", "snacks"],
    featured: true,
  },
  {
    id: "chocolate-wafer",
    name: "Chocolate Wafer",
    slug: "chocolate-wafer",
    category: "snacks",
    shortDescription: "Chocolate-coated crispy wafers.",
    description:
      "Crispy wafer layers filled and coated with rich chocolate. Irresistibly crunchy.",
    price: 40,
    images: [
      {
        url: "/images/categories/dorneyWaffers.webp",
        alt: "Chocolate Wafer - Dorney FMCG product",
      },
    ],
    metaTitle: "Chocolate Wafer Pakistan | Dorney",
    metaDescription: "Chocolate wafers – crispy snack.",
    keywords: ["chocolate wafer", "wafers wholesale pakistan"],
  },
  {
    id: "strawberry-wafer",
    name: "Strawberry Wafer",
    slug: "strawberry-wafer",
    category: "snacks",
    shortDescription: "Strawberry cream filled wafers.",
    description:
      "Light wafers with a delightful strawberry cream filling. A fruity treat for snack lovers.",
    price: 38,
    images: [
      {
        url: "/images/categories/dorneyWaffers.webp",
        alt: "Strawberry Wafer - Dorney FMCG product",
      },
    ],
    metaTitle: "Strawberry Wafer Pakistan | Dorney",
    metaDescription: "Strawberry wafers – fruity snack.",
    keywords: ["strawberry wafer", "fruit wafers pakistan"],
  },
  {
    id: "cream-cookie",
    name: "Cream Cookie",
    slug: "cream-cookie",
    category: "snacks",
    shortDescription: "Soft-baked cream cookies.",
    description:
      "Soft-baked cookies with a creamy center. Available in vanilla and chocolate variants.",
    price: 42,
    images: [
      {
        url: "/images/categories/dorneyCookies.webp",
        alt: "Cream Cookie - Dorney FMCG product",
      },
    ],
    metaTitle: "Cream Cookie Pakistan | Dorney",
    metaDescription: "Soft cream cookies – bakery snack.",
    keywords: ["cream cookie", "soft cookies pakistan"],
  },
  {
    id: "crispy-cracker",
    name: "Crispy Cracker",
    slug: "crispy-cracker",
    category: "snacks",
    shortDescription: "Light and crispy salted crackers.",
    description:
      "Light, crispy crackers with a hint of salt. Perfect with cheese, dips, or on their own.",
    price: 30,
    images: [
      {
        url: "/images/categories/dorneyWaffers.webp",
        alt: "Crispy Cracker - Dorney FMCG product",
      },
    ],
    metaTitle: "Crispy Cracker Pakistan | Dorney",
    metaDescription: "Salted crackers – light snack.",
    keywords: ["cracker pakistan", "salted snacks"],
  },
  {
    id: "cheese-sticks",
    name: "Cheese Sticks",
    slug: "cheese-sticks",
    category: "snacks",
    shortDescription: "Cheese-flavored crunchy sticks.",
    description:
      "Crunchy cheese-flavored snack sticks. A savory option for snack time.",
    price: 45,
    images: [
      {
        url: "/images/categories/dorneyCookies.webp",
        alt: "Cheese Sticks - Dorney FMCG product",
      },
    ],
    metaTitle: "Cheese Sticks Pakistan | Dorney",
    metaDescription: "Cheese sticks – savory snack.",
    keywords: ["cheese sticks", "savory snacks pakistan"],
  },
];

/** Helper to get category by slug */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Helper to get product by slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Helper to get products by category */
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

/** Base URL for absolute URLs in metadata */
export function getAbsoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Core values for About/Home sections */
export const coreValues = [
  {
    id: "1",
    title: "Quality First",
    description:
      "We use only premium ingredients and maintain strict quality control at every stage of production to ensure the finest products.",
    icon: "award",
  },
  {
    id: "2",
    title: "Hygienic Production",
    description:
      "Our state-of-the-art facilities follow international hygiene standards, ensuring safe and clean products for your customers.",
    icon: "shield-check",
  },
  {
    id: "3",
    title: "Nationwide Distribution",
    description:
      "With an extensive distribution network, we ensure timely delivery of fresh products to retailers across Pakistan.",
    icon: "truck",
  },
  {
    id: "4",
    title: "Affordable Pricing",
    description:
      "We offer competitive wholesale pricing that helps retailers maximize their profit margins while maintaining quality.",
    icon: "badge-percent",
  },
];

/** Trust stats */
export const stats = [
  { id: "1", number: "500+", label: "Retailers", description: "Trusted retail partners" },
  { id: "2", number: "20+", label: "Cities", description: "Nationwide coverage" },
  { id: "3", number: "10+", label: "Years Experience", description: "Industry expertise" },
  { id: "4", number: "50+", label: "Products", description: "Diverse product range" },
];

/** Manufacturing steps */
export const manufacturingSteps = [
  { id: "1", step: "Step 1", title: "Ingredient Selection", description: "We source premium quality ingredients from trusted suppliers, ensuring freshness and authenticity." },
  { id: "2", step: "Step 2", title: "Mixing & Preparation", description: "Our expert team uses precision mixing techniques and modern equipment for consistent quality." },
  { id: "3", step: "Step 3", title: "Baking Process", description: "Temperature-controlled ovens ensure perfect baking, maintaining the taste and texture." },
  { id: "4", step: "Step 4", title: "Quality Control", description: "Each batch undergoes rigorous quality checks to meet our high standards before packaging." },
  { id: "5", step: "Step 5", title: "Packaging", description: "Products are carefully packaged in hygienic conditions to maintain freshness and extend shelf life." },
  { id: "6", step: "Step 6", title: "Distribution", description: "Efficient logistics network ensures timely delivery to retailers across all major cities." },
];

export const testimonials = [
  {
    id: "1",
    name: "Ahmed Khan",
    role: "Retail Store Owner, Lahore",
    content: "Dorney's products have transformed my store's bakery section. The quality is unmatched, and my customers keep coming back for more. Their delivery is always on time, and the wholesale prices are very competitive.",
    rating: 5,
  },
  {
    id: "2",
    name: "Fatima Ali",
    role: "Supermarket Manager, Karachi",
    content: "We've been partnering with Dorney for over 2 years now. Their cream cakes and biscuits are our best-sellers. The consistency in quality and the support from their team is exceptional.",
    rating: 5,
  },
  {
    id: "3",
    name: "Muhammad Rizwan",
    role: "Convenience Store Chain Owner, Islamabad",
    content: "Dorney understands the retail business. Their products help us maintain high margins while keeping customers satisfied. The packaging is professional and the shelf life is impressive.",
    rating: 5,
  },
];
