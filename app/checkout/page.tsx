"use client";

import { useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const formatPrice = (price: number) => {
  return `${price.toLocaleString('ar-SA')} ر.س`;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { items, loading: cartLoading, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ""
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "المملكة العربية السعودية"
  });
  const [shippingOption, setShippingOption] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

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

  const getShippingCost = () => {
    switch (shippingOption) {
      case "express":
        return 55;
      case "overnight":
        return 130;
      default:
        return 0;
    }
  };
  
  const shipping = getShippingCost();
  const total = subtotal + shipping;

  const validateForm = () => {
    if (!customerDetails.email || !customerDetails.firstName || !customerDetails.lastName) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return false;
    }
    if (!shippingAddress.address || !shippingAddress.city) {
      toast({
        title: "خطأ",
        description: "يرجى ملء عنوان الشحن",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleCompleteOrder = async () => {
    if (!validateForm()) return;
    if (items.length === 0) {
      toast({
        title: "السلة فارغة",
        description: "يرجى إضافة منتجات إلى السلة أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const orderNumber = `ORD-${new Date().toISOString().slice(0,10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

      const orderInsert = {
        order_number: orderNumber,
        subtotal: subtotal,
        shipping_cost: shipping,
        tax: 0,
        total: total,
        status: 'pending',
        payment_status: 'pending',
        shipping_address: {
          full_name: `${customerDetails.firstName} ${customerDetails.lastName}`,
          email: customerDetails.email,
          phone: customerDetails.phone,
          address_line1: shippingAddress.address,
          city: shippingAddress.city,
          postal_code: shippingAddress.postalCode,
          country: shippingAddress.country
        },
        user_id: user?.id || null
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderInsert])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product?.name || 'منتج',
        product_image: item.product?.images?.[0]?.image_url || null,
        quantity: item.quantity,
        unit_price: item.product?.price || 0,
        total_price: (item.product?.price || 0) * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      await clearCart();
      
      setPaymentComplete(true);
      
      toast({
        title: "تم إنشاء الطلب بنجاح",
        description: `رقم الطلب: ${order.order_number}`,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الطلب",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cartLoading && items.length === 0 && !paymentComplete) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="pt-6 pb-12">
          <div className="max-w-7xl mx-auto px-6 text-center py-16">
            <h1 className="text-2xl font-light text-foreground mb-4">سلة التسوق فارغة</h1>
            <p className="text-muted-foreground mb-8">يرجى إضافة منتجات إلى السلة لإتمام عملية الشراء</p>
            <Button asChild>
              <Link href="/category/shop">تصفح المنتجات</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="pt-6 pb-12">
          <div className="max-w-2xl mx-auto px-6 py-16 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-light text-foreground mb-4">تم استلام طلبك!</h1>
            <p className="text-muted-foreground mb-2">شكراً لك على طلبك</p>
            <p className="text-muted-foreground mb-8">
              ستصلك رسالة تأكيد على بريدك الإلكتروني قريباً
            </p>
            <div className="space-x-4 space-x-reverse">
              {user && (
                <Button asChild variant="outline" className="rounded-none">
                  <Link href="/orders">عرض طلباتي</Link>
                </Button>
              )}
              <Button asChild className="rounded-none">
                <Link href="/">العودة للرئيسية</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-light text-foreground mb-8">إتمام الشراء</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 lg:order-2">
              <div className="bg-muted/20 p-8 sticky top-6">
                <h2 className="text-lg font-light text-foreground mb-6">ملخص الطلب</h2>
                
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-muted overflow-hidden">
                        <img 
                          src={getProductImage(item)} 
                          alt={item.product?.name || 'منتج'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-light text-foreground">{item.product?.name}</h3>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0 rounded-none border-muted-foreground/20"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium text-foreground min-w-[2ch] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 rounded-none border-muted-foreground/20"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-foreground font-medium">
                        {formatPrice(item.product?.price || 0)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-muted-foreground/20 mt-6 pt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الشحن</span>
                    <span className="text-foreground">{shipping === 0 ? 'مجاني' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium pt-2 border-t border-muted-foreground/20">
                    <span className="text-foreground">الإجمالي</span>
                    <span className="text-foreground">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:order-1 space-y-8">
              <div className="bg-muted/20 p-8">
                <h2 className="text-lg font-light text-foreground mb-6">بيانات العميل</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-light text-foreground">
                      البريد الإلكتروني *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-2 rounded-none"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-light text-foreground">
                        الاسم الأول *
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={customerDetails.firstName}
                        onChange={(e) => setCustomerDetails(prev => ({ ...prev, firstName: e.target.value }))}
                        className="mt-2 rounded-none"
                        placeholder="الاسم الأول"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-light text-foreground">
                        اسم العائلة *
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={customerDetails.lastName}
                        onChange={(e) => setCustomerDetails(prev => ({ ...prev, lastName: e.target.value }))}
                        className="mt-2 rounded-none"
                        placeholder="اسم العائلة"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-light text-foreground">
                      رقم الهاتف
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-2 rounded-none"
                      placeholder="أدخل رقم هاتفك"
                    />
                  </div>

                  <div className="border-t border-muted-foreground/20 pt-6 mt-8">
                    <h3 className="text-base font-light text-foreground mb-4">عنوان الشحن</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="shippingAddress" className="text-sm font-light text-foreground">
                          العنوان *
                        </Label>
                        <Input
                          id="shippingAddress"
                          type="text"
                          value={shippingAddress.address}
                          onChange={(e) => setShippingAddress(prev => ({ ...prev, address: e.target.value }))}
                          className="mt-2 rounded-none"
                          placeholder="عنوان الشارع"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shippingCity" className="text-sm font-light text-foreground">
                            المدينة *
                          </Label>
                          <Input
                            id="shippingCity"
                            type="text"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                            className="mt-2 rounded-none"
                            placeholder="المدينة"
                          />
                        </div>
                        <div>
                          <Label htmlFor="shippingPostalCode" className="text-sm font-light text-foreground">
                            الرمز البريدي
                          </Label>
                          <Input
                            id="shippingPostalCode"
                            type="text"
                            value={shippingAddress.postalCode}
                            onChange={(e) => setShippingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                            className="mt-2 rounded-none"
                            placeholder="الرمز البريدي"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 p-8">
                <h2 className="text-lg font-light text-foreground mb-6">خيارات الشحن</h2>
                
                <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="font-light">شحن قياسي (3-5 أيام)</Label>
                    </div>
                    <span className="text-foreground">مجاني</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="font-light">شحن سريع (1-2 أيام)</Label>
                    </div>
                    <span className="text-foreground">{formatPrice(55)}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <Label htmlFor="overnight" className="font-light">توصيل في نفس اليوم</Label>
                    </div>
                    <span className="text-foreground">{formatPrice(130)}</span>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                className="w-full rounded-none" 
                size="lg"
                onClick={handleCompleteOrder}
                disabled={isProcessing}
              >
                {isProcessing ? "جاري المعالجة..." : `إتمام الطلب - ${formatPrice(total)}`}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
