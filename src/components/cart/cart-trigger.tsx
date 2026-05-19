"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

export function CartTrigger({ className }: { className?: string }) {
  const { itemCount, openDrawer } = useCart();

  const countLabel =
    itemCount === 1 ? "1 item" : itemCount > 1 ? `${itemCount} itens` : null;

  const ariaLabel = itemCount
    ? `Abrir carrinho com ${countLabel}`
    : "Abrir carrinho";

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={openDrawer}
      aria-label={ariaLabel}
      className={cn(
        "group h-auto shrink-0 gap-0 rounded-xl border border-white/20 bg-white/10 p-0 text-white",
        "transition-colors hover:border-white/30 hover:bg-white/15 hover:text-white",
        "focus-visible:ring-brand-orange/40",
        className,
      )}
    >
      <span className="flex items-center gap-0 sm:gap-0">
        <span
          className={cn(
            "relative flex size-11 items-center justify-center sm:size-12",
            "border-r border-white/10 sm:border-r-0",
          )}
        >
          <ShoppingBag className="size-5 sm:size-[1.35rem]" aria-hidden />
          {itemCount > 0 && (
            <span
              className={cn(
                "absolute -top-0.5 -right-0.5 flex min-h-[1.125rem] min-w-[1.125rem]",
                "items-center justify-center rounded-full bg-brand-orange px-1",
                "text-[10px] font-bold leading-none text-slate-950",
                "ring-2 ring-indigo-950/80",
              )}
              aria-hidden
            >
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </span>

        <span className="flex min-w-[4.25rem] flex-col items-start justify-center px-2.5 py-2 text-left sm:min-w-[5.25rem] sm:px-3.5">
          <span className="text-[11px] font-semibold tracking-wider text-white/90 uppercase sm:text-xs">
            Carrinho
          </span>
          <span
            className={cn(
              "text-[10px] leading-tight sm:text-[11px]",
              itemCount > 0
                ? "font-medium text-brand-cream"
                : "text-white/50",
            )}
          >
            {itemCount > 0 ? countLabel : "Vazio"}
          </span>
        </span>
      </span>
    </Button>
  );
}
