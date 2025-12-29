import Link from "next/link";
import { Button } from "../components/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            خوش آمدید به فروشگاه اینترنتی
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
            بهترین محصولات را با بهترین قیمت پیدا کنید
          </p>
          <div className="mt-10">
            <Link href="/shop" className="btn btn-primary inline-block">
              مشاهده محصولات
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12">
          <div className="lg:py-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <h3 className="text-lg font-medium text-gray-900">محصولات با کیفیت</h3>
                <p className="mt-2 text-base text-gray-500">
                  تمامی محصولات موجود در فروشگاه ما دارای گارانتی کیفیت هستند و از بهترین برندهای معتبر جهان انتخاب شده‌اند.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:py-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <h3 className="text-lg font-medium text-gray-900">تحویل سریع</h3>
                <p className="mt-2 text-base text-gray-500">
                  سفارشات شما در کوتاه‌ترین زمان ممکن و با امکان پیگیری آنلاین ارسال می‌شوند.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:py-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <h3 className="text-lg font-medium text-gray-900">پشتیبانی 24 ساعته</h3>
                <p className="mt-2 text-base text-gray-500">
                  تیم پشتیبانی ما همیشه در خدمت شما هستند تا سوالات و مشکلات شما را برطرف کنند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}