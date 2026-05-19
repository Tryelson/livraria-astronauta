"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toastBookAdded } from "@/lib/toast";
import type { Book, CartItem } from "@/types/book";

const STORAGE_KEY = "livraria-astronauta-cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadStoredItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadStoredItems();
    queueMicrotask(() => {
      setItems(stored);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((book: Book, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.book.id === book.id);
      if (existing) {
        return prev.map((i) =>
          i.book.id === book.id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { book, quantity }];
    });
    toastBookAdded(book.title);
  }, []);

  const removeItem = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((i) => i.book.id !== bookId));
  }, []);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.book.id !== bookId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.book.id === bookId ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.book.price * i.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      total,
      isDrawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      setDrawerOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      itemCount,
      total,
      isDrawerOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
