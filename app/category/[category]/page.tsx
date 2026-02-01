"use client";

import { use } from "react";
import Link from "next/link";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useProducts, useCategories } from "@/hooks/use-products";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params);
  const { data: categories } = useCategories();
  const { data: products, isLoading } = useProducts({ categorySlug: category });
  
  const currentCategory = categories?.find(c => c.slug === category);
  const categoryName = currentCategory?.name || getCategoryNameArabic(category);

  function getCategoryNameArabic(slug: string): string {
    const names: Record<string, string> = {
      'rings': 'خواتم',
      'earrings': 'أقراط',
      'bracelets': 'أساور',
      'necklaces': 'قلادات',
      'new-in': 'جديد',
      'shop': 'جميع المنتجات',
    };
    return names[slug] || slug;
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ar-SA')} ر.س`;
  };

  const getProductImage = (product: typeof products[0]) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].image_url;
    }
    return "/placeholder.jpg";
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-8 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-light text-foreground mb-8">{categoryName}</h1>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">لا توجد منتجات في هذه الفئة حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="group">
                  <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.is_featured && (
                      <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium text-black bg-white/80">
                        جديد
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-light text-muted-foreground">
                      {product.category?.name || 'منتجات'}
                    </p>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-foreground">
                        {product.name}
                      </h3>
                      <p className="text-sm font-light text-foreground">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
