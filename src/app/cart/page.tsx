"use client";

import { useAuth } from "@/context/AuthContext";
import {
  getCartItemsWithProducts,
  removeCartItem,
  updateCartItemQuantity,
  clearUserCart,
  updateProduct
} from "@/lib/database";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      // In a real app, you would fetch cart items from the backend
      // For this example, we'll use the mock database
      const items = getCartItemsWithProducts(user.id);
      setCartItems(items);
    }
  }, [user, loading, router]);

  const handleRemoveItem = (productId: string) => {
    if (user) {
      removeCartItem(user.id, productId);
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (user && quantity > 0) {
      setIsUpdating(true);
      // In a real app, you would update the cart on the backend
      updateCartItemQuantity(user.id, productId, quantity);
      setCartItems(prev =>
        prev.map(item =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        )
      );
      setIsUpdating(false);
    } else if (quantity <= 0) {
      handleRemoveItem(productId);
    }
  };

  const handleCheckout = async () => {
    if (!user || cartItems.length === 0) return;

    setIsCheckingOut(true);

    try {
      // In a real app, you would process the payment here
      // For this example, we'll just update the purchase count for each product
      for (const item of cartItems) {
        // Update the purchase count for the product
        updateProduct(item.productId, {
          purchases: (item.product.purchases || 0) + item.quantity
        });
      }

      // Clear the user's cart after successful checkout
      clearUserCart(user.id);
      setCartItems([]);
      setCheckoutSuccess(true);

      // Redirect after a delay
      setTimeout(() => {
        router.push("/shop");
      }, 3000);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect is handled in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">سبد خرید</h1>

        {checkoutSuccess ? (
          <div className="bg-white shadow overflow-hidden rounded-lg p-8 text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">خرید با موفقیت انجام شد</h2>
            <p className="text-gray-600">از خرید شما متشکریم. سفارش شما در حال پردازش است.</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">سبد خرید شما خالی است</p>
            <button
              onClick={() => router.push("/shop")}
              className="mt-4 btn btn-primary"
            >
              مشاهده محصولات
            </button>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.productId} className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{item.product.title}</h3>
                          <p className="text-lg font-bold text-gray-900">{(item.product.price * item.quantity).toLocaleString()} تومان</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.product.description}</p>
                      </div>
                      <div className="flex-1 flex items-end justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                            className="px-3 py-1 bg-gray-200 rounded-l-md text-gray-600 hover:bg-gray-300"
                            disabled={isUpdating}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 bg-gray-100 text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-200 rounded-r-md text-gray-600 hover:bg-gray-300"
                            disabled={isUpdating}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="btn btn-danger text-sm"
                          disabled={isUpdating}
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>مجموع:</span>
                <span>{calculateTotal().toLocaleString()} تومان</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || cartItems.length === 0}
                className={`mt-4 w-full btn btn-primary py-3 ${isCheckingOut || cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isCheckingOut ? "در حال پردازش..." : "تکمیل خرید"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}