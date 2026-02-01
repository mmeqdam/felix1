"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light text-foreground mb-8">قصتنا</h1>
          
          <div className="aspect-video mb-8 overflow-hidden">
            <img 
              src="/founders.png" 
              alt="مؤسسو فيليكس" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6 text-sm font-light text-foreground leading-relaxed">
            <p>
              وُلدت فيليكس من لقاء عقلين رأيا الجمال ليس فقط في الزينة، بل في البنية. بخلفيات تمتد من العمارة إلى الفنون الجميلة، آمن المؤسسون أن المجوهرات يمكن أن تكون أكثر من مجرد زخرفة - يمكن أن تكون امتداداً للمساحة والضوء والخط.
            </p>
            
            <p>
              تأسست فيليكس في الرياض عام 2020، وتجمع بين التراث العربي الأصيل والتصميم المعاصر. كل قطعة نصنعها تحكي قصة، تحمل في طياتها إرث الحرفية التقليدية ممزوجاً برؤية عصرية للأناقة.
            </p>
            
            <p>
              نؤمن بأن المجوهرات الحقيقية ليست مجرد إكسسوارات، بل هي قطع فنية تعكس شخصية من يرتديها. لذلك نحرص على أن تكون كل قطعة فريدة، مصنوعة بعناية فائقة من أجود المواد.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-12 mb-4">فلسفتنا</h2>
            
            <p>
              نسعى في فيليكس لخلق قطع تدوم مدى الحياة. نختار الذهب والفضة والأحجار الكريمة من مصادر أخلاقية، ونعمل مع حرفيين محليين يتقنون فن صناعة المجوهرات منذ أجيال.
            </p>
            
            <p>
              كل تصميم يمر بمراحل متعددة من الابتكار والتطوير، من الرسم الأولي إلى النموذج الأول، حتى الوصول للقطعة النهائية التي تفخرين بارتدائها.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
