"use client";

import { useAuth } from "@/context/AuthContext";
import { 
  getProductById, 
  incrementProductViews, 
  addCartItem, 
  getCartItemsByUserId,
  Product 
} from "@/lib/database";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(Array.isArray(id) ? id[0] : id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Increment product views
        incrementProductViews(foundProduct.id);
      } else {
        router.push("/shop");
      }
    }
  }, [id, router]);

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!product) return;

    setIsAddingToCart(true);
    
    try {
      // Add item to cart
      await addCartItem({
        userId: user.id,
        productId: product.id,
        quantity: quantity,
      });
      
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-center object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              
              <div className="mt-4 flex items-center">
                <p className="text-2xl font-bold text-gray-900">{product.price.toLocaleString()} تومان</p>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center text-sm text-gray-500">
                  <span>بازدید: {product.views}</span>
                  <span className="mx-2">|</span>
                  <span>فروش: {product.purchases}</span>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="text-gray-700 ml-2">
                    تعداد:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-gray-800">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    fullWidth
                    className="py-3"
                  >
                    {isAddingToCart ? "در حال افزودن..." : "افزودن به سبد خرید"}
                  </Button>
                  
                  {addedToCart && (
                    <div className="mt-3 p-3 bg-green-100 text-green-700 rounded-md">
                      محصول با موفقیت به سبد خرید اضافه شد
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}