import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
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
import { Plus, Pencil, Trash2, Upload, X, Image } from 'lucide-react';

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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [productImages, setProductImages] = useState<{ file?: File; url: string; id?: string }[]>([]);
  
  // Product form state
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

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
  });

  // Fetch products with images
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(name), images:product_images(id, image_url, sort_order)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
    enabled: isAdmin,
  });

  // Fetch orders
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Order[];
    },
    enabled: isAdmin,
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as Category[];
    },
    enabled: isAdmin,
  });

  // Upload image to storage
  const uploadImage = async (file: File, productId: string, sortOrder: number) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}-${Date.now()}-${sortOrder}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  // Create/Update product mutation
  const productMutation = useMutation({
    mutationFn: async (data: typeof productForm & { id?: string }) => {
      const productData = {
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
        description: data.description,
        price: parseFloat(data.price) || 0,
        stock_quantity: parseInt(data.stock_quantity) || 0,
        category_id: data.category_id || null,
        material: data.material,
        dimensions: data.dimensions,
        weight: data.weight,
        is_active: data.is_active,
        is_featured: data.is_featured,
      };

      let productId = data.id;

      if (data.id) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', data.id);
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

      // Handle image uploads
      if (productId) {
        // Upload new images
        for (let i = 0; i < productImages.length; i++) {
          const img = productImages[i];
          if (img.file) {
            setUploadingImages(true);
            const imageUrl = await uploadImage(img.file, productId, i);
            
            await supabase
              .from('product_images')
              .insert({
                product_id: productId,
                image_url: imageUrl,
                sort_order: i,
              });
          }
        }
      }

      return productId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsProductDialogOpen(false);
      resetProductForm();
      setUploadingImages(false);
      toast({ title: 'تم الحفظ بنجاح' });
    },
    onError: (error) => {
      setUploadingImages(false);
      toast({ title: 'خطأ', description: error.message, variant: 'destructive' });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      // First delete product images from storage and database
      const { data: images } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', id);

      if (images) {
        for (const img of images) {
          const fileName = img.image_url.split('/').pop();
          if (fileName) {
            await supabase.storage.from('product-images').remove([fileName]);
          }
        }
      }

      await supabase.from('product_images').delete().eq('product_id', id);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({ title: 'تم الحذف بنجاح' });
    },
  });

  // Delete product image mutation
  const deleteImageMutation = useMutation({
    mutationFn: async (imageId: string) => {
      const { data: image } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('id', imageId)
        .single();

      if (image) {
        const fileName = image.image_url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('product-images').remove([fileName]);
        }
      }

      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({ title: 'تم حذف الصورة' });
    },
  });

  // Create category mutation
  const categoryMutation = useMutation({
    mutationFn: async (data: typeof categoryForm) => {
      const { error } = await supabase
        .from('categories')
        .insert([{
          name: data.name,
          slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
          description: data.description,
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setIsCategoryDialogOpen(false);
      setCategoryForm({ name: '', slug: '', description: '' });
      toast({ title: 'تم إضافة الفئة بنجاح' });
    },
  });

  // Update order status mutation
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast({ title: 'تم تحديث حالة الطلب' });
    },
  });

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
    // Load existing images
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

  const removeImage = (index: number) => {
    const img = productImages[index];
    if (img.id) {
      // Delete from database
      deleteImageMutation.mutate(img.id);
    }
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">غير مصرح</h1>
            <p className="text-muted-foreground mb-4">ليس لديك صلاحية الوصول لهذه الصفحة</p>
            <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
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
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    productMutation.mutate({ ...productForm, id: editingProduct?.id });
                  }} className="space-y-4">
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
                        <Label>السعر (€)</Label>
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
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>المادة</Label>
                        <Input
                          value={productForm.material}
                          onChange={(e) => setProductForm(p => ({ ...p, material: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>الأبعاد</Label>
                        <Input
                          value={productForm.dimensions}
                          onChange={(e) => setProductForm(p => ({ ...p, dimensions: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>الوزن</Label>
                        <Input
                          value={productForm.weight}
                          onChange={(e) => setProductForm(p => ({ ...p, weight: e.target.value }))}
                        />
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
                            <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                              {index + 1}
                            </span>
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
                      <p className="text-xs text-muted-foreground">يمكنك رفع عدة صور. الصورة الأولى ستكون الصورة الرئيسية.</p>
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
                    
                    <Button type="submit" className="w-full" disabled={productMutation.isPending || uploadingImages}>
                      {productMutation.isPending || uploadingImages ? 'جاري الحفظ...' : 'حفظ'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {productsLoading ? (
              <p>جاري التحميل...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصورة</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>الكمية</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0].image_url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Image className="w-5 h-5 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category?.name || '-'}</TableCell>
                      <TableCell>€{product.price}</TableCell>
                      <TableCell>{product.stock_quantity}</TableCell>
                      <TableCell>
                        <Badge variant={product.is_active ? 'default' : 'secondary'}>
                          {product.is_active ? 'نشط' : 'غير نشط'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteProductMutation.mutate(product.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <h2 className="text-xl font-semibold mb-6">الطلبات</h2>
            
            {ordersLoading ? (
              <p>جاري التحميل...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الإجمالي</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>تغيير الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.order_number}</TableCell>
                      <TableCell>{new Date(order.created_at).toLocaleDateString('ar-SA')}</TableCell>
                      <TableCell>€{order.total}</TableCell>
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
                          onValueChange={(value) => updateOrderStatusMutation.mutate({ id: order.id, status: value })}
                        >
                          <SelectTrigger className="w-40">
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
                  ))}
                </TableBody>
              </Table>
            )}
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
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    categoryMutation.mutate(categoryForm);
                  }} className="space-y-4">
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
                    <Button type="submit" className="w-full" disabled={categoryMutation.isPending}>
                      {categoryMutation.isPending ? 'جاري الحفظ...' : 'حفظ'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>الرابط</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell dir="ltr">{category.slug}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
