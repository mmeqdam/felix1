import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterSortBarProps {
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  itemCount: number;
}

const FilterSortBar = ({ filtersOpen, setFiltersOpen, itemCount }: FilterSortBarProps) => {
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    { id: "earrings", label: "أقراط" },
    { id: "bracelets", label: "أساور" },
    { id: "rings", label: "خواتم" },
    { id: "necklaces", label: "قلادات" }
  ];
  
  const priceRanges = [
    { id: "under-500", label: "أقل من ٥٠٠ ر.س" },
    { id: "500-1000", label: "٥٠٠ - ١٠٠٠ ر.س" },
    { id: "1000-2000", label: "١٠٠٠ - ٢٠٠٠ ر.س" },
    { id: "over-2000", label: "أكثر من ٢٠٠٠ ر.س" }
  ];
  
  const materials = [
    { id: "gold", label: "ذهب" },
    { id: "silver", label: "فضة" },
    { id: "rose-gold", label: "ذهب وردي" },
    { id: "platinum", label: "بلاتين" }
  ];

  return (
    <>
      <section className="w-full px-6 mb-8 border-b border-border pb-4" dir="rtl">
        <div className="flex justify-between items-center">
          <p className="text-sm font-light text-muted-foreground">
            {itemCount} منتج
          </p>
          
          <div className="flex items-center gap-4">
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="font-light hover:bg-transparent"
                >
                  الفلاتر
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-background border-none shadow-none" dir="rtl">
                <SheetHeader className="mb-6 border-b border-border pb-4">
                  <SheetTitle className="text-lg font-light text-right">الفلاتر</SheetTitle>
                </SheetHeader>
                
                <div className="space-y-8">
                  {/* Category Filter */}
                  <div>
                    <h3 className="text-sm font-light mb-4 text-foreground">الفئة</h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center gap-3">
                          <Checkbox id={category.id} className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground" />
                          <Label htmlFor={category.id} className="text-sm font-light text-foreground cursor-pointer">
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="border-border" />

                  {/* Price Filter */}
                  <div>
                    <h3 className="text-sm font-light mb-4 text-foreground">السعر</h3>
                    <div className="space-y-3">
                      {priceRanges.map((range) => (
                        <div key={range.id} className="flex items-center gap-3">
                          <Checkbox id={range.id} className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground" />
                          <Label htmlFor={range.id} className="text-sm font-light text-foreground cursor-pointer">
                            {range.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="border-border" />

                  {/* Material Filter */}
                  <div>
                    <h3 className="text-sm font-light mb-4 text-foreground">المادة</h3>
                    <div className="space-y-3">
                      {materials.map((material) => (
                        <div key={material.id} className="flex items-center gap-3">
                          <Checkbox id={material.id} className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground" />
                          <Label htmlFor={material.id} className="text-sm font-light text-foreground cursor-pointer">
                            {material.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="border-border" />

                  <div className="flex flex-col gap-2 pt-4">
                    <Button variant="ghost" size="sm" className="w-full border-none hover:bg-transparent hover:underline font-normal text-right justify-start">
                      تطبيق الفلاتر
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full border-none hover:bg-transparent hover:underline font-light text-right justify-start">
                      مسح الكل
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-auto border-none bg-transparent text-sm font-light shadow-none rounded-none pl-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="shadow-none border-none rounded-none bg-background" dir="rtl">
                <SelectItem value="featured" className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pr-2 [&>span:first-child]:hidden">مميز</SelectItem>
                <SelectItem value="price-low" className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pr-2 [&>span:first-child]:hidden">السعر: من الأقل للأعلى</SelectItem>
                <SelectItem value="price-high" className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pr-2 [&>span:first-child]:hidden">السعر: من الأعلى للأقل</SelectItem>
                <SelectItem value="newest" className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pr-2 [&>span:first-child]:hidden">الأحدث</SelectItem>
                <SelectItem value="name" className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pr-2 [&>span:first-child]:hidden">الاسم أ-ي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </>
  );
};

export default FilterSortBar;
