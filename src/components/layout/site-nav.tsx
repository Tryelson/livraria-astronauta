"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/lib/books";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#destaques", label: "Destaques" },
  { href: "/#mais-vendidos", label: "Mais vendidos" },
  { href: "/busca?q=autor", label: "Autores" },
  { href: "/categoria/historia", label: "Editoras" },
  { href: "/categoria/literatura", label: "Novidades" },
];

function NavMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="space-y-2">
      {categories.map((cat) => (
        <li key={cat.slug}>
          <Link
            href={`/categoria/${cat.slug}`}
            onClick={onNavigate}
            className="block rounded-md px-2 py-2 text-sm hover:bg-muted"
          >
            {cat.name}
          </Link>
        </li>
      ))}
      <li className="pt-2">
        <span className="px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Navegação
        </span>
      </li>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onNavigate}
            className="block rounded-md px-2 py-2 text-sm hover:bg-muted"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex max-w-7xl items-stretch gap-0 px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              "hidden items-center gap-2 border-r border-white/10 px-4 py-3 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white/10 md:inline-flex",
            )}
          >
            <Menu className="size-4" />
            Categorias
          </SheetTrigger>
          <SheetTrigger className="inline-flex items-center justify-center p-3 text-white md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <NavMenu onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        <ul className="hidden min-w-0 flex-1 items-stretch overflow-x-auto md:flex">
          {navLinks.map((link) => (
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
