import { Product } from "@/lib/database";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="product-card bg-white overflow-hidden shadow rounded-lg transition-transform duration-200 hover:shadow-lg">
        <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-t-lg bg-gray-200">
          <img
            src={product.image}
            alt={product.title}
            className="h-60 w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{product.title}</h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-gray-900">{product.price.toLocaleString()} تومان</p>
            <div className="text-xs text-gray-500">
              <div>بازدید: {product.views}</div>
              <div>فروش: {product.purchases}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}