import { categories } from "@/lib/books";
import type { SortOption } from "@/types/book";

export const DEFAULT_SORT: SortOption = "title-asc";
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

export function hasActiveFilters(
  categorySlug: string,
  sort: SortOption,
  options?: {
    defaultCategorySlug?: string;
    defaultSort?: SortOption;
    showCategoryFilter?: boolean;
  },
): boolean {
  const defaultCategory = options?.defaultCategorySlug ?? DEFAULT_CATEGORY_SLUG;
  const defaultSort = options?.defaultSort ?? DEFAULT_SORT;
  const categoryActive =
    options?.showCategoryFilter !== false && categorySlug !== defaultCategory;
  const sortActive = sort !== defaultSort;
  return categoryActive || sortActive;
}
