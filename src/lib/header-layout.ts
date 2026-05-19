/** Largura da coluna direita: carrinho (header) + Ofertas (nav) alinhados */
export const HEADER_ACTION_COL = "10.25rem";

export const headerMainGridStyle = {
  gridTemplateColumns: `auto minmax(0, 1fr) ${HEADER_ACTION_COL}`,
} as const;

export const headerNavGridStyle = {
  gridTemplateColumns: `minmax(0, 1fr) ${HEADER_ACTION_COL}`,
} as const;
