import { getAllProducts, incrementProductViews } from "@/lib/database";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  const products = getAllProducts();

  // In a real app, you would increment views on the actual product page
  // For this example, we'll just show the current view count

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            فروشگاه
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            محصولات مورد نظر خود را پیدا کنید
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}