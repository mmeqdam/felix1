"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light text-foreground mb-8">دليل المقاسات</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-normal text-foreground mb-4">الخواتم</h2>
              <p className="text-sm font-light text-foreground leading-relaxed mb-4">
                لتحديد مقاس خاتمك، يمكنك استخدام خيط أو شريط ورقي لقياس محيط إصبعك، ثم مقارنة النتيجة بالجدول أدناه.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-right font-normal">المقاس</th>
                      <th className="py-3 text-right font-normal">القطر (مم)</th>
                      <th className="py-3 text-right font-normal">المحيط (مم)</th>
                    </tr>
                  </thead>
                  <tbody className="font-light">
                    <tr className="border-b"><td className="py-2">5</td><td>15.7</td><td>49.3</td></tr>
                    <tr className="border-b"><td className="py-2">6</td><td>16.5</td><td>51.8</td></tr>
                    <tr className="border-b"><td className="py-2">7</td><td>17.3</td><td>54.4</td></tr>
                    <tr className="border-b"><td className="py-2">8</td><td>18.1</td><td>56.9</td></tr>
                    <tr className="border-b"><td className="py-2">9</td><td>18.9</td><td>59.5</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-normal text-foreground mb-4">الأساور</h2>
              <p className="text-sm font-light text-foreground leading-relaxed mb-4">
                قيسي محيط معصمك ثم أضيفي 1-2 سم للحصول على المقاس المناسب حسب تفضيلك للإحكام.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-right font-normal">المقاس</th>
                      <th className="py-3 text-right font-normal">محيط المعصم (سم)</th>
                    </tr>
                  </thead>
                  <tbody className="font-light">
                    <tr className="border-b"><td className="py-2">صغير</td><td>14-15</td></tr>
                    <tr className="border-b"><td className="py-2">متوسط</td><td>15.5-17</td></tr>
                    <tr className="border-b"><td className="py-2">كبير</td><td>17.5-19</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-normal text-foreground mb-4">القلادات</h2>
              <p className="text-sm font-light text-foreground leading-relaxed mb-4">
                اختاري طول القلادة بناءً على كيفية ارتدائها:
              </p>
              <ul className="text-sm font-light text-foreground space-y-2">
                <li><strong>40 سم:</strong> تحيط بالعنق بشكل محكم</li>
                <li><strong>45 سم:</strong> تستقر على عظمة الترقوة</li>
                <li><strong>50 سم:</strong> تسقط تحت عظمة الترقوة قليلاً</li>
                <li><strong>60 سم:</strong> طول متوسط للأناقة اليومية</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
