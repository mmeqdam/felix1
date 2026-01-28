import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import StoreMap from "../../components/about/StoreMap";
import { Button } from "../../components/ui/button";
import AboutSidebar from "../../components/about/AboutSidebar";

const StoreLocator = () => {
  const stores = [
    {
      name: "فيليكس - الرياض",
      address: "شارع الملك فهد، حي العليا، الرياض",
      phone: "+966 11 555 0123",
      hours: "السبت-الخميس: ١٠ص-١٠م، الجمعة: ٤م-١٠م",
      services: ["تسوق شخصي", "تصميم مخصص", "إصلاحات", "تقييم المجوهرات"]
    },
    {
      name: "فيليكس - جدة",
      address: "طريق الأمير محمد بن عبدالعزيز، حي الروضة، جدة",
      phone: "+966 12 666 0456",
      hours: "السبت-الخميس: ١٠ص-١٠م، الجمعة: ٤م-١٠م",
      services: ["تسوق شخصي", "تصميم مخصص", "أجنحة VIP", "إصلاحات"]
    },
    {
      name: "فيليكس - الدمام",
      address: "طريق الملك فيصل، حي الشاطئ، الدمام",
      phone: "+966 13 777 0789",
      hours: "السبت-الخميس: ١٠ص-١٠م، الجمعة: ٤م-١٠م",
      services: ["تسوق مباشر", "إصلاحات", "تغليف الهدايا"]
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
        <PageHeader 
          title="فروعنا" 
          subtitle="زورونا شخصياً لتجربة مجوهرات مميزة"
        />
        
        <ContentSection title="خريطة الفروع">
          <StoreMap />
        </ContentSection>

        <ContentSection title="مواقعنا">
          <div className="grid gap-8">
            {stores.map((store, index) => (
              <div key={index} className="bg-background rounded-lg p-8 border border-border">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-light text-foreground">{store.name}</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>{store.address}</p>
                      <p dir="ltr" className="text-right">{store.phone}</p>
                      <p>{store.hours}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button variant="outline" className="rounded-none">
                        احصل على الاتجاهات
                      </Button>
                      <Button className="rounded-none">
                        احجز موعد
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-light text-foreground">الخدمات المتاحة</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {store.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full ml-3 flex-shrink-0"></span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="المواعيد الخاصة">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              استمتع بخدمة شخصية مع موعد خاص. سيرشدك مستشارو المجوهرات لدينا عبر مجموعاتنا، ويساعدونك في التصاميم المخصصة، ويقدمون نصائح خبيرة في بيئة مريحة وخاصة.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-3">
                <h4 className="text-lg font-light text-foreground">التسوق الشخصي</h4>
                <p className="text-muted-foreground text-sm">
                  إرشاد فردي للعثور على القطعة المثالية لأي مناسبة
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light text-foreground">التصميم المخصص</h4>
                <p className="text-muted-foreground text-sm">
                  اعمل مع مصممينا لإنشاء قطعة فريدة خاصة بك
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light text-foreground">خدمات الخبراء</h4>
                <p className="text-muted-foreground text-sm">
                  تقييمات احترافية وإصلاحات وخدمات صيانة
                </p>
              </div>
            </div>
            
            <div className="pt-8">
              <Button size="lg" className="rounded-none">
                جدول موعدك
              </Button>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="الاستشارات الافتراضية">
          <div className="bg-muted/10 rounded-lg p-8">
            <h3 className="text-xl font-light text-foreground mb-4">لا تستطيع الزيارة شخصياً؟</h3>
            <p className="text-muted-foreground mb-6">
              احجز استشارة افتراضية مع أحد خبراء المجوهرات لدينا. سنعرض القطع عبر مكالمة فيديو،
              ونجيب على أسئلتك، ونساعدك في اختيار القطعة المثالية من راحة منزلك.
            </p>
            <Button variant="outline" className="rounded-none">
              احجز استشارة افتراضية
            </Button>
          </div>
        </ContentSection>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default StoreLocator;
