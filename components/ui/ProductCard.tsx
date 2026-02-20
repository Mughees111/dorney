import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { getWhatsAppUrl } from "@/lib/helpers";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const category = product.category.replace(/-/g, " ");
  const categoryDisplay =
    category.charAt(0).toUpperCase() + category.slice(1);
  const message = `Hi, I'm interested in ordering ${product.name}`;
  const whatsappUrl = getWhatsAppUrl(undefined, message);

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden h-64">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
            {categoryDisplay}
          </div>
        </div>
      </Link>
      <div className="p-6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xl font-bold text-dark mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-neutral mb-4 line-clamp-2">{product.shortDescription}</p>
        <Button href={whatsappUrl} variant="primary" size="sm" className="w-full uppercase">
          Order Now
        </Button>
      </div>
    </article>
  );
}
