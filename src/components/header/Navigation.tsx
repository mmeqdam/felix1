import { ArrowRight, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBag from "./ShoppingBag";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useCategories } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const { data: categories = [] } = useCategories();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [offCanvasType, setOffCanvasType] = useState<'favorites' | 'account' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setOffCanvasType(null);
    navigate('/');
  };
  
  // Preload dropdown images for faster display
  useEffect(() => {
    const imagesToPreload = [
      "/rings-collection.png",
      "/earrings-collection.png", 
      "/arcus-bracelet.png",
      "/span-bracelet.png",
      "/founders.png"
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const popularSearches = [
    "خواتم ذهب",
    "قلادات فضة", 
    "أقراط لؤلؤ",
    "أساور مصممة",
    "خواتم زفاف",
    "مجموعة كلاسيكية"
  ];
  
  // Dynamic category items from database
  const categoryItems = categories.map(cat => ({
    name: cat.name,
    slug: cat.slug
  }));

  const navItems = [
    { 
      name: "تسوق", 
      href: "/category/shop",
      submenuItems: categoryItems.length > 0 
        ? categoryItems.map(c => ({ name: c.name, href: `/category/${c.slug}` }))
        : [
            { name: "أقراط", href: "/category/earrings" },
            { name: "أساور", href: "/category/bracelets" },
            { name: "خواتم", href: "/category/rings" },
            { name: "قلادات", href: "/category/necklaces" }
          ],
      images: [
        { src: "/rings-collection.png", alt: "مجموعة الخواتم", label: "خواتم", href: "/category/rings" },
        { src: "/earrings-collection.png", alt: "مجموعة الأقراط", label: "أقراط", href: "/category/earrings" }
      ]
    },
    { 
      name: "عن فيليكس", 
      href: "/about/our-story",
      submenuItems: [
        { name: "قصتنا", href: "/about/our-story" },
        { name: "الاستدامة", href: "/about/sustainability" },
        { name: "دليل المقاسات", href: "/about/size-guide" },
        { name: "خدمة العملاء", href: "/about/customer-care" },
        { name: "فروعنا", href: "/about/store-locator" }
      ],
      images: [
        { src: "/founders.png", alt: "المؤسسون", label: "اقرأ قصتنا", href: "/about/our-story" }
      ]
    }
  ];

  return (
    <nav 
      className="relative" 
      dir="rtl"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile hamburger button */}
        <button
          className="lg:hidden p-2 mt-0.5 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="القائمة"
        >
          <div className="w-5 h-5 relative">
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1.5'
            }`}></span>
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 top-2.5 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-3.5'
            }`}></span>
          </div>
        </button>

        {/* Right navigation - Hidden on tablets and mobile */}
        <div className="hidden lg:flex space-x-8 space-x-reverse">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-light py-6 block"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="block">
            <img 
              src="/felix-logo.svg" 
              alt="فيليكس" 
              className="h-6 w-auto"
            />
          </Link>
        </div>

        {/* Left icons */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <button 
            className="p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
            aria-label="بحث"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <button 
            className="hidden lg:block p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
            aria-label="الحساب"
            onClick={() => user ? setOffCanvasType('account') : navigate('/auth')}
          >
            <User size={20} />
          </button>
          <button 
            className="hidden lg:block p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
            aria-label="المفضلة"
            onClick={() => setOffCanvasType('favorites')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
          <button 
            className="p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200 relative"
            aria-label="سلة التسوق"
            onClick={() => setIsShoppingBagOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-[0.5rem] font-semibold text-black pointer-events-none">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Full width dropdown */}
      {activeDropdown && (
        <div 
          className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="px-6 py-8">
            <div className="flex justify-between w-full">
              {/* Left side - Menu items */}
              <div className="flex-1">
                <ul className="space-y-2">
                   {navItems
                     .find(item => item.name === activeDropdown)
                     ?.submenuItems.map((subItem, index) => (
                      <li key={index}>
                        <Link 
                          to={subItem.href}
                          className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-light block py-2"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                   ))}
                </ul>
              </div>

              {/* Right side - Images */}
              <div className="flex space-x-6">
                {navItems
                  .find(item => item.name === activeDropdown)
                  ?.images.map((image, index) => (
                    <Link key={index} to={image.href} className="w-[400px] h-[280px] cursor-pointer group relative overflow-hidden block">
                      <img 
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90"
                      />
                      <div className="absolute bottom-2 left-2 text-white text-xs font-light flex items-center gap-1">
                        <span>{image.label}</span>
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div 
          className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50"
        >
          <div className="px-6 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Search input */}
              <div className="relative mb-8">
                <div className="flex items-center border-b border-border pb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-nav-foreground ml-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="ابحث عن مجوهرات..."
                    className="flex-1 bg-transparent text-nav-foreground placeholder:text-nav-foreground/60 outline-none text-lg text-right"
                    autoFocus
                  />
                </div>
              </div>

              {/* Popular searches */}
              <div>
                <h3 className="text-nav-foreground text-sm font-light mb-4 text-right">عمليات بحث شائعة</h3>
                <div className="flex flex-wrap gap-3 justify-end">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      className="text-nav-foreground hover:text-nav-hover text-sm font-light py-2 px-4 border border-border rounded-full transition-colors duration-200 hover:border-nav-hover"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-nav border-b border-border z-50">
          <div className="px-6 py-8">
            <div className="space-y-6">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-lg font-light block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                   <div className="mt-3 pl-4 space-y-2">
                     {item.submenuItems.map((subItem, subIndex) => (
                       <Link
                         key={subIndex}
                         to={subItem.href}
                         className="text-nav-foreground/70 hover:text-nav-hover text-sm font-light block py-1"
                         onClick={() => setIsMobileMenuOpen(false)}
                       >
                         {subItem.name}
                       </Link>
                     ))}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Shopping Bag Component */}
      <ShoppingBag 
        isOpen={isShoppingBagOpen}
        onClose={() => setIsShoppingBagOpen(false)}
        onViewFavorites={() => {
          setIsShoppingBagOpen(false);
          setOffCanvasType('favorites');
        }}
      />
      
      {/* Account Off-canvas overlay */}
      {offCanvasType === 'account' && user && (
        <div className="fixed inset-0 z-50 h-screen">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 h-screen"
            onClick={() => setOffCanvasType(null)}
          />
          
          {/* Off-canvas panel */}
          <div className="absolute right-0 top-0 h-screen w-96 bg-background border-l border-border animate-slide-in-right flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-light text-foreground">حسابي</h2>
              <button
                onClick={() => setOffCanvasType(null)}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6 space-y-4">
              <p className="text-muted-foreground text-sm">
                {user.email}
              </p>
              
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="block text-primary hover:underline text-sm"
                  onClick={() => setOffCanvasType(null)}
                >
                  لوحة التحكم
                </Link>
              )}
              
              <Link 
                to="/orders"
                className="block text-foreground hover:text-primary text-sm"
                onClick={() => setOffCanvasType(null)}
              >
                طلباتي
              </Link>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-border">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleSignOut}
              >
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Favorites Off-canvas overlay */}
      {offCanvasType === 'favorites' && (
        <div className="fixed inset-0 z-50 h-screen">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 h-screen"
            onClick={() => setOffCanvasType(null)}
          />
          
          {/* Off-canvas panel */}
          <div className="absolute right-0 top-0 h-screen w-96 bg-background border-l border-border animate-slide-in-right flex flex-col" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-light text-foreground">المفضلة</h2>
              <button
                onClick={() => setOffCanvasType(null)}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                aria-label="إغلاق"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-6">
              <p className="text-muted-foreground text-sm text-center">
                قائمة المفضلة فارغة.<br />
                تصفح مجموعتنا واضغط على أيقونة القلب لحفظ القطع المفضلة.
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;