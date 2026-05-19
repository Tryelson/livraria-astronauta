"use client";

import Link from "next/link";
import { CartTrigger } from "@/components/cart/cart-trigger";
import { SearchBar } from "@/components/catalog/search-bar";
import { LogoMark } from "@/components/layout/logo-mark";
import { SiteNav } from "@/components/layout/site-nav";
import { StoreWordmark } from "@/components/layout/store-wordmark";
import { STORE_NAME, STORE_PHONE } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="bg-space-header text-white">
      <div className="border-b border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs text-white/80 md:px-6">
          <span className="truncate">Suporte: {STORE_PHONE}</span>
          <span className="hidden shrink-0 sm:inline">
            Explore o universo dos livros
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-5">
        <div className="relative z-10 flex flex-col gap-3 md:gap-4">
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <Link
              href="/"
              aria-label={STORE_NAME}
              className="flex min-w-0 items-center gap-2.5 sm:gap-3"
            >
              <LogoMark size="sm" priority />
              <StoreWordmark size="compact" />
            </Link>
            <CartTrigger />
          </div>

          <SearchBar className="w-full lg:hidden" />

          <div className="hidden items-center gap-5 lg:flex">
            <Link
              href="/"
              aria-label={STORE_NAME}
              className="group flex shrink-0 items-center gap-3.5"
            >
              <LogoMark priority />
              <StoreWordmark className="transition-opacity group-hover:opacity-90" />
            </Link>
            <SearchBar className="min-w-0 flex-1" />
            <CartTrigger />
          </div>
        </div>
      </div>

      <SiteNav />
    </header>
  );
}
