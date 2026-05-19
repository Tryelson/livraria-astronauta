import booksData from "@/lib/data/books.json";
import categoriesData from "@/lib/data/categories.json";
import type { Book, Category, SortOption } from "@/types/book";

export const books: Book[] = booksData as Book[];
export const categories: Category[] = categoriesData as Category[];

const bookIdsByCategorySlug = new Map<string, Set<string>>();

function getBookIdsForCategory(categorySlug: string): Set<string> {
  const cached = bookIdsByCategorySlug.get(categorySlug);
  if (cached) return cached;

  const ids = new Set<string>();
  for (const book of getBooksByCategory(categorySlug)) {
    ids.add(book.id);
  }
  bookIdsByCategorySlug.set(categorySlug, ids);
  return ids;
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getBooksByCategory(categorySlug: string): Book[] {
  if (categorySlug === "ofertas") {
    return books.filter(
      (b) => (b.discountPercent ?? 0) >= 20 || b.isFeatured || b.isBestseller,
    );
  }
  return books.filter((b) => b.categorySlug === categorySlug);
}

/** União das categorias selecionadas dentro da lista informada; vazio = sem filtro. */
export function filterBooksByCategorySlugs(
  list: Book[],
  categorySlugs: string[],
): Book[] {
  if (categorySlugs.length === 0) return list;

  const allowedIds = new Set<string>();
  for (const slug of categorySlugs) {
    for (const id of getBookIdsForCategory(slug)) {
      allowedIds.add(id);
    }
  }

  return list.filter((book) => allowedIds.has(book.id));
}

export function getFeaturedBooks(): Book[] {
  return books.filter((b) => b.isFeatured);
}

export function getBestsellerBooks(): Book[] {
  return books.filter((b) => b.isBestseller);
}

export function searchBooks(query: string): Book[] {
  const q = query.trim().toLowerCase();
  if (!q) return books;
  return books.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      (b.publisher?.toLowerCase().includes(q) ?? false),
  );
}

export function sortBooks(list: Book[], sort: SortOption): Book[] {
  const copy = [...list];
  switch (sort) {
    case "title-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "discount-desc":
      return copy.sort(
        (a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0),
      );
    default:
      return copy;
  }
}

export { formatPrice } from "@/lib/format";

export function getAllBookSlugs(): string[] {
  return books.map((b) => b.slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
