import { describe, expect, it } from "vitest";
import {
  books,
  filterBooksByCategorySlugs,
  searchBooks,
  sortBooks,
} from "@/lib/books";

describe("searchBooks", () => {
  it("retorna todos os livros com query vazia", () => {
    expect(searchBooks("")).toHaveLength(books.length);
  });

  it("filtra por título", () => {
    const first = books[0];
    const results = searchBooks(first.title.slice(0, 4));
    expect(results.some((b) => b.id === first.id)).toBe(true);
  });
});

describe("filterBooksByCategorySlugs", () => {
  it("sem slugs retorna a lista intacta", () => {
    const slice = books.slice(0, 5);
    expect(filterBooksByCategorySlugs(slice, [])).toEqual(slice);
  });

  it("união de categorias selecionadas", () => {
    const lit = filterBooksByCategorySlugs(books, ["literatura"]);
    const fil = filterBooksByCategorySlugs(books, ["filosofia"]);
    const both = filterBooksByCategorySlugs(books, [
      "literatura",
      "filosofia",
    ]);
    expect(both.length).toBeGreaterThanOrEqual(
      Math.max(lit.length, fil.length),
    );
  });
});

describe("sortBooks", () => {
  it("ordena por preço crescente", () => {
    const sorted = sortBooks(books.slice(0, 10), "price-asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].price).toBeGreaterThanOrEqual(sorted[i - 1].price);
    }
  });
});
