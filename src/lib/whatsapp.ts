import { getCartTotals } from "@/lib/cart-promo";
import { STORE_NAME, WHATSAPP_NUMBER } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types/book";

export function buildWhatsAppOrderUrl(items: CartItem[]): string {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.book.title} — ${item.book.author}\n   ${formatPrice(item.book.price)} x ${item.quantity} = ${formatPrice(item.book.price * item.quantity)}`,
  );

  const { subtotal, discountAmount, total, promo } = getCartTotals(items);

  const totalLines = [
    `Subtotal: ${formatPrice(subtotal)}`,
    ...(promo.qualifies
      ? [
          `Desconto (${promo.discountPercent}% — ${promo.minBooks}+ livros): -${formatPrice(discountAmount)}`,
        ]
      : []),
    `*Total: ${formatPrice(total)}*`,
  ];

  const message = [
    `Olá! Gostaria de finalizar meu pedido na *${STORE_NAME}*:`,
    "",
    ...lines,
    "",
    ...totalLines,
    "",
    "Aguardo instruções para pagamento e entrega. Obrigado!",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
