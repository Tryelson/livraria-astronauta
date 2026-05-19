"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

type CartTriggerProps = {
  className?: string;
  /** compact: ícone na barra de navegação (mobile), alinhado a Ofertas */
  variant?: "default" | "compact";
};

export function CartTrigger({
  className,
  variant = "default",
}: CartTriggerProps) {
  const { itemCount, openDrawer } = useCart();

  const countLabel =
    itemCount === 1 ? "1 item" : itemCount > 1 ? `${itemCount} itens` : null;

  const ariaLabel = itemCount
    ? `Abrir carrinho com ${countLabel}`
    : "Abrir carrinho";

  if (variant === "compact") {
    return (
      <Button
        type="button"
        variant="ghost"
        onClick={openDrawer}
        aria-label={ariaLabel}
        className={cn(
          "relative h-auto min-h-12 shrink-0 rounded-none border-0 border-r border-white/10",
          "bg-white/10 px-4 text-white hover:bg-white/15 hover:text-white",
          "focus-visible:ring-brand-orange/40",
          className,
        )}
      >
        <ShoppingBag className="size-5" aria-hidden />
        {itemCount > 0 && (
          <span
            className="absolute top-2 right-2 flex min-h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold leading-none text-slate-950 ring-2 ring-indigo-950/80"
            aria-hidden
          >
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={openDrawer}
      aria-label={ariaLabel}
      className={cn(
        "group h-auto w-full max-w-full shrink-0 gap-0 rounded-xl border border-white/20 bg-white/10 p-0 text-white",
        "transition-colors hover:border-white/30 hover:bg-white/15 hover:text-white",
        "focus-visible:ring-brand-orange/40",
        className,
      )}
    >
      <span className="flex min-w-0 items-center">
        <span className="relative flex size-11 shrink-0 items-center justify-center sm:size-12">
          <ShoppingBag className="size-5 sm:size-[1.35rem]" aria-hidden />
          {itemCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 flex min-h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold leading-none text-slate-950 ring-2 ring-indigo-950/80"
              aria-hidden
            >
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </span>

        <span className="hidden min-w-0 flex-col items-start justify-center px-2.5 py-2 text-left min-[400px]:flex sm:min-w-[4.5rem] sm:px-3">
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
