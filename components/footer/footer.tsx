"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black pt-8 pb-2 px-6 border-t border-[#e5e5e5] mt-48" dir="rtl">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          <div>
            <img 
              src="/felix-logo.svg" 
              alt="فيليكس" 
              className="mb-4 h-6 w-auto"
            />
            <p className="text-sm font-light text-black/70 leading-relaxed max-w-md mb-6">
              مجوهرات أنيقة مصنوعة للفرد العصري
            </p>
            
            <div className="space-y-2 text-sm font-light text-black/70">
              <div>
                <p className="font-normal text-black mb-1">زورونا</p>
                <p>شارع الملك فهد</p>
                <p>الرياض، المملكة العربية السعودية</p>
              </div>
              <div>
                <p className="font-normal text-black mb-1 mt-3">تواصل معنا</p>
                <p dir="ltr" className="text-right">+966 11 555 0123</p>
                <p>info@felixjewelry.com</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-normal mb-4">تسوق</h4>
              <ul className="space-y-2">
                <li><Link href="/category/new-in" className="text-sm font-light text-black/70 hover:text-black transition-colors">جديد</Link></li>
                <li><Link href="/category/rings" className="text-sm font-light text-black/70 hover:text-black transition-colors">خواتم</Link></li>
                <li><Link href="/category/earrings" className="text-sm font-light text-black/70 hover:text-black transition-colors">أقراط</Link></li>
                <li><Link href="/category/bracelets" className="text-sm font-light text-black/70 hover:text-black transition-colors">أساور</Link></li>
                <li><Link href="/category/necklaces" className="text-sm font-light text-black/70 hover:text-black transition-colors">قلادات</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-normal mb-4">الدعم</h4>
              <ul className="space-y-2">
                <li><Link href="/about/size-guide" className="text-sm font-light text-black/70 hover:text-black transition-colors">دليل المقاسات</Link></li>
                <li><Link href="/about/customer-care" className="text-sm font-light text-black/70 hover:text-black transition-colors">العناية بالمنتجات</Link></li>
                <li><Link href="/about/customer-care" className="text-sm font-light text-black/70 hover:text-black transition-colors">الإرجاع</Link></li>
                <li><Link href="/about/customer-care" className="text-sm font-light text-black/70 hover:text-black transition-colors">الشحن</Link></li>
                <li><Link href="/about/customer-care" className="text-sm font-light text-black/70 hover:text-black transition-colors">تواصل معنا</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-normal mb-4">تواصل</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">انستغرام</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">بنترست</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">النشرة البريدية</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e5e5e5] -mx-6 px-6 pt-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-light text-black mb-1 md:mb-0">
            &copy; 2024 فيليكس. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-6 space-x-reverse">
            <Link href="/privacy-policy" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms-of-service" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
