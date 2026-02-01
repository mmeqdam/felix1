"use client";

import { AuthProvider } from '@/contexts/auth-context';
import { CartProvider } from '@/contexts/cart-context';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  );
}
