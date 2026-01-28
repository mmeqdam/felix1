import { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "سياسة الخصوصية - فيليكس";
  }, []);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">سياسة الخصوصية</h1>
            <p className="text-muted-foreground">آخر تحديث: ١٥ يناير ٢٠٢٤</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">مقدمة</h2>
              <p className="text-muted-foreground leading-relaxed">
                في فيليكس للمجوهرات ("نحن" أو "لدينا")، نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام والإفصاح عن معلوماتك وحمايتها عند زيارتك لموقعنا أو إجراء عملية شراء أو التفاعل مع خدماتنا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">المعلومات التي نجمعها</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-light text-foreground mb-2">المعلومات الشخصية</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    قد نجمع المعلومات الشخصية التي تقدمها لنا مباشرة، بما في ذلك:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>الاسم والبريد الإلكتروني ومعلومات الاتصال</li>
                    <li>عناوين الفواتير والشحن</li>
                    <li>معلومات الدفع (تتم معالجتها بشكل آمن عبر مزودي خدمات خارجيين)</li>
                    <li>تفضيلات الحساب وإعدادات الاتصال</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-light text-foreground mb-2">معلومات الاستخدام</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    نجمع تلقائياً معلومات معينة حول جهازك وأنماط الاستخدام، بما في ذلك عنوان IP ونوع المتصفح والصفحات التي تمت زيارتها وبيانات التفاعل لتحسين خدماتنا وتجربة المستخدم.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">كيف نستخدم معلوماتك</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                نستخدم المعلومات التي نجمعها لأغراض مختلفة، بما في ذلك:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>معالجة وتنفيذ طلباتك</li>
                <li>تقديم دعم العملاء والرد على الاستفسارات</li>
                <li>إرسال الاتصالات الترويجية (بموافقتك)</li>
                <li>تحسين وظائف موقعنا وتجربة المستخدم</li>
                <li>منع الاحتيال وضمان الأمان</li>
                <li>الامتثال للالتزامات القانونية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">مشاركة المعلومات والإفصاح عنها</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                نحن لا نبيع أو نتاجر أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط في الحالات التالية:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>مع مزودي الخدمات الذين يساعدوننا في تشغيل أعمالنا</li>
                <li>عندما يقتضي القانون ذلك أو لحماية حقوقنا</li>
                <li>فيما يتعلق بمعاملة تجارية (اندماج أو استحواذ، إلخ)</li>
                <li>بموافقتك الصريحة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">أمان البيانات</h2>
              <p className="text-muted-foreground leading-relaxed">
                ننفذ التدابير التقنية والتنظيمية المناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة ١٠٠٪.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">حقوقك وخياراتك</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                حسب موقعك، قد يكون لديك حقوق معينة فيما يتعلق بمعلوماتك الشخصية:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>الوصول إلى معلوماتك الشخصية</li>
                <li>تصحيح المعلومات غير الدقيقة أو غير المكتملة</li>
                <li>حذف معلوماتك الشخصية</li>
                <li>الاعتراض على المعالجة أو تقييدها</li>
                <li>نقل البيانات</li>
                <li>سحب الموافقة (حيثما ينطبق)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">ملفات تعريف الارتباط والتتبع</h2>
              <p className="text-muted-foreground leading-relaxed">
                نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتحسين تجربة التصفح وتحليل حركة مرور الموقع وتخصيص المحتوى. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال تفضيلات المتصفح، على الرغم من أن هذا قد يؤثر على وظائف الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">التغييرات على هذه السياسة</h2>
              <p className="text-muted-foreground leading-relaxed">
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية عن طريق نشر السياسة الجديدة على موقعنا وتحديث تاريخ "آخر تحديث" أعلاه.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">تواصل معنا</h2>
              <p className="text-muted-foreground leading-relaxed">
                إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات الخصوصية لدينا، يرجى التواصل معنا على:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>البريد الإلكتروني: privacy@felixjewelry.com</p>
                <p dir="ltr" className="text-right">الهاتف: +966 11 555 0123</p>
                <p>العنوان: شارع الملك فهد، الرياض، المملكة العربية السعودية</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
