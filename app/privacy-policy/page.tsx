"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light text-foreground mb-8">سياسة الخصوصية</h1>
          
          <div className="space-y-6 text-sm font-light text-foreground leading-relaxed">
            <p>
              نحن في فيليكس نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-8 mb-4">المعلومات التي نجمعها</h2>
            <p>نجمع المعلومات التالية عند استخدامك لموقعنا:</p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>الاسم والبريد الإلكتروني ورقم الهاتف</li>
              <li>عنوان الشحن والفوترة</li>
              <li>تفاصيل الطلبات وتاريخ الشراء</li>
              <li>معلومات الدفع (تُعالج بشكل آمن عبر مزودي الخدمة)</li>
            </ul>
            
            <h2 className="text-xl font-normal text-foreground mt-8 mb-4">كيف نستخدم معلوماتك</h2>
            <p>نستخدم المعلومات المجمعة من أجل:</p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>معالجة وتوصيل طلباتك</li>
              <li>التواصل معك بشأن طلباتك</li>
              <li>تحسين تجربتك على موقعنا</li>
              <li>إرسال عروض تسويقية (بموافقتك)</li>
            </ul>
            
            <h2 className="text-xl font-normal text-foreground mt-8 mb-4">حماية البيانات</h2>
            <p>
              نتخذ إجراءات أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الكشف أو الإتلاف.
            </p>
            
            <h2 className="text-xl font-normal text-foreground mt-8 mb-4">حقوقك</h2>
            <p>
              لديك الحق في الوصول إلى بياناتك الشخصية وتصحيحها أو حذفها. للاستفسارات المتعلقة بالخصوصية، يرجى التواصل معنا على info@felixjewelry.com
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
