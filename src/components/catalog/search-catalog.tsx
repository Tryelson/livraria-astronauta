"use client";

import { useMemo, useState } from "react";
import { BookFilters } from "@/components/catalog/book-filters";
import { BackButton } from "@/components/layout/back-button";
import { BookGrid } from "@/components/catalog/book-grid";
import { searchBooks, sortBooks } from "@/lib/books";
import {
  DEFAULT_CATEGORY_SLUG,
  DEFAULT_SORT,
} from "@/lib/filter-labels";
import type { SortOption } from "@/types/book";

type SearchCatalogProps = {
  query: string;
};

export function SearchCatalog({ query }: SearchCatalogProps) {
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);
  const [categorySlug, setCategorySlug] = useState(DEFAULT_CATEGORY_SLUG);

  const filtered = useMemo(() => {
    let list = searchBooks(query);
    if (categorySlug !== DEFAULT_CATEGORY_SLUG) {
      list = list.filter((b) => b.categorySlug === categorySlug);
    }
    return sortBooks(list, sort);
  }, [query, sort, categorySlug]);

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
      <BookFilters
        sort={sort}
        categorySlug={categorySlug}
        onSortChange={setSort}
        onCategoryChange={setCategorySlug}
      />
      <div className="mt-6">
        <BookGrid books={filtered} />
      </div>
    </div>
  );
}
