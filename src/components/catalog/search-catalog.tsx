"use client";

import { useMemo, useState } from "react";
import { CatalogResults } from "@/components/catalog/catalog-results";
import { BackButton } from "@/components/layout/back-button";
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
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <BackButton href="/" className="mb-4" />
      <header className="mb-6">
        <h1 className="text-2xl font-bold">
          {query ? `Resultados para “${query}”` : "Busca"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} livro(s) encontrado(s)
        </p>
      </header>
      <CatalogResults
        books={filtered}
        categorySlugs={categorySlugs}
        sort={sort}
        onSortChange={setSort}
        onCategorySlugsChange={setCategorySlugs}
      />
    </div>
  );
}
