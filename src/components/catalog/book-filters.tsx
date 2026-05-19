"use client";

import { CategoryMultiSelect } from "@/components/catalog/category-multi-select";
import {
  ArrowDownAZ,
  ArrowDownUp,
  Orbit,
  Radar,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  getCategoryLabel,
  getSortLabel,
  hasActiveFilters,
} from "@/lib/filter-labels";
import type { RecalibratePhase } from "@/hooks/use-catalog-recalibrate";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { SortOption } from "@/types/book";

const SORT_ICONS: Record<SortOption, LucideIcon> = {
  "title-asc": ArrowDownAZ,
  "price-asc": ArrowDownUp,
  "price-desc": ArrowDownUp,
  "discount-desc": Sparkles,
};

type BookFiltersProps = {
  sort: SortOption;
  categorySlugs: string[];
  onSortChange: (sort: SortOption) => void;
  onCategorySlugsChange: (slugs: string[]) => void;
  showCategoryFilter?: boolean;
  defaultSort?: SortOption;
  recalibratePhase?: RecalibratePhase;
  onRecalibrate?: () => void | Promise<void>;
};

export function BookFilters({
  sort,
  categorySlugs,
  onSortChange,
  onCategorySlugsChange,
  showCategoryFilter = true,
  defaultSort = DEFAULT_SORT,
  recalibratePhase = "idle",
  onRecalibrate,
}: BookFiltersProps) {
  const filtersActive = hasActiveFilters(categorySlugs, sort, {
    defaultSort,
    showCategoryFilter,
  });

  const categoryActive = showCategoryFilter && categorySlugs.length > 0;
  const sortActive = sort !== defaultSort;
  const SortIcon = SORT_ICONS[sort] ?? ArrowDownUp;

  function applyReset() {
    if (showCategoryFilter) {
      onCategorySlugsChange([]);
    }
    onSortChange(defaultSort);
  }

  async function handleReset() {
    if (onRecalibrate) {
      await onRecalibrate();
      return;
    }
    applyReset();
  }

  function removeCategory(slug: string) {
    onCategorySlugsChange(categorySlugs.filter((s) => s !== slug));
  }

  return (
    <section
      className={cn(
        "book-filters",
        recalibratePhase === "clearing" && "book-filters--clearing",
      )}
      aria-label="Filtros do catálogo"
    >
      <span className="book-filters__glow" aria-hidden />

      <header className="book-filters__header">
        <span className="book-filters__header-icon" aria-hidden>
          <Radar className="size-4" />
        </span>
        <div className="book-filters__header-text">
          <p className="book-filters__header-title">Painel de navegação</p>
          <p className="book-filters__header-sub">
            Ajuste os setores e a trajetória da sua exploração
          </p>
        </div>
        {filtersActive && (
          <span className="book-filters__badge">
            <span className="book-filters__badge-dot" aria-hidden />
            Filtros ativos
          </span>
        )}
      </header>

      <div
        className={cn(
          "book-filters__controls",
          filtersActive && "book-filters__controls--with-reset",
        )}
      >
        {showCategoryFilter && (
          <fieldset className="book-filters__field book-filters__field--categories">
            <legend className="book-filters__label pb-2">
              <Orbit
                className="book-filters__label-icon size-3.5"
                aria-hidden
              />
              Setores
            </legend>
            <CategoryMultiSelect
              value={categorySlugs}
              onChange={onCategorySlugsChange}
              recalibratePhase={recalibratePhase}
            />
          </fieldset>
        )}

        <fieldset className="book-filters__field">
          <legend className="book-filters__label pb-2">
            <Sparkles
              className="book-filters__label-icon size-3.5"
              aria-hidden
            />
            Trajetória
          </legend>
          <Select
            value={sort}
            onValueChange={(v) => v && onSortChange(v as SortOption)}
          >
            <SelectTrigger
              id="filter-sort"
              className="book-filters__trigger book-filters__trigger--sort"
            >
              <span className="book-filters__trigger-icon" aria-hidden>
                <SortIcon className="size-3.5" />
              </span>
              <span className="book-filters__trigger-value truncate">
                {getSortLabel(sort)}
              </span>
            </SelectTrigger>
            <SelectContent className="book-filters__content">
              {SORT_OPTIONS.map((option) => {
                const OptionIcon = SORT_ICONS[option.value];
                return (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="book-filters__item"
                  >
                    <span className="flex items-center gap-2">
                      <OptionIcon className="size-3.5 shrink-0 opacity-80" />
                      {option.label}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </fieldset>

        {filtersActive && (
          <Button
            type="button"
            variant="ghost"
            className="book-filters__reset"
            onClick={() => void handleReset()}
            disabled={recalibratePhase !== "idle"}
          >
            <RotateCcw className="size-4" aria-hidden />
            Recalibrar
          </Button>
        )}
      </div>

      {filtersActive && (
        <div className="book-filters__chips" aria-label="Filtros aplicados">
          {categorySlugs.map((slug) => (
            <button
              key={slug}
              type="button"
              className="book-filters__chip"
              onClick={() => removeCategory(slug)}
            >
              <span className="book-filters__chip-label">
                {getCategoryLabel(slug)}
              </span>
              <span className="book-filters__chip-remove" aria-hidden>
                <X className="size-3" />
              </span>
              <span className="sr-only">Remover categoria</span>
            </button>
          ))}
          {sortActive && (
            <button
              type="button"
              className="book-filters__chip"
              onClick={() => onSortChange(defaultSort)}
            >
              <span className="book-filters__chip-label">
                {getSortLabel(sort)}
              </span>
              <span className="book-filters__chip-remove" aria-hidden>
                <X className="size-3" />
              </span>
              <span className="sr-only">Remover ordenação</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
