import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import ImageTextBlock from "../../components/about/ImageTextBlock";
import AboutSidebar from "../../components/about/AboutSidebar";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
          <PageHeader 
            title="قصتنا" 
            subtitle="رحلة من الشغف والحرفية والأناقة الخالدة"
          />
          
          <ContentSection>
            <ImageTextBlock
              image="/founders.png"
              imageAlt="مؤسسو الشركة"
              title="نشأت من الشغف"
              content="ولدت فيليكس للمجوهرات من رؤية مشتركة لإنشاء قطع خالدة تتجاوز الموضة العابرة. مؤسسونا، متحدون بشغفهم للحرفية الاستثنائية والممارسات المستدامة، أسسوا العلامة التجارية بالتزام بإنشاء مجوهرات تروي قصة - قصتك."
              imagePosition="left"
            />
          </ContentSection>

          <ContentSection title="تراثنا">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-light text-foreground">الحرفية التقليدية</h3>
                <p className="text-muted-foreground leading-relaxed">
                  كل قطعة في مجموعتنا مصنوعة يدوياً بدقة من قبل حرفيين مهرة صقلوا مهاراتهم عبر الأجيال. نحن نكرم التقنيات التقليدية مع تبني الابتكار الحديث، مما يضمن أن كل قطعة تلبي معاييرنا الصارمة للجودة والجمال.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-light text-foreground">مستقبل مستدام</h3>
                <p className="text-muted-foreground leading-relaxed">
                  نؤمن بأن الفخامة والاستدامة يمكن أن تتعايشا بشكل جميل. التزامنا بالمصادر الأخلاقية والمواد المعاد تدويرها وممارسات التصنيع المسؤولة يضمن أن كل قطعة ترتديها تساهم في مستقبل أكثر استدامة.
                </p>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="قيمنا">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">التميز</h3>
                <p className="text-muted-foreground">
                  نسعى للكمال في كل تفصيل، من مفهوم التصميم الأولي إلى اللمسة النهائية.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">الأصالة</h3>
                <p className="text-muted-foreground">
                  كل قطعة تعكس حرفية حقيقية وتروي قصة أصيلة من الفن والعناية.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">الابتكار</h3>
                <p className="text-muted-foreground">
                  نطور تصاميمنا وتقنياتنا باستمرار مع احترام المبادئ الجمالية الخالدة.
                </p>
              </div>
            </div>
          </ContentSection>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default OurStory;
