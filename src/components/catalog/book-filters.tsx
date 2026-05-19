"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { categories } from "@/lib/books";
import {
  DEFAULT_CATEGORY_SLUG,
  DEFAULT_SORT,
  SORT_OPTIONS,
  getCategoryLabel,
  getSortLabel,
  hasActiveFilters,
} from "@/lib/filter-labels";
import type { SortOption } from "@/types/book";

type BookFiltersProps = {
  sort: SortOption;
  categorySlug: string;
  onSortChange: (sort: SortOption) => void;
  onCategoryChange: (slug: string) => void;
  showCategoryFilter?: boolean;
  defaultCategorySlug?: string;
  defaultSort?: SortOption;
};

export function BookFilters({
  sort,
  categorySlug,
  onSortChange,
  onCategoryChange,
  showCategoryFilter = true,
  defaultCategorySlug = DEFAULT_CATEGORY_SLUG,
  defaultSort = DEFAULT_SORT,
}: BookFiltersProps) {
  const filtersActive = hasActiveFilters(categorySlug, sort, {
    defaultCategorySlug,
    defaultSort,
    showCategoryFilter,
  });

  function handleReset() {
    if (showCategoryFilter) {
      onCategoryChange(defaultCategorySlug);
    }
    onSortChange(defaultSort);
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
      {showCategoryFilter && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-category" className="text-sm font-medium">
            Categoria
          </Label>
          <Select
            value={categorySlug}
            onValueChange={(v) => v && onCategoryChange(v)}
          >
            <SelectTrigger
              id="filter-category"
              className="w-full min-w-0 bg-card/90 backdrop-blur-sm sm:min-w-[200px] sm:w-[240px]"
            >
              <span className="truncate">{getCategoryLabel(categorySlug)}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={DEFAULT_CATEGORY_SLUG}>
                Todas as categorias
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="filter-sort" className="text-sm font-medium">
          Ordenar por
        </Label>
        <Select
          value={sort}
          onValueChange={(v) => v && onSortChange(v as SortOption)}
        >
          <SelectTrigger
            id="filter-sort"
            className="w-full min-w-0 bg-card/90 backdrop-blur-sm sm:min-w-[200px] sm:w-[240px]"
          >
            <span className="truncate">{getSortLabel(sort)}</span>
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtersActive && (
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2 bg-card/90 backdrop-blur-sm sm:w-auto"
          onClick={handleReset}
        >
          <RotateCcw className="size-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  );
}
