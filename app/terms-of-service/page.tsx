"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light text-foreground mb-8">الشروط والأحكام</h1>
          
          <div className="space-y-6 text-sm font-light text-foreground leading-relaxed">
            <p>
              باستخدامك لموقع فيليكس، فإنك توافق على الالتزام بهذه الشروط والأحكام.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-8 mb-4">استخدام الموقع</h2>
            <p>
              يجب استخدام هذا الموقع لأغراض مشروعة فقط. يُحظر استخدام الموقع بأي طريقة قد تسبب ضرراً أو تعطيلاً للخدمة.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-8 mb-4">الطلبات والدفع</h2>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>جميع الأسعار معروضة بالريال السعودي وتشمل ضريبة القيمة المضافة</li>
              <li>نحتفظ بحق رفض أو إلغاء أي طلب لأي سبب</li>
              <li>يتم الدفع عبر وسائل الدفع المعتمدة في الموقع</li>
            </ul>
            
            <h2 className="text-xl font-normal text-foreground mt-8 mb-4">المنتجات</h2>
            <p>
              نسعى جاهدين لعرض منتجاتنا بدقة. ومع ذلك، قد تختلف الألوان قليلاً بسبب إعدادات الشاشة. جميع أوزان المعادن والأحجار الكريمة تقريبية.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-8 mb-4">الملكية الفكرية</h2>
            <p>
              جميع المحتويات على هذا الموقع، بما في ذلك التصاميم والصور والنصوص، هي ملك لفيليكس ومحمية بموجب قوانين حقوق النشر.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-8 mb-4">تعديل الشروط</h2>
            <p>
              نحتفظ بحق تعديل هذه الشروط في أي وقت. ستصبح التغييرات سارية فور نشرها على الموقع.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-8 mb-4">التواصل</h2>
            <p>
              لأي استفسارات حول هذه الشروط، يرجى التواصل معنا على info@felixjewelry.com
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
