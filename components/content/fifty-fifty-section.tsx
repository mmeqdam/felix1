"use client";

import Link from "next/link";

const FiftyFiftySection = () => {
  return (
    <section className="w-full mb-16 px-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Link href="/category/earrings" className="block">
            <div className="w-full aspect-square mb-3 overflow-hidden">
              <img 
                src="/earrings-collection.png" 
                alt="مجموعة الأقراط" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div className="">
            <h3 className="text-sm font-normal text-foreground mb-1">
              أشكال عضوية
            </h3>
            <p className="text-sm font-light text-foreground">
              قطع مستوحاة من الطبيعة بتفاصيل نحتية سلسة
            </p>
          </div>
        </div>

        <div>
          <Link href="/category/bracelets" className="block">
            <div className="w-full aspect-square mb-3 overflow-hidden">
              <img 
                src="/link-bracelet.png" 
                alt="سوار السلسلة" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div className="">
            <h3 className="text-sm font-normal text-foreground mb-1">
              مجموعة السلاسل
            </h3>
            <p className="text-sm font-light text-foreground">
              روابط راقية وصلات من المعادن الثمينة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFiftySection;
