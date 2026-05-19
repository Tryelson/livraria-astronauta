"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  CategoryNavDrawer,
  categoryNavQuickLinks,
} from "@/components/layout/category-nav-drawer";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <nav className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex max-w-7xl items-stretch gap-0 px-4 md:px-6">
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
          className="inline-flex items-center justify-center p-3 text-white md:hidden"
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
            <li key={link.href} className="flex">
              <Link
                href={link.href}
                className="flex items-center px-4 py-3 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white/10"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/categoria/ofertas"
          className="ml-auto flex items-center bg-brand-orange/90 px-5 py-3 text-xs font-semibold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-brand-orange md:ml-0"
        >
          Ofertas
        </Link>
      </div>
    </nav>
  );
}
