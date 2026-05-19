"use client";

import Link from "next/link";
import { BookOpen, Compass, Orbit, Sparkles } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { CategoryOrbitCard } from "@/components/catalog/category-orbit-card";
import { books, categories } from "@/lib/books";
import { categoryBookCounts } from "@/lib/category-stats";
import { categoryNavQuickLinks } from "@/lib/site-links";
import { cn } from "@/lib/utils";

export { categoryNavQuickLinks };

type CategoryNavDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CategoryNavDrawer({
  open,
  onOpenChange,
}: CategoryNavDrawerProps) {
  const close = () => onOpenChange(false);

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      side="left"
      className={cn(
        "category-nav-drawer",
        "flex h-full w-full max-w-[min(100%,20rem)] flex-col sm:max-w-sm",
      )}
    >
      <span className="category-nav-drawer__nebula" aria-hidden />
      <span className="category-nav-drawer__stars" aria-hidden />
      <span className="category-nav-drawer__orbit-trail" aria-hidden />

      <Drawer.Body className="category-nav-drawer__body">
        <Drawer.Header className="category-nav-drawer__header">
          <Drawer.Title className="category-nav-drawer__title">
            <span className="category-nav-drawer__title-icon">
              <Orbit className="size-5" aria-hidden />
            </span>
            <span className="category-nav-drawer__title-text">
              <span className="category-nav-drawer__title-label">
                Mapa galáctico
              </span>
              <span className="category-nav-drawer__title-sub">
                Escolha uma órbita literária
              </span>
            </span>
          </Drawer.Title>
        </Drawer.Header>

        <p className="category-nav-drawer__intro">
          Cada categoria é um setor do universo Astronauta — toque para pousar
          na estante.
        </p>
        <Link
          href="/catalogo"
          onClick={close}
          className="category-nav-drawer__catalog-link"
        >
          <BookOpen className="size-4 shrink-0" aria-hidden />
          Catálogo completo · {books.length} livros
        </Link>

        <ul className="category-nav-drawer__orbits" aria-label="Categorias">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <CategoryOrbitCard
                category={cat}
                bookCount={categoryBookCounts[cat.slug] ?? 0}
                onNavigate={close}
              />
            </li>
          ))}
        </ul>

        <section
          className="category-nav-drawer__waypoints"
          aria-labelledby="category-nav-waypoints-heading"
        >
          <h2
            id="category-nav-waypoints-heading"
            className="category-nav-drawer__waypoints-heading"
          >
            <Compass className="size-3.5" aria-hidden />
            Rotas de voo
          </h2>
          <ul className="category-nav-drawer__waypoints-list">
            {categoryNavQuickLinks.map((link) => {
              const Icon = "icon" in link ? link.icon : null;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="category-nav-drawer__waypoint"
                  >
                    {Icon ? (
                      <span className="category-nav-drawer__waypoint-icon">
                        <Icon className="size-3.5" aria-hidden />
                      </span>
                    ) : (
                      <span
                        className="category-nav-drawer__waypoint-dot"
                        aria-hidden
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <Drawer.Footer className="category-nav-drawer__footer">
          <Link
            href="/categoria/ofertas"
            onClick={close}
            className="category-nav-drawer__cta"
          >
            <Sparkles className="size-4 shrink-0" aria-hidden />
            Explorar ofertas
          </Link>
          <p className="category-nav-drawer__footer-hint">
            Promo: 3 livros = 10% de desconto no carrinho
          </p>
        </Drawer.Footer>
      </Drawer.Body>
    </Drawer>
  );
}
