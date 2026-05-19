import { STORE_NAME, WHATSAPP_NUMBER } from "@/lib/config";
import type { CartItem } from "@/types/book";
import { formatPrice } from "@/lib/books";

export function buildWhatsAppOrderUrl(items: CartItem[]): string {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.book.title} — ${item.book.author}\n   ${formatPrice(item.book.price)} x ${item.quantity} = ${formatPrice(item.book.price * item.quantity)}`,
  );

  const total = items.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0,
  );

  const message = [
    `Olá! Gostaria de finalizar meu pedido na *${STORE_NAME}*:`,
    "",
    ...lines,
    "",
    `*Total: ${formatPrice(total)}*`,
    "",
    "Aguardo instruções para pagamento e entrega. Obrigado!",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
