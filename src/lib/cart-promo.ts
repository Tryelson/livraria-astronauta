import {
  CART_PROMO_DISCOUNT_PERCENT,
  CART_PROMO_MIN_BOOKS,
} from "@/lib/config";
import type { CartItem } from "@/types/book";

export type CartPromotion = {
  minBooks: number;
  discountPercent: number;
  qualifies: boolean;
  booksUntilDiscount: number;
};

export type CartTotals = {
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  promo: CartPromotion;
};

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function getCartPromotion(itemCount: number): CartPromotion {
  const qualifies = itemCount >= CART_PROMO_MIN_BOOKS;
  return {
    minBooks: CART_PROMO_MIN_BOOKS,
    discountPercent: CART_PROMO_DISCOUNT_PERCENT,
    qualifies,
    booksUntilDiscount: qualifies
      ? 0
      : CART_PROMO_MIN_BOOKS - itemCount,
  };
}

export function getCartTotals(items: CartItem[]): CartTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = roundMoney(
    items.reduce((sum, item) => sum + item.book.price * item.quantity, 0),
  );
  const promo = getCartPromotion(itemCount);
  const discountAmount = promo.qualifies
    ? roundMoney(subtotal * (promo.discountPercent / 100))
    : 0;
  const total = roundMoney(subtotal - discountAmount);

  return { itemCount, subtotal, discountAmount, total, promo };
}
