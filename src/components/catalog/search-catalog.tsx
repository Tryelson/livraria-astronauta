"use client";

import { useMemo, useState } from "react";
import { CatalogPageShell } from "@/components/catalog/catalog-page-shell";
import { CatalogResults } from "@/components/catalog/catalog-results";
import {
  filterBooksByCategorySlugs,
  searchBooks,
  sortBooks,
} from "@/lib/books";
import { DEFAULT_SORT } from "@/lib/filter-labels";
import type { SortOption } from "@/types/book";

type SearchCatalogProps = {
  query: string;
};

export function SearchCatalog({ query }: SearchCatalogProps) {
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);
  const [categorySlugs, setCategorySlugs] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let list = searchBooks(query);
    list = filterBooksByCategorySlugs(list, categorySlugs);
    return sortBooks(list, sort);
  }, [query, sort, categorySlugs]);

  return (
    <CatalogPageShell
      title={query ? `Resultados para “${query}”` : "Busca"}
      description={`${filtered.length} livro(s) encontrado(s)`}
    >
      <CatalogResults
        books={filtered}
        categorySlugs={categorySlugs}
        sort={sort}
        onSortChange={setSort}
        onCategorySlugsChange={setCategorySlugs}
      />
    </CatalogPageShell>
  );
}
