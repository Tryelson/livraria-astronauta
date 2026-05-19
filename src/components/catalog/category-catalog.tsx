"use client";

import { useMemo, useState } from "react";
import { BookFilters } from "@/components/catalog/book-filters";
import { BackButton } from "@/components/layout/back-button";
import { BookGrid } from "@/components/catalog/book-grid";
import {
  getBooksByCategory,
  books as allBooks,
  sortBooks,
} from "@/lib/books";
import {
  DEFAULT_CATEGORY_SLUG,
  DEFAULT_SORT,
} from "@/lib/filter-labels";
import type { Book, SortOption } from "@/types/book";

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
  const [categorySlug, setCategorySlug] = useState(initialCategorySlug);
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);

  const filtered = useMemo(() => {
    const list: Book[] =
      categorySlug === DEFAULT_CATEGORY_SLUG
        ? allBooks
        : getBooksByCategory(categorySlug);
    return sortBooks(list, sort);
  }, [categorySlug, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <BackButton href="/" className="mb-4" />
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </header>
      <BookFilters
        sort={sort}
        categorySlug={categorySlug}
        onSortChange={setSort}
        onCategoryChange={setCategorySlug}
        defaultCategorySlug={DEFAULT_CATEGORY_SLUG}
        defaultSort={DEFAULT_SORT}
      />
      <div className="mt-6">
        <BookGrid books={filtered} />
      </div>
    </div>
  );
}
