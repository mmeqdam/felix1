import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductDescription from "../components/product/ProductDescription";
import ProductCarousel from "../components/content/ProductCarousel";
import { useProduct, useRelatedProducts, useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

const ProductDetail = () => {
  const { productId } = useParams();
  
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
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
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-6 px-6 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-light mb-4">المنتج غير موجود</h1>
            <Link to="/" className="text-primary underline">العودة للرئيسية</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryName = product.category?.name || 'منتجات';
  const categorySlug = product.category?.slug || 'all';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-6">
        <section className="w-full px-6">
          {/* Breadcrumb - Show above image on smaller screens */}
          <div className="lg:hidden mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/category/${categorySlug}`}>{categoryName}</Link>
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
            <ProductImageGallery images={product.images} productName={product.name} />
            
            <div className="lg:pl-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              <ProductInfo product={product} />
              <ProductDescription />
            </div>
          </div>
        </section>
        
        {relatedProducts.length > 0 && (
          <section className="w-full mt-16 lg:mt-24">
            <div className="mb-4 px-6">
              <h2 className="text-sm font-light text-foreground">You might also like</h2>
            </div>
            <ProductCarousel products={relatedProducts} />
          </section>
        )}
        
        {categoryProducts.length > 0 && (
          <section className="w-full">
            <div className="mb-4 px-6">
              <h2 className="text-sm font-light text-foreground">Our other {categoryName}</h2>
            </div>
            <ProductCarousel products={categoryProducts} />
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
