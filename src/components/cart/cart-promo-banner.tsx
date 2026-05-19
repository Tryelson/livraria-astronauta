"use client";

import { Gift, Sparkles } from "lucide-react";
import {
  CART_PROMO_DISCOUNT_PERCENT,
  CART_PROMO_MIN_BOOKS,
} from "@/lib/config";
import type { CartPromotion } from "@/lib/cart-promo";
import { cn } from "@/lib/utils";

type CartPromoBannerProps = {
  itemCount: number;
  promo: CartPromotion;
  className?: string;
};

export function CartPromoBanner({
  itemCount,
  promo,
  className,
}: CartPromoBannerProps) {
  const progress = Math.min(
    100,
    (itemCount / CART_PROMO_MIN_BOOKS) * 100,
  );

  if (promo.qualifies) {
    return (
      <div
        className={cn("cart-promo cart-promo--active", className)}
        role="status"
        aria-live="polite"
      >
        <span className="cart-promo__icon" aria-hidden>
          <Gift className="size-5" />
        </span>
        <div className="cart-promo__content">
          <p className="cart-promo__headline">Promoção ativa!</p>
          <p className="cart-promo__desc">
            {CART_PROMO_DISCOUNT_PERCENT}% de desconto — você levou{" "}
            {CART_PROMO_MIN_BOOKS}+ livros
          </p>
        </div>
      </div>
    );
  }

  const remaining = promo.booksUntilDiscount;
  const bookWord = remaining === 1 ? "livro" : "livros";

  return (
    <div
      className={cn("cart-promo", className)}
      role="status"
      aria-live="polite"
    >
      <span className="cart-promo__icon" aria-hidden>
        <Sparkles className="size-5" />
      </span>
      <div className="cart-promo__content">
        <p className="cart-promo__headline">
          Faltam {remaining} {bookWord} para {CART_PROMO_DISCOUNT_PERCENT}% off
        </p>
        <p className="cart-promo__desc">
          Leve {CART_PROMO_MIN_BOOKS} livros e ganhe {CART_PROMO_DISCOUNT_PERCENT}%
          de desconto na missão
        </p>
        <div className="cart-promo__progress" aria-hidden>
          <span
            className="cart-promo__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="cart-promo__progress-label">
          {itemCount} de {CART_PROMO_MIN_BOOKS} livros
        </p>
      </div>
    </div>
  );
}
