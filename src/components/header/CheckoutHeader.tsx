import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const CheckoutHeader = () => {
  return (
    <header className="w-full bg-background border-b border-muted-foreground/20" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="relative flex items-center justify-between">
          {/* Right side - Continue Shopping */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="text-sm font-light hidden sm:inline">متابعة التسوق</span>
          </Link>

          {/* Center - Logo - Absolutely positioned to ensure perfect centering */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src="/felix-logo.svg" 
              alt="فيليكس" 
              className="h-6 w-auto"
            />
          </Link>

          {/* Left side - Support */}
          <div className="text-sm font-light text-foreground">
            الدعم
          </div>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;
