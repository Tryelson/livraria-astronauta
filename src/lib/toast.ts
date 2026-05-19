import { toast as sonnerToast } from "sonner";

const CART_TOAST_ID = "cart-add";

let cartToastBatch = 0;
let cartToastResetTimer: ReturnType<typeof setTimeout> | undefined;

/** Toast de sucesso ao adicionar livro — um único toast que atualiza em cliques rápidos */
export function toastBookAdded(title: string) {
  cartToastBatch += 1;

  const description =
    cartToastBatch === 1
      ? title
      : `${cartToastBatch} livros no carrinho · último: ${title}`;

  sonnerToast.success("Adicionado ao carrinho", {
    id: CART_TOAST_ID,
    description,
    classNames: {
      toast: "astronaut-toast astronaut-toast--cart",
    },
  });

  clearTimeout(cartToastResetTimer);
  cartToastResetTimer = setTimeout(() => {
    cartToastBatch = 0;
  }, 2800);
}

/** Toast genérico com tema espacial */
export function toastMission(message: string, description?: string) {
  sonnerToast(message, {
    description,
    icon: "✦",
    classNames: {
      toast: "astronaut-toast astronaut-toast--info",
    },
  });
}

export { sonnerToast as toast };
