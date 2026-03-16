import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-sm bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.premium && (
          <span className="absolute top-3 left-3 rounded-sm bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent-foreground">
            Premium
          </span>
        )}
      </div>
      <div className="p-4 lg:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
      </div>
    </Link>
  );
}
