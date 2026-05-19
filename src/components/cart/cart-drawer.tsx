"use client";

import { BookCoverImage } from "@/components/catalog/book-cover-image";
import Link from "next/link";
import {
  MessageCircle,
  Minus,
  Plus,
  Rocket,
  ShoppingBag,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { CartPromoBanner } from "@/components/cart/cart-promo-banner";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    total,
    promo,
    isDrawerOpen,
    setDrawerOpen,
    updateQuantity,
    removeItem,
  } = useCart();

  const whatsappUrl =
    items.length > 0 ? buildWhatsAppOrderUrl(items) : undefined;

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setDrawerOpen}
      className={cn(
        "cart-drawer",
        "flex h-full w-full max-w-[min(100%,22rem)] flex-col sm:max-w-md md:max-w-lg",
      )}
    >
      <span className="cart-drawer__nebula" aria-hidden />
      <span className="cart-drawer__stars" aria-hidden />

      <Drawer.Body className="cart-drawer__body">
        <Drawer.Header className="cart-drawer__header">
          <Drawer.Title className="cart-drawer__title">
            <span className="cart-drawer__title-icon">
              <Rocket className="size-5" aria-hidden />
            </span>
            <span className="cart-drawer__title-text">
              <span className="cart-drawer__title-label">Sua missão</span>
              <span className="cart-drawer__title-sub">
                Carrinho · {itemCount} {itemCount === 1 ? "item" : "itens"}
              </span>
            </span>
          </Drawer.Title>
        </Drawer.Header>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <div className="cart-drawer__empty-orbit">
              <ShoppingBag className="size-10 text-brand-teal/80" aria-hidden />
              <Sparkles
                className="absolute -top-1 -right-1 size-4 text-brand-orange"
                aria-hidden
              />
            </div>
            <p className="cart-drawer__empty-title">Nenhum livro na órbita</p>
            <p className="cart-drawer__empty-desc">
              Explore o catálogo e adicione títulos ao seu carrinho espacial.
            </p>
            <p className="cart-drawer__empty-promo">
              Leve 3 livros e ganhe 10% de desconto na missão!
            </p>
            <Button
              type="button"
              variant="ghost"
              className="cart-drawer__empty-cta"
              nativeButton={false}
              render={
                <Link href="/catalogo" onClick={() => setDrawerOpen(false)} />
              }
            >
              Explorar catálogo
            </Button>
          </div>
        ) : (
          <>
            <CartPromoBanner
              itemCount={itemCount}
              promo={promo}
              className="cart-drawer__promo"
            />
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li key={item.book.id} className="cart-drawer__item">
                  <Link
                    href={`/livro/${item.book.slug}`}
                    onClick={() => setDrawerOpen(false)}
                    className="cart-drawer__cover"
                  >
                    <span className="cart-drawer__cover-glow" aria-hidden />
                    <BookCoverImage
                      src={item.book.coverUrl}
                      alt={item.book.title}
                      fill
                      className="object-contain p-1.5"
                      sizes="80px"
                    />
                  </Link>

                  <div className="cart-drawer__item-body">
                    <Link
                      href={`/livro/${item.book.slug}`}
                      onClick={() => setDrawerOpen(false)}
                      className="cart-drawer__item-title"
                    >
                      {item.book.title}
                    </Link>
                    <p className="cart-drawer__item-author">
                      {item.book.author}
                    </p>
                    <p className="cart-drawer__item-price">
                      {formatPrice(item.book.price)}
                      {item.quantity > 1 && (
                        <span className="cart-drawer__item-line-total">
                          {" "}
                          · {formatPrice(item.book.price * item.quantity)}
                        </span>
                      )}
                    </p>

                    <div className="cart-drawer__qty">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="cart-drawer__qty-btn"
                        onClick={() =>
                          updateQuantity(item.book.id, item.quantity - 1)
                        }
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="cart-drawer__qty-value">
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="cart-drawer__qty-btn"
                        onClick={() =>
                          updateQuantity(item.book.id, item.quantity + 1)
                        }
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="size-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="cart-drawer__remove"
                        onClick={() => removeItem(item.book.id)}
                        aria-label="Remover do carrinho"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Drawer.Footer>
              <div className="cart-drawer__summary">
                <div className="cart-drawer__summary-row">
                  <span className="cart-drawer__summary-label">Subtotal</span>
                  <span className="cart-drawer__summary-value">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="cart-drawer__summary-row cart-drawer__summary-row--discount">
                    <span className="cart-drawer__summary-label">
                      Desconto ({promo.discountPercent}%)
                    </span>
                    <span className="cart-drawer__summary-value cart-drawer__summary-value--discount">
                      −{formatPrice(discountAmount)}
                    </span>
                  </div>
                )}
                <div className="cart-drawer__total">
                  <span className="cart-drawer__total-label">
                    Total da missão
                  </span>
                  <span className="cart-drawer__total-value">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cart-drawer__checkout"
                onClick={() => setDrawerOpen(false)}
              >
                <MessageCircle className="size-5 shrink-0" aria-hidden />
                Finalizar no WhatsApp
              </a>
              <p className="cart-drawer__checkout-hint">
                Você será redirecionado para enviar o pedido pelo WhatsApp.
              </p>
            </Drawer.Footer>
          </>
        )}
      </Drawer.Body>
    </Drawer>
  );
}
