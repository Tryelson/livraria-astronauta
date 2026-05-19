"use client";

import { useMemo, useState } from "react";
import { CatalogResults } from "@/components/catalog/catalog-results";
import { BackButton } from "@/components/layout/back-button";
import {
  books as allBooks,
  filterBooksByCategorySlugs,
  sortBooks,
} from "@/lib/books";
import {
  DEFAULT_SORT,
  initialCategorySlugsFromSlug,
} from "@/lib/filter-labels";
import type { SortOption } from "@/types/book";

type CategoryCatalogProps = {
  initialCategorySlug: string;
  title: string;
  description?: string;
};

export function CategoryCatalog({
  initialCategorySlug,
  title,
  description,
}: CategoryCatalogProps) {
  const [categorySlugs, setCategorySlugs] = useState(() =>
    initialCategorySlugsFromSlug(initialCategorySlug),
  );
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);

  const filtered = useMemo(() => {
    const list = filterBooksByCategorySlugs(allBooks, categorySlugs);
    return sortBooks(list, sort);
  }, [categorySlugs, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <BackButton href="/" className="mb-4" />
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </header>
      <CatalogResults
        books={filtered}
        categorySlugs={categorySlugs}
        sort={sort}
        onCategorySlugsChange={setCategorySlugs}
        onSortChange={setSort}
        defaultSort={DEFAULT_SORT}
      />
    </div>
  );
}
