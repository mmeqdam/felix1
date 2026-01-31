import { useState } from "react";
import { Minus, Plus, CreditCard, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutHeader from "../components/header/CheckoutHeader";
import Footer from "../components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import pantheonImage from "@/assets/pantheon.jpg";

const formatPrice = (price: number) => {
  return `${price.toLocaleString('ar-SA')} ر.س`;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, loading: cartLoading, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
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
  const [hasSeparateBilling, setHasSeparateBilling] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "المملكة العربية السعودية"
  });
  const [shippingOption, setShippingOption] = useState("standard");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const getProductImage = (item: typeof items[0]) => {
    if (item.product?.images && item.product.images.length > 0) {
      return item.product.images[0].image_url;
    }
    return pantheonImage;
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
        return 0; // Standard shipping is free
    }
  };
  
  const shipping = getShippingCost();
  const total = subtotal + shipping;

  const handleDiscountSubmit = () => {
    console.log("Discount code submitted:", discountCode);
    setShowDiscountInput(false);
  };

  const handleCustomerDetailsChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleShippingAddressChange = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleBillingDetailsChange = (field: string, value: string) => {
    setBillingDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentDetailsChange = (field: string, value: string) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

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
      // Generate order number
      const orderNumber = `ORD-${new Date().toISOString().slice(0,10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

      // Create order
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
        billing_address: hasSeparateBilling ? {
          full_name: `${billingDetails.firstName} ${billingDetails.lastName}`,
          email: billingDetails.email,
          phone: billingDetails.phone,
          address_line1: billingDetails.address,
          city: billingDetails.city,
          postal_code: billingDetails.postalCode,
          country: billingDetails.country
        } : null,
        user_id: user?.id || null
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderInsert])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
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

      // Clear cart
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

  // Show empty cart message
  if (!cartLoading && items.length === 0 && !paymentComplete) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <CheckoutHeader />
        <main className="pt-6 pb-12">
          <div className="max-w-7xl mx-auto px-6 text-center py-16">
            <h1 className="text-2xl font-light text-foreground mb-4">سلة التسوق فارغة</h1>
            <p className="text-muted-foreground mb-8">يرجى إضافة منتجات إلى السلة لإتمام عملية الشراء</p>
            <Button asChild>
              <Link to="/category/shop">تصفح المنتجات</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Payment complete view
  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <CheckoutHeader />
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
            <div className="space-y-4">
              {user && (
                <Button asChild variant="outline" className="rounded-none">
                  <Link to="/orders">عرض طلباتي</Link>
                </Button>
              )}
              <Button asChild className="rounded-none mr-4">
                <Link to="/">العودة للرئيسية</Link>
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
      <CheckoutHeader />
      
      <main className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Order Summary - First on mobile, last on desktop */}
            <div className="lg:col-span-1 lg:order-2">
              <div className="bg-muted/20 p-8 rounded-none sticky top-6">
                <h2 className="text-lg font-light text-foreground mb-6">ملخص الطلب</h2>
                
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded-none overflow-hidden">
                        <img 
                          src={getProductImage(item)} 
                          alt={item.product?.name || 'منتج'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = pantheonImage;
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-light text-foreground">{item.product?.name}</h3>
                        
                        {/* Quantity controls */}
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

                {/* Discount Code Section */}
                <div className="mt-8 pt-6 border-t border-muted-foreground/20">
                  {!showDiscountInput ? (
                    <button 
                      onClick={() => setShowDiscountInput(true)}
                      className="text-sm text-foreground underline hover:no-underline transition-all"
                    >
                      كود الخصم
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="أدخل كود الخصم"
                          className="flex-1 rounded-none"
                        />
                        <button 
                          onClick={handleDiscountSubmit}
                          className="text-sm text-foreground underline hover:no-underline transition-all px-2"
                        >
                          تطبيق
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-muted-foreground/20 mt-4 pt-6 space-y-2">
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

            {/* Left Column - Forms */}
            <div className="lg:col-span-2 lg:order-1 space-y-8">

              {/* Customer Details Form */}
              <div className="bg-muted/20 p-8 rounded-none">
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
                      onChange={(e) => handleCustomerDetailsChange("email", e.target.value)}
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
                        onChange={(e) => handleCustomerDetailsChange("firstName", e.target.value)}
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
                        onChange={(e) => handleCustomerDetailsChange("lastName", e.target.value)}
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
                      onChange={(e) => handleCustomerDetailsChange("phone", e.target.value)}
                      className="mt-2 rounded-none"
                      placeholder="أدخل رقم هاتفك"
                    />
                  </div>

                  {/* Shipping Address */}
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
                          onChange={(e) => handleShippingAddressChange("address", e.target.value)}
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
                            onChange={(e) => handleShippingAddressChange("city", e.target.value)}
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
                            onChange={(e) => handleShippingAddressChange("postalCode", e.target.value)}
                            className="mt-2 rounded-none"
                            placeholder="الرمز البريدي"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="shippingCountry" className="text-sm font-light text-foreground">
                          الدولة *
                        </Label>
                        <Input
                          id="shippingCountry"
                          type="text"
                          value={shippingAddress.country}
                          onChange={(e) => handleShippingAddressChange("country", e.target.value)}
                          className="mt-2 rounded-none"
                          placeholder="الدولة"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Billing Address Checkbox */}
                  <div className="border-t border-muted-foreground/20 pt-6 mt-8">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="separateBilling"
                        checked={hasSeparateBilling}
                        onCheckedChange={(checked) => setHasSeparateBilling(checked === true)}
                      />
                      <Label 
                        htmlFor="separateBilling" 
                        className="text-sm font-light text-foreground cursor-pointer"
                      >
                        عنوان فوترة مختلف
                      </Label>
                    </div>
                  </div>

                  {/* Billing Details - shown when checkbox is checked */}
                  {hasSeparateBilling && (
                    <div className="space-y-6 pt-4">
                      <h3 className="text-base font-light text-foreground">بيانات الفوترة</h3>
                      
                      <div>
                        <Label htmlFor="billingEmail" className="text-sm font-light text-foreground">
                          البريد الإلكتروني *
                        </Label>
                        <Input
                          id="billingEmail"
                          type="email"
                          value={billingDetails.email}
                          onChange={(e) => handleBillingDetailsChange("email", e.target.value)}
                          className="mt-2 rounded-none"
                          placeholder="أدخل البريد الإلكتروني للفوترة"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingFirstName" className="text-sm font-light text-foreground">
                            الاسم الأول *
                          </Label>
                          <Input
                            id="billingFirstName"
                            type="text"
                            value={billingDetails.firstName}
                            onChange={(e) => handleBillingDetailsChange("firstName", e.target.value)}
                            className="mt-2 rounded-none"
                            placeholder="الاسم الأول"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingLastName" className="text-sm font-light text-foreground">
                            اسم العائلة *
                          </Label>
                          <Input
                            id="billingLastName"
                            type="text"
                            value={billingDetails.lastName}
                            onChange={(e) => handleBillingDetailsChange("lastName", e.target.value)}
                            className="mt-2 rounded-none"
                            placeholder="اسم العائلة"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="billingPhone" className="text-sm font-light text-foreground">
                          رقم الهاتف
                        </Label>
                        <Input
                          id="billingPhone"
                          type="tel"
                          value={billingDetails.phone}
                          onChange={(e) => handleBillingDetailsChange("phone", e.target.value)}
                          className="mt-2 rounded-none"
                          placeholder="أدخل رقم هاتفك"
                        />
                      </div>

                      <div>
                        <Label htmlFor="billingAddress" className="text-sm font-light text-foreground">
                          العنوان *
                        </Label>
                        <Input
                          id="billingAddress"
                          type="text"
                          value={billingDetails.address}
                          onChange={(e) => handleBillingDetailsChange("address", e.target.value)}
                          className="mt-2 rounded-none"
                          placeholder="عنوان الشارع"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingCity" className="text-sm font-light text-foreground">
                            المدينة *
                          </Label>
                          <Input
                            id="billingCity"
                            type="text"
                            value={billingDetails.city}
                            onChange={(e) => handleBillingDetailsChange("city", e.target.value)}
                            className="mt-2 rounded-none"
                            placeholder="المدينة"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingPostalCode" className="text-sm font-light text-foreground">
                            الرمز البريدي
                          </Label>
                          <Input
                            id="billingPostalCode"
                            type="text"
                            value={billingDetails.postalCode}
                            onChange={(e) => handleBillingDetailsChange("postalCode", e.target.value)}
                            className="mt-2 rounded-none"
                            placeholder="الرمز البريدي"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="billingCountry" className="text-sm font-light text-foreground">
                          الدولة *
                        </Label>
                        <Input
                          id="billingCountry"
                          type="text"
                          value={billingDetails.country}
                          onChange={(e) => handleBillingDetailsChange("country", e.target.value)}
                          className="mt-2 rounded-none"
                          placeholder="الدولة"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Options */}
              <div className="bg-muted/20 p-8 rounded-none">
                <h2 className="text-lg font-light text-foreground mb-6">خيارات الشحن</h2>
                
                <RadioGroup
                  value={shippingOption}
                  onValueChange={setShippingOption}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between p-4 border border-muted-foreground/20 rounded-none">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="cursor-pointer">
                        <span className="font-light text-foreground">شحن عادي</span>
                        <span className="block text-sm text-muted-foreground">5-7 أيام عمل</span>
                      </Label>
                    </div>
                    <span className="text-foreground font-light">مجاني</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-muted-foreground/20 rounded-none">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="cursor-pointer">
                        <span className="font-light text-foreground">شحن سريع</span>
                        <span className="block text-sm text-muted-foreground">2-3 أيام عمل</span>
                      </Label>
                    </div>
                    <span className="text-foreground font-light">{formatPrice(55)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-muted-foreground/20 rounded-none">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <Label htmlFor="overnight" className="cursor-pointer">
                        <span className="font-light text-foreground">توصيل في اليوم التالي</span>
                        <span className="block text-sm text-muted-foreground">يوم عمل واحد</span>
                      </Label>
                    </div>
                    <span className="text-foreground font-light">{formatPrice(130)}</span>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment */}
              <div className="bg-muted/20 p-8 rounded-none">
                <h2 className="text-lg font-light text-foreground mb-6">الدفع</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 border border-muted-foreground/20 rounded-none bg-muted/10">
                    <CreditCard className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">الدفع عند الاستلام</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    سيتم تحصيل المبلغ عند التوصيل. يرجى التأكد من توفر المبلغ المطلوب.
                  </p>
                </div>
              </div>

              {/* Complete Order Button */}
              <Button 
                onClick={handleCompleteOrder}
                disabled={isProcessing || items.length === 0}
                className="w-full h-14 rounded-none text-lg font-light"
              >
                {isProcessing ? 'جاري معالجة الطلب...' : `إتمام الطلب - ${formatPrice(total)}`}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
