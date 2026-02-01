"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import LargeHero from "@/components/content/large-hero";
import FiftyFiftySection from "@/components/content/fifty-fifty-section";
import OneThirdTwoThirdsSection from "@/components/content/one-third-two-thirds-section";
import ProductCarousel from "@/components/content/product-carousel";
import EditorialSection from "@/components/content/editorial-section";
import { useProducts } from "@/hooks/use-products";

export default function Home() {
  const { data: featuredProducts = [] } = useProducts({ featured: true, limit: 8 });

  return (
    <div className="min-h-screen bg-background" dir="rtl">
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
}
