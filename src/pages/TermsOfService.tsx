import { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "الشروط والأحكام - فيليكس";
  }, []);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">الشروط والأحكام</h1>
            <p className="text-muted-foreground">آخر تحديث: ١٥ يناير ٢٠٢٤</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">الموافقة على الشروط</h2>
              <p className="text-muted-foreground leading-relaxed">
                من خلال الوصول إلى موقع وخدمات فيليكس للمجوهرات واستخدامها، فإنك توافق على الالتزام بشروط وأحكام هذه الاتفاقية. تحكم شروط الخدمة هذه استخدامك لموقعنا ومنتجاتنا وخدماتنا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">ترخيص الاستخدام</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                يُمنح الإذن بتنزيل نسخة واحدة مؤقتاً من المواد على موقع فيليكس للمجوهرات للعرض الشخصي غير التجاري فقط. هذا منح ترخيص وليس نقل ملكية، وبموجب هذا الترخيص لا يجوز لك:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>تعديل أو نسخ المواد</li>
                <li>استخدام المواد لأي غرض تجاري أو للعرض العام</li>
                <li>محاولة عكس هندسة أي برنامج موجود على الموقع</li>
                <li>إزالة أي حقوق نشر أو إشعارات ملكية أخرى من المواد</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">معلومات المنتج والتوفر</h2>
              <p className="text-muted-foreground leading-relaxed">
                نسعى جاهدين لتقديم معلومات دقيقة عن المنتج، بما في ذلك الأوصاف والأسعار والتوفر. ومع ذلك، لا نضمن أن أوصاف المنتج أو المحتوى الآخر دقيق أو كامل أو موثوق أو خالٍ من الأخطاء. نحتفظ بالحق في تعديل أو إيقاف المنتجات دون إشعار مسبق.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">الطلبات والدفع</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-light text-foreground mb-2">قبول الطلب</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    جميع الطلبات خاضعة للقبول والتوفر. نحتفظ بالحق في رفض أو إلغاء أي طلب لأي سبب، بما في ذلك على سبيل المثال لا الحصر توفر المنتج أو أخطاء في معلومات المنتج أو الاشتباه بالاحتيال.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-light text-foreground mb-2">شروط الدفع</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    يستحق الدفع في وقت الشراء. نقبل بطاقات الائتمان الرئيسية وطرق الدفع الأخرى كما هو معروض أثناء الدفع. جميع الأسعار بالريال السعودي ما لم يُذكر خلاف ذلك.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">الشحن والتوصيل</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                سنبذل قصارى جهدنا لشحن الطلبات ضمن الإطار الزمني المحدد. ومع ذلك، تواريخ التسليم تقديرية ولسنا مسؤولين عن التأخيرات الناجمة عن شركات الشحن أو الظروف الخارجة عن سيطرتنا.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ينتقل خطر الفقدان وملكية المنتجات إليك عند التسليم إلى الناقل. لسنا مسؤولين عن الطرود المفقودة أو المسروقة أو التالفة بمجرد تسليمها إلى العنوان المقدم.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">الإرجاع والاستبدال</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                نريد أن تكون راضياً تماماً عن مشترياتك. يُقبل الإرجاع والاستبدال في غضون ٣٠ يوماً من التسليم، وفقاً للشروط التالية:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>يجب أن تكون المنتجات في حالتها وتغليفها الأصلي</li>
                <li>المنتجات المخصصة أو المنقوشة غير قابلة للإرجاع</li>
                <li>تكاليف شحن الإرجاع على حساب العميل</li>
                <li>ستتم معالجة المبالغ المستردة إلى طريقة الدفع الأصلية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">الضمان والعناية</h2>
              <p className="text-muted-foreground leading-relaxed">
                تأتي مجوهراتنا مع ضمان محدود ضد عيوب التصنيع. لا يغطي هذا الضمان الضرر الناتج عن الاستخدام العادي أو العناية غير الصحيحة أو الحوادث. يتم تقديم تعليمات العناية المناسبة مع كل عملية شراء وعلى موقعنا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">الملكية الفكرية</h2>
              <p className="text-muted-foreground leading-relaxed">
                جميع المحتوى على هذا الموقع، بما في ذلك على سبيل المثال لا الحصر النصوص والرسومات والشعارات والصور والبرامج، هي ملك لشركة فيليكس للمجوهرات ومحمية بحقوق النشر والعلامات التجارية وقوانين الملكية الفكرية الأخرى. الاستخدام غير المصرح به محظور.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">تحديد المسؤولية</h2>
              <p className="text-muted-foreground leading-relaxed">
                لن تكون شركة فيليكس للمجوهرات أو مورديها مسؤولين بأي حال من الأحوال عن أي أضرار (بما في ذلك، على سبيل المثال لا الحصر، الأضرار الناجمة عن فقدان البيانات أو الأرباح، أو بسبب انقطاع العمل) الناشئة عن استخدام أو عدم القدرة على استخدام المواد على موقعنا أو منتجاتنا، حتى لو تم إخطارنا باحتمال حدوث مثل هذه الأضرار.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">سياسة الخصوصية</h2>
              <p className="text-muted-foreground leading-relaxed">
                خصوصيتك مهمة بالنسبة لنا. يرجى مراجعة سياسة الخصوصية الخاصة بنا، والتي تحكم أيضاً استخدامك لموقعنا وخدماتنا، لفهم ممارساتنا فيما يتعلق بمعلوماتك الشخصية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">القانون الحاكم</h2>
              <p className="text-muted-foreground leading-relaxed">
                تخضع هذه الشروط والأحكام وتُفسر وفقاً لقوانين المملكة العربية السعودية، وتخضع بشكل لا رجعة فيه للاختصاص القضائي الحصري للمحاكم في المملكة العربية السعودية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">التغييرات على الشروط</h2>
              <p className="text-muted-foreground leading-relaxed">
                نحتفظ بالحق في مراجعة شروط الخدمة هذه في أي وقت دون إشعار. باستخدام هذا الموقع، فإنك توافق على الالتزام بالإصدار الحالي من شروط الخدمة هذه.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">معلومات الاتصال</h2>
              <p className="text-muted-foreground leading-relaxed">
                إذا كانت لديك أي أسئلة حول شروط الخدمة هذه، يرجى التواصل معنا على:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>البريد الإلكتروني: legal@felixjewelry.com</p>
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

export default TermsOfService;
