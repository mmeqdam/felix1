import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-light">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">الصفحة غير موجودة</p>
          <Link to="/" className="text-primary underline hover:text-primary/80">
            العودة للرئيسية
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
