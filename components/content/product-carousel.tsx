"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import type { Product } from "@/hooks/use-products";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ar-SA')} ر.س`;
  };

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].image_url;
    }
    return "/placeholder.jpg";
  };

  const getHoverImage = (product: Product) => {
    if (product.images && product.images.length > 1) {
      return product.images[1].image_url;
    }
    return getProductImage(product);
  };

  return (
    <section className="w-full mb-16 px-6" dir="rtl">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-2 md:pl-4"
            >
              <Link href={`/product/${product.slug}`}>
                <Card className="border-none shadow-none bg-transparent group">
                  <CardContent className="p-0">
                    <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-0"
                      />
                      <img
                        src={getHoverImage(product)}
                        alt={`${product.name} عرض بديل`}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 opacity-0 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-black/[0.03]"></div>
                      {product.is_featured && (
                        <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium text-black">
                          جديد
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-light text-foreground">
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
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProductCarousel;
