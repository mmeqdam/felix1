"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const router = useRouter();
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  useEffect(() => {
    if (user && !authLoading) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          toast({
            title: "خطأ في التسجيل",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "تم التسجيل بنجاح",
            description: "يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك",
          });
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "خطأ في تسجيل الدخول",
            description: error.message,
            variant: "destructive",
          });
        } else {
          router.push("/");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-light text-foreground mb-8 text-center">
            {isSignUp ? "إنشاء حساب جديد" : "تسجيل الدخول"}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required={isSignUp}
                  className="text-right"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="text-right"
                dir="ltr"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                className="text-right"
                dir="ltr"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "جاري المعالجة..." : isSignUp ? "إنشاء حساب" : "تسجيل الدخول"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isSignUp ? "لديك حساب بالفعل؟ سجل دخولك" : "ليس لديك حساب؟ سجل الآن"}
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
