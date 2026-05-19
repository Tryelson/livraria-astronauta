import { describe, expect, it } from "vitest";
import { getCartPromotion, getCartTotals } from "@/lib/cart-promo";
import type { Book, CartItem } from "@/types/book";

const mockBook = (id: string, price: number): Book => ({
  id,
  slug: id,
  title: `Livro ${id}`,
  author: "Autor",
  price,
  coverUrl: "/cover.jpg",
  categorySlug: "literatura",
});

const items = (count: number): CartItem[] =>
  Array.from({ length: count }, (_, i) => ({
    book: mockBook(String(i + 1), 100),
    quantity: 1,
  }));

describe("getCartPromotion", () => {
  it("não qualifica com menos de 3 livros", () => {
    const promo = getCartPromotion(2);
    expect(promo.qualifies).toBe(false);
    expect(promo.booksUntilDiscount).toBe(1);
  });

  it("qualifica com 3 ou mais livros", () => {
    const promo = getCartPromotion(3);
    expect(promo.qualifies).toBe(true);
    expect(promo.booksUntilDiscount).toBe(0);
  });
});

describe("getCartTotals", () => {
  it("aplica 10% de desconto no subtotal com 3+ itens", () => {
    const totals = getCartTotals(items(3));
    expect(totals.subtotal).toBe(300);
    expect(totals.discountAmount).toBe(30);
    expect(totals.total).toBe(270);
  });

  it("sem desconto abaixo de 3 itens", () => {
    const totals = getCartTotals(items(2));
    expect(totals.discountAmount).toBe(0);
    expect(totals.total).toBe(200);
  });
});
