"use client";

import { CartProvider } from "@/context/cart-context";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster position="top-center" closeButton expand visibleToasts={3} />
    </CartProvider>
  );
}
