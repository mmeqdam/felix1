import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pagination = () => {
  return (
    <section className="w-full px-6 py-8" dir="rtl">
      <div className="flex justify-start items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-transparent hover:opacity-50 disabled:opacity-30 -mr-2" 
          disabled
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="min-w-8 h-8 hover:bg-transparent underline font-normal text-sm"
          >
            ١
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="min-w-8 h-8 hover:bg-transparent hover:underline font-light text-sm"
          >
            ٢
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="min-w-8 h-8 hover:bg-transparent hover:underline font-light text-sm"
          >
            ٣
          </Button>
          <span className="mx-2 text-sm font-light text-muted-foreground">...</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="min-w-8 h-8 hover:bg-transparent hover:underline font-light text-sm"
          >
            ٨
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-transparent hover:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default Pagination;
