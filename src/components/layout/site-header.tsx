"use client";

import Link from "next/link";
import { CartTrigger } from "@/components/cart/cart-trigger";
import { SearchBar } from "@/components/catalog/search-bar";
import { LogoMark } from "@/components/layout/logo-mark";
import { SiteNav } from "@/components/layout/site-nav";
import { StoreWordmark } from "@/components/layout/store-wordmark";
import { WhatsAppPhoneLink } from "@/components/layout/whatsapp-phone-link";
import { headerMainGridStyle } from "@/lib/header-layout";
import { STORE_NAME } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="bg-space-header text-white">
      <div className="border-b border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs text-white/80 md:px-6">
          <span className="min-w-0 truncate">
            Suporte: <WhatsAppPhoneLink className="text-white/80" />
          </span>
          <span className="hidden shrink-0 sm:inline">
            Explore o universo dos livros
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Mobile: logo + busca */}
        <div className="flex flex-col gap-3 py-4 md:hidden">
          <Link
            href="/"
            aria-label={STORE_NAME}
            className="flex min-w-0 items-center gap-2.5"
          >
            <LogoMark size="sm" priority className="shrink-0" />
            <StoreWordmark size="compact" className="min-w-0" />
          </Link>
          <SearchBar className="w-full" />
        </div>

        {/* Tablet/desktop: logo + busca + carrinho */}
        <div
          className="hidden md:grid md:items-center md:gap-x-4 md:py-4 lg:gap-x-5"
          style={headerMainGridStyle}
        >
          <Link
            href="/"
            aria-label={STORE_NAME}
            className="group flex shrink-0 items-center gap-3.5"
          >
            <LogoMark priority />
            <StoreWordmark className="transition-opacity group-hover:opacity-90" />
          </Link>
          <SearchBar className="min-w-0 w-full" constrainWidth={false} />
          <CartTrigger className="w-full min-w-0 justify-self-stretch" />
        </div>

        <SiteNav />
      </div>
    </header>
  );
}
