"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function CustomerCarePage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light text-foreground mb-8">خدمة العملاء</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-normal text-foreground mb-4">الشحن والتوصيل</h2>
              <div className="space-y-3 text-sm font-light text-foreground leading-relaxed">
                <p><strong>الشحن القياسي:</strong> 3-5 أيام عمل - مجاني للطلبات فوق 500 ر.س</p>
                <p><strong>الشحن السريع:</strong> 1-2 أيام عمل - 55 ر.س</p>
                <p><strong>التوصيل في نفس اليوم:</strong> متاح في الرياض فقط - 130 ر.س</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-normal text-foreground mb-4">الإرجاع والاستبدال</h2>
              <div className="space-y-3 text-sm font-light text-foreground leading-relaxed">
                <p>نقبل الإرجاع والاستبدال خلال 14 يوماً من تاريخ الاستلام، بشرط:</p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>أن تكون القطعة في حالتها الأصلية</li>
                  <li>أن تكون مع جميع العلامات والتغليف الأصلي</li>
                  <li>أن لا تكون من القطع المصممة خصيصاً</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-normal text-foreground mb-4">العناية بالمجوهرات</h2>
              <div className="space-y-3 text-sm font-light text-foreground leading-relaxed">
                <p>للحفاظ على جمال مجوهراتك:</p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>خزنيها في الكيس القماشي المرفق بعيداً عن الرطوبة</li>
                  <li>تجنبي ارتدائها أثناء الاستحمام أو السباحة</li>
                  <li>ضعي العطور والكريمات قبل ارتداء المجوهرات</li>
                  <li>نظفيها بقطعة قماش ناعمة وجافة</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-normal text-foreground mb-4">تواصلي معنا</h2>
              <div className="space-y-3 text-sm font-light text-foreground leading-relaxed">
                <p><strong>البريد الإلكتروني:</strong> info@felixjewelry.com</p>
                <p><strong>الهاتف:</strong> <span dir="ltr">+966 11 555 0123</span></p>
                <p><strong>ساعات العمل:</strong> الأحد - الخميس، 9 صباحاً - 6 مساءً</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
