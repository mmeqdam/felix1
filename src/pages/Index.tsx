import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import LargeHero from "../components/content/LargeHero";
import FiftyFiftySection from "../components/content/FiftyFiftySection";
import OneThirdTwoThirdsSection from "../components/content/OneThirdTwoThirdsSection";
import ProductCarousel from "../components/content/ProductCarousel";
import EditorialSection from "../components/content/EditorialSection";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { data: featuredProducts = [] } = useProducts({ featured: true, limit: 8 });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-6">
        <FiftyFiftySection />
        <ProductCarousel products={featuredProducts} />
        <LargeHero />
        <OneThirdTwoThirdsSection />
        <EditorialSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
