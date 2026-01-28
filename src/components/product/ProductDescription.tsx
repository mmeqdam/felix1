import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewProduct from "./ReviewProduct";

const CustomStar = ({ filled, className }: { filled: boolean; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={`w-3 h-3 ${filled ? 'text-foreground' : 'text-muted-foreground/30'} ${className}`}
  >
    <path 
      fillRule="evenodd" 
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" 
      clipRule="evenodd" 
    />
  </svg>
);

const ProductDescription = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  return (
    <div className="space-y-0 mt-8 border-t border-border" dir="rtl">
      {/* Description */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>الوصف</span>
          {isDescriptionOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {isDescriptionOpen && (
          <div className="pb-6 space-y-4">
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              تجسد هذه القطعة الأناقة المعمارية بتصميمها الهندسي النظيف.
              مستوحاة من العمارة الكلاسيكية، تتميز هذه القطعة المميزة بتفاعل متطور
              بين المنحنيات والزوايا التي تلتقط الضوء وتعكسه بشكل جميل.
            </p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              كل قطعة مصنوعة بدقة من الفضة الإسترلينية الفاخرة مع طلاء ذهب عيار ١٨،
              مما يضمن المتانة والفخامة. الجمالية البسيطة تجعلها مثالية للارتداء اليومي والمناسبات الخاصة.
            </p>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>تفاصيل المنتج</span>
          {isDetailsOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {isDetailsOpen && (
          <div className="pb-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">رقم المنتج</span>
              <span className="text-sm font-light text-foreground">FE-PTH-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">المجموعة</span>
              <span className="text-sm font-light text-foreground">السلسلة المعمارية</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">نوع القفل</span>
              <span className="text-sm font-light text-foreground">عمود مع ظهر فراشة</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">مضاد للحساسية</span>
              <span className="text-sm font-light text-foreground">نعم</span>
            </div>
          </div>
        )}
      </div>

      {/* Care Instructions */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsCareOpen(!isCareOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>العناية والتنظيف</span>
          {isCareOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {isCareOpen && (
          <div className="pb-6 space-y-4">
            <ul className="space-y-2">
              <li className="text-sm font-light text-muted-foreground">• نظف بقطعة قماش ناعمة وجافة بعد كل ارتداء</li>
              <li className="text-sm font-light text-muted-foreground">• تجنب ملامسة العطور والمستحضرات ومنتجات التنظيف</li>
              <li className="text-sm font-light text-muted-foreground">• احفظ في الحقيبة المرفقة عند عدم الارتداء</li>
              <li className="text-sm font-light text-muted-foreground">• اخلع قبل السباحة أو ممارسة الرياضة أو الاستحمام</li>
            </ul>
            <p className="text-sm font-light text-muted-foreground">
              للتنظيف الاحترافي، قم بزيارة صائغ محلي أو تواصل مع فريق خدمة العملاء لدينا.
            </p>
          </div>
        )}
      </div>

      {/* Customer Reviews */}
      <div className="border-b border-border lg:mb-16">
        <Button
          variant="ghost"
          onClick={() => setIsReviewsOpen(!isReviewsOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <div className="flex items-center gap-3">
            <span>تقييمات العملاء</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <CustomStar
                  key={star}
                  filled={star <= 4.8}
                />
              ))}
              <span className="text-sm font-light text-muted-foreground mr-1">٤.٨</span>
            </div>
          </div>
          {isReviewsOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {isReviewsOpen && (
          <div className="pb-6 space-y-6">
            {/* Review Product Button */}
            <ReviewProduct />

            {/* Reviews List */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CustomStar
                        key={star}
                        filled={true}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-light text-muted-foreground">سارة م.</span>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  "أقراط رائعة جداً! الجودة استثنائية وتناسب كل شيء.
                  التصميم المعماري فريد جداً وأحصل على الإطراء في كل مرة أرتديها."
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CustomStar
                        key={star}
                        filled={star <= 4}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-light text-muted-foreground">نورة ت.</span>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  "حرفية جميلة ومريحة للارتداء طوال اليوم. طلاء الذهب صمد بشكل مثالي
                  بعد أشهر من الارتداء المنتظم. أوصي بها بشدة!"
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CustomStar
                        key={star}
                        filled={true}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-light text-muted-foreground">ريم ر.</span>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  "هذه الأقراط عمل فني. التصميم البسيط أنيق ومتطور.
                  الوزن مثالي والتغليف كان جميلاً أيضاً."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
