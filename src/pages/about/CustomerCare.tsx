import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import AboutSidebar from "../../components/about/AboutSidebar";

const CustomerCare = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
        <PageHeader 
          title="خدمة العملاء" 
          subtitle="نحن هنا لمساعدتك في جميع احتياجات المجوهرات الخاصة بك"
        />
        
        <ContentSection title="معلومات الاتصال">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-light text-foreground">الهاتف</h3>
              <p className="text-muted-foreground" dir="ltr">+966 11 555 0123</p>
              <p className="text-sm text-muted-foreground">السبت-الخميس: ٩ص-٦م<br />الجمعة: مغلق</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-light text-foreground">البريد الإلكتروني</h3>
              <p className="text-muted-foreground">care@felixjewelry.com</p>
              <p className="text-sm text-muted-foreground">الرد خلال ٢٤ ساعة</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-light text-foreground">المحادثة المباشرة</h3>
              <Button variant="outline" className="rounded-none">
                ابدأ المحادثة
              </Button>
              <p className="text-sm text-muted-foreground">متاح خلال ساعات العمل</p>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="الأسئلة الشائعة">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="shipping" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                ما هي خيارات الشحن والمدة المتوقعة؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                نقدم شحن مجاني قياسي (٣-٥ أيام عمل) للطلبات التي تزيد عن ١٠٠٠ ر.س. الشحن السريع (١-٢ يوم عمل) متاح مقابل ٥٠ ر.س. جميع الطلبات مؤمنة بالكامل وتتطلب توقيع عند الاستلام.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                ما هي سياسة الإرجاع والاستبدال؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                نقدم سياسة إرجاع لمدة ٣٠ يوماً للمنتجات غير المستخدمة بحالتها الأصلية. المنتجات المخصصة والمنقوشة غير قابلة للإرجاع. الإرجاع مجاني مع ملصق الشحن المدفوع مسبقاً.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="warranty" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                ما الضمان الذي تقدمونه على مجوهراتكم؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                جميع مجوهرات فيليكس تأتي مع ضمان مدى الحياة ضد عيوب التصنيع. يشمل ذلك إصلاحات مجانية للاستخدام العادي وتثبيت الأحجار والتنظيف الاحترافي.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sizing" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                هل يمكنني تغيير مقاس المجوهرات بعد الشراء؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                نعم، نقدم تغيير مقاس مجاني للخواتم خلال ٦٠ يوماً من الشراء (حتى مقاسين). تغيير المقاس الإضافي متاح برسوم خدمة. بعض التصاميم لا يمكن تغيير مقاسها بسبب طريقة تصنيعها.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="care" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                كيف أعتني بمجوهرات فيليكس؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                احفظ القطع بشكل منفصل في أكياس ناعمة، تجنب ملامسة المواد الكيميائية ومستحضرات التجميل، ونظفها برفق بقطعة قماش ناعمة. ننصح بالتنظيف الاحترافي كل ٦-١٢ شهراً.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="authentication" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-right hover:no-underline">
                كيف يمكنني التحقق من أصالة مجوهراتي؟
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                كل قطعة من فيليكس تأتي مع شهادة أصالة ومختومة. يمكنك التحقق من الأصالة على موقعنا باستخدام رقم القطعة الفريد أو الاتصال بفريق خدمة العملاء.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ContentSection>

        <ContentSection title="نموذج الاتصال">
          <div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-light text-foreground">الاسم الأول</label>
                  <Input className="rounded-none" placeholder="أدخل اسمك الأول" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-light text-foreground">اسم العائلة</label>
                  <Input className="rounded-none" placeholder="أدخل اسم عائلتك" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-light text-foreground">البريد الإلكتروني</label>
                <Input type="email" className="rounded-none" placeholder="أدخل بريدك الإلكتروني" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-light text-foreground">رقم الطلب (اختياري)</label>
                <Input className="rounded-none" placeholder="أدخل رقم طلبك إن وجد" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-light text-foreground">كيف يمكننا مساعدتك؟</label>
                <Textarea 
                  className="rounded-none min-h-[120px]" 
                  placeholder="يرجى وصف استفسارك بالتفصيل"
                />
              </div>
              
              <Button type="submit" className="w-full rounded-none">
                إرسال الرسالة
              </Button>
            </form>
          </div>
        </ContentSection>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerCare;
