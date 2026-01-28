import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import AboutSidebar from "../../components/about/AboutSidebar";

const Sustainability = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
        <PageHeader 
          title="الاستدامة" 
          subtitle="صناعة مجوهرات جميلة مع حماية كوكبنا للأجيال القادمة"
        />
        
        <ContentSection title="التزامنا البيئي">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-xl font-light text-foreground">المصادر الأخلاقية</h3>
              <p className="text-muted-foreground leading-relaxed">
                نتعاون فقط مع الموردين الذين يشاركوننا التزامنا بالممارسات الأخلاقية. كل حجر كريم ومعدن ثمين في مجموعتنا يتم الحصول عليه بشكل مسؤول، مع شفافية كاملة في سلسلة التوريد لدينا.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-light text-foreground">المواد المعاد تدويرها</h3>
              <p className="text-muted-foreground leading-relaxed">
                أكثر من ٨٠٪ من معادننا الثمينة تأتي من مصادر معاد تدويرها، مما يقلل من التأثير البيئي للتعدين مع الحفاظ على أعلى معايير الجودة لمجوهراتنا.
              </p>
            </div>
          </div>

          <div className="bg-muted/10 rounded-lg p-8">
            <h3 className="text-2xl font-light text-foreground mb-6">أهداف التأثير</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-light text-primary mb-2">١٠٠٪</div>
                <p className="text-sm text-muted-foreground">عمليات محايدة للكربون بحلول ٢٠٢٥</p>
              </div>
              <div>
                <div className="text-3xl font-light text-primary mb-2">٩٠٪</div>
                <p className="text-sm text-muted-foreground">مواد تغليف معاد تدويرها</p>
              </div>
              <div>
                <div className="text-3xl font-light text-primary mb-2">صفر</div>
                <p className="text-sm text-muted-foreground">سياسة نفايات صفر للمكبات</p>
              </div>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="الاقتصاد الدائري">
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              نؤمن بقوة التصميم الدائري - صنع مجوهرات يمكن الاعتزاز بها وإصلاحها وإعادة تدويرها في النهاية إلى قطع جديدة.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">العناية مدى الحياة</h3>
                <p className="text-muted-foreground">
                  كل قطعة تأتي مع وعد العناية مدى الحياة، بما في ذلك التنظيف الاحترافي والإصلاحات وخدمات تغيير المقاس.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">برنامج الاسترداد</h3>
                <p className="text-muted-foreground">
                  عندما تكون مستعداً لشيء جديد، سنستعيد مجوهرات فيليكس الخاصة بك لإعادة تدويرها إلى قطع مستقبلية.
                </p>
              </div>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="الشهادات والشراكات">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              التزامنا بالاستدامة موثق من خلال شراكات مع منظمات رائدة وشهادات تحاسبنا على أعلى المعايير.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8 items-center">
              <div className="h-16 w-32 bg-muted/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">RJC معتمد</span>
              </div>
              <div className="h-16 w-32 bg-muted/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">B Corp</span>
              </div>
              <div className="h-16 w-32 bg-muted/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">SCS معتمد</span>
              </div>
              <div className="h-16 w-32 bg-muted/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">التجارة العادلة</span>
              </div>
            </div>
          </div>
        </ContentSection>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Sustainability;
