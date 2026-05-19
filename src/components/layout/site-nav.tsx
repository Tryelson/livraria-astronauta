"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { CartTrigger } from "@/components/cart/cart-trigger";
import { CategoryNavDrawer } from "@/components/layout/category-nav-drawer";
import { categoryNavQuickLinks } from "@/lib/site-links";
import { headerNavGridStyle } from "@/lib/header-layout";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const ofertasClassName =
    "flex shrink-0 items-center justify-center bg-brand-orange/90 px-4 text-xs font-semibold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-brand-orange sm:px-5";

  return (
    <nav className="border-t border-white/10 bg-black/20">
      <div
        className="flex w-full items-stretch md:grid md:items-stretch md:gap-x-4 lg:gap-x-5"
        style={headerNavGridStyle}
      >
        <div className="flex min-w-0 flex-1 items-stretch md:col-start-1">
          <button
            type="button"
            onClick={() => setCategoriesOpen(true)}
            className={cn(
              "hidden items-center gap-2 border-r border-white/10 px-4 py-3 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white/10 md:inline-flex",
            )}
          >
            <Menu className="size-4" />
            Categorias
          </button>
          <button
            type="button"
            onClick={() => setCategoriesOpen(true)}
            className="inline-flex shrink-0 items-center justify-center p-3 text-white md:hidden"
          >
            <Menu className="size-5" />
            <span className="sr-only">Abrir mapa de categorias</span>
          </button>

          <CategoryNavDrawer
            open={categoriesOpen}
            onOpenChange={setCategoriesOpen}
          />

          <ul className="hidden min-w-0 flex-1 items-stretch overflow-x-auto md:flex">
            {categoryNavQuickLinks.map((link) => (
              <li key={link.href} className="flex shrink-0">
                <Link
                  href={link.href}
                  className="flex items-center px-3 py-3 text-xs font-semibold tracking-wide whitespace-nowrap text-white uppercase transition-colors hover:bg-white/10 lg:px-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile: carrinho + Ofertas alinhados à direita */}
        <div className="flex shrink-0 items-stretch md:col-start-2 md:hidden">
          <CartTrigger variant="compact" />
          <Link href="/categoria/ofertas" className={cn(ofertasClassName, "py-3")}>
            Ofertas
          </Link>
        </div>

        {/* Tablet/desktop: só Ofertas na coluna do carrinho */}
        <Link
          href="/categoria/ofertas"
          className={cn(
            ofertasClassName,
            "hidden min-h-12 py-3 md:flex md:col-start-2 md:w-full",
          )}
        >
          Ofertas
        </Link>
      </div>
    </nav>
  );
}
