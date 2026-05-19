import { categories } from "@/lib/books";
import type { SortOption } from "@/types/book";

export const DEFAULT_SORT: SortOption = "title-asc";

/** Mantido para URLs/páginas que usam slug único inicial */
export const DEFAULT_CATEGORY_SLUG = "all";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "title-asc", label: "Título (A–Z)" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "discount-desc", label: "Maior desconto" },
];

const sortLabelMap = Object.fromEntries(
  SORT_OPTIONS.map((o) => [o.value, o.label]),
) as Record<SortOption, string>;

export function getSortLabel(sort: SortOption): string {
  return sortLabelMap[sort] ?? "Ordenar";
}

export function getCategoryLabel(categorySlug: string): string {
  if (categorySlug === DEFAULT_CATEGORY_SLUG) {
    return "Todas as categorias";
  }
  const category = categories.find((c) => c.slug === categorySlug);
  return category?.name ?? categorySlug;
}

export function getCategorySelectionLabel(categorySlugs: string[]): string {
  if (categorySlugs.length === 0) {
    return "Todas as categorias";
  }
  if (categorySlugs.length === 1) {
    return getCategoryLabel(categorySlugs[0]);
  }
  return `${categorySlugs.length} setores selecionados`;
}

export function initialCategorySlugsFromSlug(slug: string): string[] {
  if (slug === DEFAULT_CATEGORY_SLUG) return [];
  return [slug];
}

export function hasActiveFilters(
  categorySlugs: string[],
  sort: SortOption,
  options?: {
    defaultSort?: SortOption;
    showCategoryFilter?: boolean;
  },
): boolean {
  const defaultSort = options?.defaultSort ?? DEFAULT_SORT;
  const categoryActive =
    options?.showCategoryFilter !== false && categorySlugs.length > 0;
  const sortActive = sort !== defaultSort;
  return categoryActive || sortActive;
}
