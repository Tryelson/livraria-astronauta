"use client";

import { useCallback } from "react";
import { AnimatedBookGrid } from "@/components/catalog/animated-book-grid";
import { BookFilters } from "@/components/catalog/book-filters";
import { useCatalogRecalibrate } from "@/hooks/use-catalog-recalibrate";
import { DEFAULT_SORT } from "@/lib/filter-labels";
import type { Book, SortOption } from "@/types/book";
import { cn } from "@/lib/utils";

type CatalogResultsProps = {
  books: Book[];
  categorySlugs: string[];
  sort: SortOption;
  onCategorySlugsChange: (slugs: string[]) => void;
  onSortChange: (sort: SortOption) => void;
  showCategoryFilter?: boolean;
  defaultSort?: SortOption;
};

export function CatalogResults({
  books,
  categorySlugs,
  sort,
  onCategorySlugsChange,
  onSortChange,
  showCategoryFilter = true,
  defaultSort = DEFAULT_SORT,
}: CatalogResultsProps) {
  const resetFilters = useCallback(() => {
    if (showCategoryFilter) {
      onCategorySlugsChange([]);
    }
    onSortChange(defaultSort);
  }, [showCategoryFilter, onCategorySlugsChange, onSortChange, defaultSort]);

  const { phase, start, isActive } = useCatalogRecalibrate(resetFilters);

  return (
    <>
      <BookFilters
        sort={sort}
        categorySlugs={categorySlugs}
        onSortChange={onSortChange}
        onCategorySlugsChange={onCategorySlugsChange}
        showCategoryFilter={showCategoryFilter}
        defaultSort={defaultSort}
        recalibratePhase={phase}
        onRecalibrate={start}
      />

      <div
        className={cn(
          "catalog-recalibrate mt-6",
          isActive && "catalog-recalibrate--active",
          phase === "sweep" && "catalog-recalibrate--sweep",
          phase === "reveal" && "catalog-recalibrate--reveal",
        )}
      >
        {phase === "sweep" && (
          <div className="catalog-recalibrate__scan" aria-hidden>
            <span className="catalog-recalibrate__scan-beam" />
            <span className="catalog-recalibrate__scan-trail" />
            <p className="catalog-recalibrate__scan-label">
              Realinhando o catálogo…
            </p>
          </div>
        )}

        <AnimatedBookGrid books={books} phase={phase} />
      </div>
    </>
  );
}
