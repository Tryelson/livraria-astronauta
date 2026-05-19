"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { usePulseOnIncrease } from "@/hooks/use-pulse-on-change";
import { useScrollPast } from "@/hooks/use-scroll-past";
import { cn } from "@/lib/utils";

/** Abaixo do header — atalho flutuante em vez do carrinho do topo */
const SCROLL_THRESHOLD = 200;

export function FloatingCartButton() {
  const { itemCount, openDrawer, isDrawerOpen } = useCart();
  const scrolled = useScrollPast(SCROLL_THRESHOLD);
  const visible = scrolled && itemCount > 0 && !isDrawerOpen;
  const pulse = usePulseOnIncrease(itemCount, scrolled);

  const ariaLabel =
    itemCount === 1
      ? "Abrir carrinho com 1 item"
      : `Abrir carrinho com ${itemCount} itens`;

  if (!visible && itemCount === 0) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={ariaLabel}
      inert={!visible ? true : undefined}
      className={cn(
        "fixed z-[45] grid size-[3.25rem] place-items-center rounded-full border border-brand-orange/50 p-0",
        "bg-linear-to-br from-card/94 to-background/90 text-brand-cream",
        "shadow-[0_8px_28px] shadow-black/45 shadow-[0_0_20px] shadow-brand-orange/18",
        "inset-shadow-[0_1px_0] inset-shadow-white/10",
        "right-[max(1rem,env(safe-area-inset-right,0px))]",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))]",
        "sm:right-[max(1.5rem,env(safe-area-inset-right,0px))]",
        "sm:bottom-[max(1.75rem,env(safe-area-inset-bottom,0px))]",
        "transition-[opacity,translate,border-color,box-shadow] duration-300 ease-out",
        "hover:border-brand-orange/75 hover:shadow-xl hover:shadow-brand-orange/30",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-orange/65",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100 animate-floating-cart-enter"
          : "pointer-events-none translate-y-3 opacity-0",
        pulse && "animate-floating-cart-pulse",
      )}
    >
      <ShoppingBag className="size-[1.375rem] shrink-0" strokeWidth={2} aria-hidden />
      <span
        className={cn(
          "absolute top-0 right-0 grid min-h-[1.125rem] min-w-[1.125rem] translate-x-[35%] -translate-y-[35%]",
          "place-items-center rounded-full bg-brand-orange px-1",
          "text-[0.625rem] font-bold leading-none text-primary-foreground",
          "shadow-[0_0_0_2px] shadow-background/90",
        )}
        aria-hidden
      >
        {itemCount > 9 ? "9+" : itemCount}
      </span>
    </button>
  );
}
