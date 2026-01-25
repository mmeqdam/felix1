import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CategoryHeader from "../components/category/CategoryHeader";
import FilterSortBar from "../components/category/FilterSortBar";
import ProductGrid from "../components/category/ProductGrid";

const categoryNames: Record<string, string> = {
  'shop': 'جميع المنتجات',
  'rings': 'خواتم',
  'necklaces': 'قلادات',
  'earrings': 'أقراط',
  'bracelets': 'أساور',
  'watches': 'ساعات',
  'new-in': 'وصل حديثاً',
};

const Category = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const arabicCategory = category ? (categoryNames[category] || category) : 'جميع المنتجات';

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-6">
        <CategoryHeader 
          category={arabicCategory} 
        />
        
        <FilterSortBar 
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          itemCount={24}
        />
        
        <ProductGrid />
      </main>
      
      <Footer />
    </div>
  );
};

export default Category;
