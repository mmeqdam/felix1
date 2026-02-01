"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function StoreLocatorPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light text-foreground mb-8">فروعنا</h1>
          
          <div className="space-y-8">
            <section className="border border-border p-6">
              <h2 className="text-xl font-normal text-foreground mb-4">فيليكس - الرياض</h2>
              <div className="space-y-2 text-sm font-light text-foreground">
                <p>شارع الملك فهد، حي العليا</p>
                <p>الرياض، المملكة العربية السعودية</p>
                <p className="mt-4"><strong>ساعات العمل:</strong></p>
                <p>السبت - الخميس: 10 صباحاً - 10 مساءً</p>
                <p>الجمعة: 2 مساءً - 10 مساءً</p>
                <p className="mt-4" dir="ltr" style={{ textAlign: 'right' }}><strong>الهاتف:</strong> +966 11 555 0123</p>
              </div>
            </section>
            
            <section className="border border-border p-6">
              <h2 className="text-xl font-normal text-foreground mb-4">فيليكس - جدة</h2>
              <div className="space-y-2 text-sm font-light text-foreground">
                <p>طريق الملك عبدالعزيز، حي الزهراء</p>
                <p>جدة، المملكة العربية السعودية</p>
                <p className="mt-4"><strong>ساعات العمل:</strong></p>
                <p>السبت - الخميس: 10 صباحاً - 10 مساءً</p>
                <p>الجمعة: 2 مساءً - 10 مساءً</p>
                <p className="mt-4" dir="ltr" style={{ textAlign: 'right' }}><strong>الهاتف:</strong> +966 12 666 0123</p>
              </div>
            </section>
            
            <p className="text-sm font-light text-muted-foreground text-center">
              يسعدنا استقبالكم في أي من فروعنا لتجربة تسوق مميزة
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
