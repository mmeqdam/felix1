import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/hooks/useProducts";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const categoryName = product.category?.name || 'منتجات';
  const categorySlug = product.category?.slug || 'all';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb - Show only on desktop */}
      <div className="hidden lg:block">
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

      {/* Product title and price */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-light text-muted-foreground mb-1">{categoryName}</p>
            <h1 className="text-2xl md:text-3xl font-light text-foreground">{product.name}</h1>
          </div>
          <div className="text-right">
            <p className="text-xl font-light text-foreground">{formatPrice(product.price)}</p>
            {product.compare_at_price && (
              <p className="text-sm font-light text-muted-foreground line-through">
                {formatPrice(product.compare_at_price)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="space-y-4 py-4 border-b border-border">
        {product.material && (
          <div className="space-y-2">
            <h3 className="text-sm font-light text-foreground">Material</h3>
            <p className="text-sm font-light text-muted-foreground">{product.material}</p>
          </div>
        )}
        
        {product.dimensions && (
          <div className="space-y-2">
            <h3 className="text-sm font-light text-foreground">Dimensions</h3>
            <p className="text-sm font-light text-muted-foreground">{product.dimensions}</p>
          </div>
        )}
        
        {product.weight && (
          <div className="space-y-2">
            <h3 className="text-sm font-light text-foreground">Weight</h3>
            <p className="text-sm font-light text-muted-foreground">{product.weight}</p>
          </div>
        )}
        
        {product.description && (
          <div className="space-y-2">
            <h3 className="text-sm font-light text-foreground">Editor's notes</h3>
            <p className="text-sm font-light text-muted-foreground italic">"{product.description}"</p>
          </div>
        )}
      </div>

      {/* Stock status */}
      {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
        <p className="text-sm text-amber-600">فقط {product.stock_quantity} متبقي في المخزون</p>
      )}
      {product.stock_quantity === 0 && (
        <p className="text-sm text-destructive">نفذ من المخزون</p>
      )}

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-light text-foreground">Quantity</span>
          <div className="flex items-center border border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={decrementQuantity}
              className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="h-10 flex items-center px-4 text-sm font-light min-w-12 justify-center border-l border-r border-border">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={incrementQuantity}
              className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button 
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none"
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
        >
          {product.stock_quantity === 0 ? 'نفذ من المخزون' : 'Add to Bag'}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
