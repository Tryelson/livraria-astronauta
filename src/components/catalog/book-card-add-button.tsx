"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import type { Book } from "@/types/book";

type BookCardAddButtonProps = {
  book: Book;
};

export function BookCardAddButton({ book }: BookCardAddButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      className="book-card__cta"
      onClick={() => addItem(book)}
    >
      <ShoppingBag className="size-3.5" aria-hidden />
      Adicionar
    </Button>
  );
}
