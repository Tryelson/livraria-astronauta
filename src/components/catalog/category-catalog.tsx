"use client";

import { useMemo, useState } from "react";
import { CatalogPageShell } from "@/components/catalog/catalog-page-shell";
import { CatalogResults } from "@/components/catalog/catalog-results";
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
    <CatalogPageShell title={title} description={description}>
      <CatalogResults
        books={filtered}
        categorySlugs={categorySlugs}
        sort={sort}
        onCategorySlugsChange={setCategorySlugs}
        onSortChange={setSort}
        defaultSort={DEFAULT_SORT}
      />
    </CatalogPageShell>
  );
}
