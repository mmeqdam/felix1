import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: orders = [], isLoading } = useOrders();

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">يرجى تسجيل الدخول</h1>
            <p className="text-muted-foreground mb-4">يجب عليك تسجيل الدخول لعرض طلباتك</p>
            <Button asChild>
              <Link to="/auth">تسجيل الدخول</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">طلباتي</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">لا توجد طلبات حتى الآن</p>
            <Button asChild>
              <Link to="/">تصفح المنتجات</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold">{order.order_number}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('ar-SA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <Badge variant={
                    order.status === 'completed' ? 'default' :
                    order.status === 'cancelled' ? 'destructive' : 'secondary'
                  }>
                    {order.status === 'pending' ? 'قيد الانتظار' :
                     order.status === 'processing' ? 'قيد المعالجة' :
                     order.status === 'shipped' ? 'تم الشحن' :
                     order.status === 'completed' ? 'مكتمل' :
                     order.status === 'cancelled' ? 'ملغي' : order.status}
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-4">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      {item.product_image && (
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          الكمية: {item.quantity} × €{item.unit_price}
                        </p>
                      </div>
                      <p className="font-medium">€{item.total_price}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    <p>المجموع الفرعي: €{order.subtotal}</p>
                    <p>الشحن: €{order.shipping_cost}</p>
                    <p>الضريبة: €{order.tax.toFixed(2)}</p>
                  </div>
                  <p className="text-xl font-bold">€{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
