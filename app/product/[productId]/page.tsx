"use client";

import { use } from "react";
import Link from "next/link";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import ProductCarousel from "@/components/content/product-carousel";
import { useProduct, useRelatedProducts, useProducts } from "@/hooks/use-products";
import { useCart } from "@/contexts/cart-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { useState } from "react";

interface ProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { data: product, isLoading, error } = useProduct(productId || '');
  const { data: relatedProducts = [] } = useRelatedProducts(
    product?.id || '', 
    product?.category?.slug
  );
  const { data: categoryProducts = [] } = useProducts({
    categorySlug: product?.category?.slug,
    excludeId: product?.id,
    limit: 6
  });
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ar-SA')} ر.س`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="pt-6 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-12 w-2/3" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="pt-6 px-6 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-light mb-4">المنتج غير موجود</h1>
            <Link href="/" className="text-primary underline">العودة للرئيسية</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryName = product.category?.name || 'منتجات';
  const categorySlug = product.category?.slug || 'all';
  const productImages = product.images?.length > 0 ? product.images : [{ image_url: "/placeholder.jpg", alt_text: product.name }];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-6">
        <section className="w-full px-6">
          <div className="lg:hidden mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">الرئيسية</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/category/${categorySlug}`}>{categoryName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden bg-muted/10">
                <img
                  src={productImages[selectedImage]?.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {productImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 flex-shrink-0 overflow-hidden border-2 ${
                        selectedImage === idx ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img.image_url}
                        alt={`${product.name} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="lg:pr-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              <div className="hidden lg:block mb-6">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/">الرئيسية</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/category/${categorySlug}`}>{categoryName}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{product.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <p className="text-sm font-light text-muted-foreground mb-2">{categoryName}</p>
              <h1 className="text-2xl font-light text-foreground mb-4">{product.name}</h1>
              <p className="text-xl font-light text-foreground mb-6">{formatPrice(product.price)}</p>
              
              {product.description && (
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              <div className="space-y-4 mb-8">
                {product.material && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">المادة</span>
                    <span className="text-foreground">{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الأبعاد</span>
                    <span className="text-foreground">{product.dimensions}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الوزن</span>
                    <span className="text-foreground">{product.weight}</span>
                  </div>
                )}
              </div>

              <Button 
                className="w-full rounded-none" 
                size="lg"
                onClick={() => addToCart(product.id)}
              >
                أضف إلى السلة
              </Button>
            </div>
          </div>
        </section>
        
        {relatedProducts.length > 0 && (
          <section className="w-full mt-16 lg:mt-24">
            <div className="mb-4 px-6">
              <h2 className="text-sm font-light text-foreground">قد يعجبك أيضاً</h2>
            </div>
            <ProductCarousel products={relatedProducts} />
          </section>
        )}
        
        {categoryProducts.length > 0 && (
          <section className="w-full">
            <div className="mb-4 px-6">
              <h2 className="text-sm font-light text-foreground">منتجات أخرى من {categoryName}</h2>
            </div>
            <ProductCarousel products={categoryProducts} />
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
