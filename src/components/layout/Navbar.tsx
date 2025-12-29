"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl m-4 font-bold text-gray-900">
                فروشگاه اینترنتی
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`${
                  pathname === "/" 
                    ? "border-blue-500 text-gray-900" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                خانه
              </Link>
              <Link
                href="/shop"
                className={`${
                  pathname === "/shop" 
                    ? "border-blue-500 text-gray-900" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                فروشگاه
              </Link>
              {user && (
                <Link
                  href="/cart"
                  className={`${
                    pathname === "/cart" 
                      ? "border-blue-500 text-gray-900" 
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  سبد خرید
                </Link>
              )}
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`${
                    pathname === "/admin" 
                      ? "border-blue-500 text-gray-900" 
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  پنل مدیریت
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary text-sm"
                >
                  خروج
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login" className="btn btn-secondary">
                  ورود
                </Link>
                <Link href="/register" className="btn btn-primary">
                  ثبت‌نام
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}