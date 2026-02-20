import Button from './Button';

interface ProductCardProps {
  name: string;
  category: string;
  image: string;
  description: string;
}

export default function ProductCard({ name, category, image, description }: ProductCardProps) {
  const whatsappNumber = '923001234567';
  const message = `Hi, I'm interested in ordering ${name}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark mb-2">{name}</h3>
        <p className="text-neutral mb-4 line-clamp-2">{description}</p>
        <Button href={whatsappUrl} variant="primary" size="sm" className="w-full uppercase">
          Order Now
        </Button>
      </div>
    </div>
  );
}
