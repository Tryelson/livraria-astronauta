import { categories, getBooksByCategory } from "@/lib/books";

export function getCategoryBookCount(slug: string): number {
  return getBooksByCategory(slug).length;
}

export const categoryBookCounts = Object.fromEntries(
  categories.map((cat) => [cat.slug, getCategoryBookCount(cat.slug)]),
) as Record<string, number>;
