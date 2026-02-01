"use client";

import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

interface ShoppingBagProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFavorites?: () => void;
}

const ShoppingBag = ({ isOpen, onClose, onViewFavorites }: ShoppingBagProps) => {
  const { items, loading, subtotal, updateQuantity, removeFromCart } = useCart();

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ar-SA')} ر.س`;
  };

  const getProductImage = (item: typeof items[0]) => {
    if (item.product?.images && item.product.images.length > 0) {
      return item.product.images[0].image_url;
    }
    return "/placeholder.jpg";
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 h-screen">
      <div 
        className="absolute inset-0 bg-black/50 h-screen"
        onClick={onClose}
      />
      
      <div className="absolute right-0 top-0 h-screen w-96 bg-background border-l border-border animate-slide-in-right flex flex-col" dir="rtl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-light text-foreground">سلة التسوق</h2>
          <button
            onClick={onClose}
            className="p-2 text-foreground hover:text-muted-foreground transition-colors"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col p-6">
          {onViewFavorites && (
            <div className="md:hidden mb-6 pb-6 border-b border-border">
              <button
                onClick={onViewFavorites}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-border rounded-lg text-nav-foreground hover:text-nav-hover hover:border-nav-hover transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <span className="text-sm font-light">عرض المفضلة</span>
              </button>
            </div>
          )}
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">جاري التحميل...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-sm text-center">
                سلة التسوق فارغة.<br />
                تابع التسوق لإضافة منتجات إلى سلتك.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-6 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-muted/10 rounded-lg overflow-hidden">
                      <img 
                        src={getProductImage(item)} 
                        alt={item.product?.name || 'منتج'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link 
                            href={`/product/${item.product?.slug}`}
                            onClick={onClose}
                            className="text-sm font-medium text-foreground hover:underline"
                          >
                            {item.product?.name}
                          </Link>
                        </div>
                        <p className="text-sm font-light text-foreground">
                          {formatPrice(item.product?.price || 0)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center border border-border">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted/50 transition-colors"
                            aria-label="تقليل الكمية"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-2 text-sm font-light min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted/50 transition-colors"
                            aria-label="زيادة الكمية"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-light text-foreground">المجموع الفرعي</span>
                  <span className="text-sm font-medium text-foreground">{formatPrice(subtotal)}</span>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  الشحن والضرائب تُحسب عند إتمام الطلب
                </p>
                
                <Button 
                  asChild 
                  className="w-full rounded-none" 
                  size="lg"
                  onClick={onClose}
                >
                  <Link href="/checkout">
                    إتمام الشراء
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full rounded-none" 
                  size="lg"
                  onClick={onClose}
                  asChild
                >
                  <Link href="/category/shop">
                    متابعة التسوق
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingBag;
