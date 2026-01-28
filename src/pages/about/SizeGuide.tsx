import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import { Button } from "../../components/ui/button";
import AboutSidebar from "../../components/about/AboutSidebar";

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
        <PageHeader 
          title="دليل المقاسات" 
          subtitle="اعثر على مقاسك المثالي مع دليلنا الشامل"
        />
        
        <ContentSection title="مقاسات الخواتم">
          <div className="space-y-8">
            <div className="bg-muted/10 rounded-lg p-8">
              <h3 className="text-xl font-light text-foreground mb-6">كيفية قياس مقاس خاتمك</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">الطريقة الأولى: باستخدام خاتم لديك</h4>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>خذ خاتماً يناسب إصبعك المطلوب بشكل مريح</li>
                    <li>ضعه على مسطرة وقس القطر الداخلي بالمليمترات</li>
                    <li>استخدم جدول المقاسات أدناه للعثور على مقاسك</li>
                  </ol>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">الطريقة الثانية: باستخدام خيط أو ورق</h4>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>لف خيطاً أو ورقاً حول إصبعك حيث سيستقر الخاتم</li>
                    <li>حدد النقطة التي يتداخل فيها الخيط</li>
                    <li>قس الطول بالمليمترات</li>
                    <li>اقسم على ٣.١٤ للحصول على القطر</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/20">
                    <th className="border border-border p-3 text-right font-light">المقاس الأمريكي</th>
                    <th className="border border-border p-3 text-right font-light">المقاس البريطاني</th>
                    <th className="border border-border p-3 text-right font-light">المقاس الأوروبي</th>
                    <th className="border border-border p-3 text-right font-light">القطر (مم)</th>
                    <th className="border border-border p-3 text-right font-light">المحيط (مم)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { us: "٥", uk: "J", eu: "٤٩", diameter: "١٥.٦", circumference: "٤٩.٠" },
                    { us: "٥.٥", uk: "K", eu: "٥٠", diameter: "١٦.٠", circumference: "٥٠.٢" },
                    { us: "٦", uk: "L", eu: "٥١", diameter: "١٦.٤", circumference: "٥١.٥" },
                    { us: "٦.٥", uk: "M", eu: "٥٢", diameter: "١٦.٨", circumference: "٥٢.٨" },
                    { us: "٧", uk: "N", eu: "٥٤", diameter: "١٧.٢", circumference: "٥٤.٠" },
                    { us: "٧.٥", uk: "O", eu: "٥٥", diameter: "١٧.٦", circumference: "٥٥.٣" },
                    { us: "٨", uk: "P", eu: "٥٦", diameter: "١٨.٠", circumference: "٥٦.٥" },
                    { us: "٨.٥", uk: "Q", eu: "٥٧", diameter: "١٨.٤", circumference: "٥٧.٨" },
                    { us: "٩", uk: "R", eu: "٥٩", diameter: "١٨.٨", circumference: "٥٩.١" }
                  ].map((size, index) => (
                    <tr key={index} className="hover:bg-muted/10">
                      <td className="border border-border p-3">{size.us}</td>
                      <td className="border border-border p-3">{size.uk}</td>
                      <td className="border border-border p-3">{size.eu}</td>
                      <td className="border border-border p-3">{size.diameter}</td>
                      <td className="border border-border p-3">{size.circumference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="مقاسات الأساور والقلادات">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-light text-foreground">مقاسات الأساور</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">صغير</span>
                  <span className="text-foreground">١٦.٥ - ١٧.٨ سم</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">وسط</span>
                  <span className="text-foreground">١٧.٨ - ١٩ سم</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">كبير</span>
                  <span className="text-foreground">١٩ - ٢٠.٣ سم</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-light text-foreground">أطوال القلادات</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">تشوكر (قصير)</span>
                  <span className="text-foreground">٣٥ - ٤٠ سم</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">برنسيس (متوسط)</span>
                  <span className="text-foreground">٤٣ - ٤٨ سم</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">ماتينيه</span>
                  <span className="text-foreground">٥٠ - ٦٠ سم</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">أوبرا (طويل)</span>
                  <span className="text-foreground">٧٠ - ٩٠ سم</span>
                </div>
              </div>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="تحتاج مساعدة؟">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              لا تزال غير متأكد من المقاس؟ مستشارو المجوهرات لدينا هنا لمساعدتك في العثور على المقاس المثالي.
              قم بتحميل دليل المقاسات أو احجز استشارة افتراضية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="rounded-none">
                تحميل الدليل PDF
              </Button>
              <Button className="rounded-none">
                حجز استشارة
              </Button>
            </div>
          </div>
        </ContentSection>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default SizeGuide;
