"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import { useAuth } from '@/contexts/auth-context';
import { supabase } from '@/lib/supabase';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Upload, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock_quantity: number;
  is_active: boolean | null;
  is_featured: boolean | null;
  category?: { name: string } | null;
  images?: { id: string; image_url: string; sort_order: number | null }[];
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  user_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const formatPrice = (price: number) => {
  return `${price.toLocaleString('ar-SA')} ر.س`;
};

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [productImages, setProductImages] = useState<{ file?: File; url: string; id?: string }[]>([]);
  
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock_quantity: '',
    category_id: '',
    material: '',
    dimensions: '',
    weight: '',
    is_active: true,
    is_featured: false,
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
  });

  const { data: products = [], isLoading: productsLoading } = useSWR(
    isAdmin ? 'admin-products' : null,
    async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(name), images:product_images(id, image_url, sort_order)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Product[];
    }
  );

  const { data: orders = [], isLoading: ordersLoading } = useSWR(
    isAdmin ? 'admin-orders' : null,
    async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Order[];
    }
  );

  const { data: categories = [] } = useSWR(
    isAdmin ? 'admin-categories' : null,
    async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as Category[];
    }
  );

  const resetProductForm = () => {
    setProductForm({
      name: '',
      slug: '',
      description: '',
      price: '',
      stock_quantity: '',
      category_id: '',
      material: '',
      dimensions: '',
      weight: '',
      is_active: true,
      is_featured: false,
    });
    setEditingProduct(null);
    setProductImages([]);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      slug: product.slug,
      description: '',
      price: product.price.toString(),
      stock_quantity: product.stock_quantity.toString(),
      category_id: '',
      material: '',
      dimensions: '',
      weight: '',
      is_active: product.is_active ?? true,
      is_featured: product.is_featured ?? false,
    });
    setProductImages((product.images || []).map(img => ({ 
      url: img.image_url, 
      id: img.id 
    })));
    setIsProductDialogOpen(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setProductImages(prev => [...prev, ...newImages]);
  };

  const removeImage = async (index: number) => {
    const img = productImages[index];
    if (img.id) {
      await supabase.from('product_images').delete().eq('id', img.id);
    }
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveProduct = async () => {
    try {
      const productData = {
        name: productForm.name,
        slug: productForm.slug || productForm.name.toLowerCase().replace(/\s+/g, '-'),
        description: productForm.description,
        price: parseFloat(productForm.price) || 0,
        stock_quantity: parseInt(productForm.stock_quantity) || 0,
        category_id: productForm.category_id || null,
        material: productForm.material,
        dimensions: productForm.dimensions,
        weight: productForm.weight,
        is_active: productForm.is_active,
        is_featured: productForm.is_featured,
      };

      let productId = editingProduct?.id;

      if (editingProduct?.id) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { data: newProduct, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();
        if (error) throw error;
        productId = newProduct.id;
      }

      // Handle new image uploads
      if (productId) {
        for (let i = 0; i < productImages.length; i++) {
          const img = productImages[i];
          if (img.file) {
            setUploadingImages(true);
            const fileExt = img.file.name.split('.').pop();
            const fileName = `${productId}-${Date.now()}-${i}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
              .from('product-images')
              .upload(fileName, img.file);

            if (!uploadError) {
              const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(fileName);

              await supabase
                .from('product_images')
                .insert({
                  product_id: productId,
                  image_url: publicUrl,
                  sort_order: i,
                });
            }
          }
        }
      }

      mutate('admin-products');
      setIsProductDialogOpen(false);
      resetProductForm();
      setUploadingImages(false);
      toast({ title: 'تم الحفظ بنجاح' });
    } catch (error: any) {
      setUploadingImages(false);
      toast({ title: 'خطأ', description: error.message, variant: 'destructive' });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

    try {
      await supabase.from('product_images').delete().eq('product_id', id);
      await supabase.from('products').delete().eq('id', id);
      mutate('admin-products');
      toast({ title: 'تم الحذف بنجاح' });
    } catch (error: any) {
      toast({ title: 'خطأ', description: error.message, variant: 'destructive' });
    }
  };

  const handleSaveCategory = async () => {
    try {
      const { error } = await supabase.from('categories').insert([{
        name: categoryForm.name,
        slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-'),
        description: categoryForm.description,
      }]);
      if (error) throw error;

      mutate('admin-categories');
      setIsCategoryDialogOpen(false);
      setCategoryForm({ name: '', slug: '', description: '' });
      toast({ title: 'تم إضافة الفئة بنجاح' });
    } catch (error: any) {
      toast({ title: 'خطأ', description: error.message, variant: 'destructive' });
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', id);
      if (error) throw error;

      mutate('admin-orders');
      toast({ title: 'تم تحديث حالة الطلب' });
    } catch (error: any) {
      toast({ title: 'خطأ', description: error.message, variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col" dir="rtl">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">غير مصرح</h1>
            <p className="text-muted-foreground mb-4">ليس لديك صلاحية الوصول لهذه الصفحة</p>
            <Button onClick={() => router.push('/')}>العودة للرئيسية</Button>
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
        <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>
        
        <Tabs defaultValue="products">
          <TabsList className="mb-8">
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="categories">الفئات</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">المنتجات</h2>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetProductForm}>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة منتج
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>اسم المنتج</Label>
                        <Input
                          value={productForm.name}
                          onChange={(e) => setProductForm(p => ({ ...p, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label>الرابط (Slug)</Label>
                        <Input
                          value={productForm.slug}
                          onChange={(e) => setProductForm(p => ({ ...p, slug: e.target.value }))}
                          dir="ltr"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>الوصف</Label>
                      <Textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm(p => ({ ...p, description: e.target.value }))}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>السعر (ر.س)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm(p => ({ ...p, price: e.target.value }))}
                          required
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <Label>الكمية</Label>
                        <Input
                          type="number"
                          value={productForm.stock_quantity}
                          onChange={(e) => setProductForm(p => ({ ...p, stock_quantity: e.target.value }))}
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <Label>الفئة</Label>
                        <Select
                          value={productForm.category_id}
                          onValueChange={(value) => setProductForm(p => ({ ...p, category_id: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الفئة" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-3">
                      <Label>صور المنتج</Label>
                      <div className="flex flex-wrap gap-3">
                        {productImages.map((img, index) => (
                          <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden group">
                            <img
                              src={img.url}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-24 h-24 border-2 border-dashed border-muted-foreground/30 rounded-md flex flex-col items-center justify-center gap-1 hover:border-muted-foreground/50 transition-colors"
                        >
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">رفع صورة</span>
                        </button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={productForm.is_active}
                          onChange={(e) => setProductForm(p => ({ ...p, is_active: e.target.checked }))}
                        />
                        نشط
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={productForm.is_featured}
                          onChange={(e) => setProductForm(p => ({ ...p, is_featured: e.target.checked }))}
                        />
                        مميز
                      </label>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleSaveProduct}
                      disabled={uploadingImages}
                    >
                      {uploadingImages ? 'جاري الرفع...' : 'حفظ'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المنتج</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>المخزون</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">جاري التحميل...</TableCell>
                  </TableRow>
                ) : products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">لا توجد منتجات</TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category?.name || '-'}</TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>{product.stock_quantity}</TableCell>
                      <TableCell>
                        <Badge variant={product.is_active ? 'default' : 'secondary'}>
                          {product.is_active ? 'نشط' : 'معطل'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <h2 className="text-xl font-semibold mb-6">الطلبات</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تحديث</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">جاري التحميل...</TableCell>
                  </TableRow>
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">لا توجد طلبات</TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.order_number}</TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString('ar-SA')}
                      </TableCell>
                      <TableCell>{formatPrice(order.total)}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">قيد الانتظار</SelectItem>
                            <SelectItem value="processing">قيد المعالجة</SelectItem>
                            <SelectItem value="shipped">تم الشحن</SelectItem>
                            <SelectItem value="completed">مكتمل</SelectItem>
                            <SelectItem value="cancelled">ملغي</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">الفئات</h2>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة فئة
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>إضافة فئة جديدة</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>اسم الفئة</Label>
                      <Input
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm(p => ({ ...p, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label>الرابط (Slug)</Label>
                      <Input
                        value={categoryForm.slug}
                        onChange={(e) => setCategoryForm(p => ({ ...p, slug: e.target.value }))}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <Label>الوصف</Label>
                      <Textarea
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm(p => ({ ...p, description: e.target.value }))}
                      />
                    </div>
                    <Button className="w-full" onClick={handleSaveCategory}>
                      حفظ
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم الفئة</TableHead>
                  <TableHead>الرابط</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">لا توجد فئات</TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell dir="ltr">{category.slug}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
