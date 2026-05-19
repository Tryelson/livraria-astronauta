"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import type { Book } from "@/types/book";

type AddToCartButtonProps = {
  book: Book;
  className?: string;
  size?: "default" | "lg";
};

export function AddToCartButton({
  book,
  className,
  size = "lg",
}: AddToCartButtonProps) {
  const { addItem, openDrawer } = useCart();

  return (
    <Button
      type="button"
      size={size}
      className={className}
      onClick={() => {
        addItem(book);
        openDrawer();
      }}
    >
      <ShoppingBag className="size-4" />
      Adicionar ao carrinho
    </Button>
  );
}
