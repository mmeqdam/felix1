"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light text-foreground mb-8">الاستدامة</h1>
          
          <div className="space-y-6 text-sm font-light text-foreground leading-relaxed">
            <p>
              في فيليكس، نؤمن بأن الفخامة الحقيقية تأتي من المسؤولية. نلتزم بممارسات مستدامة في كل مرحلة من مراحل صناعة مجوهراتنا.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-12 mb-4">مصادر أخلاقية</h2>
            
            <p>
              نحرص على الحصول على جميع موادنا من مصادر معتمدة وأخلاقية. نعمل فقط مع موردين يلتزمون بأعلى معايير التعدين المسؤول وحقوق العمال.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-12 mb-4">حرفية محلية</h2>
            
            <p>
              ندعم الحرفيين المحليين ونحافظ على التقنيات التقليدية في صناعة المجوهرات. هذا لا يضمن فقط جودة استثنائية، بل يساهم أيضاً في دعم المجتمعات المحلية.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-12 mb-4">تغليف صديق للبيئة</h2>
            
            <p>
              نستخدم مواد تغليف قابلة لإعادة التدوير أو قابلة للتحلل. صناديقنا مصنوعة من ورق معاد تدويره، وأكياسنا من قماش عضوي يمكن إعادة استخدامه.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-12 mb-4">جودة تدوم</h2>
            
            <p>
              نصمم مجوهراتنا لتدوم أجيالاً. الاستدامة الحقيقية تعني خلق قطع لن تُستبدل بسرعة، بل ستُورث وتُحب على مر السنين.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
