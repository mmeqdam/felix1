import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { useProducts, type Product } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import pantheonImage from "@/assets/pantheon.jpg";

interface ProductGridProps {
  categorySlug?: string;
}

const ProductGrid = ({ categorySlug }: ProductGridProps) => {
  const { data: products = [], isLoading } = useProducts({ categorySlug });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].image_url;
    }
    return pantheonImage;
  };

  const getHoverImage = (product: Product) => {
    if (product.images && product.images.length > 1) {
      return product.images[1].image_url;
    }
    return getProductImage(product);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = pantheonImage;
  };

  if (isLoading) {
    return (
      <section className="w-full px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="w-full px-6 mb-16">
        <div className="text-center py-12">
          <p className="text-muted-foreground">لا توجد منتجات في هذه الفئة</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.slug}`}>
            <Card className="border-none shadow-none bg-transparent group cursor-pointer">
              <CardContent className="p-0">
                <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-0"
                    onError={handleImageError}
                  />
                  <img
                    src={getHoverImage(product)}
                    alt={`${product.name} alternate view`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-300 opacity-0 group-hover:opacity-100"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-black/[0.03]"></div>
                  {product.is_featured && (
                    <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium text-black">
                      NEW
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
        ))}
      </div>
      
      {products.length > 24 && <Pagination />}
    </section>
  );
};

export default ProductGrid;
