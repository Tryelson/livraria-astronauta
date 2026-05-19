import { describe, expect, it } from "vitest";
import {
  DEFAULT_SORT,
  getCategorySelectionLabel,
  hasActiveFilters,
  initialCategorySlugsFromSlug,
} from "@/lib/filter-labels";

describe("hasActiveFilters", () => {
  it("inativo com defaults", () => {
    expect(hasActiveFilters([], DEFAULT_SORT)).toBe(false);
  });

  it("ativo com categoria selecionada", () => {
    expect(hasActiveFilters(["literatura"], DEFAULT_SORT)).toBe(true);
  });

  it("ativo com ordenação diferente do padrão", () => {
    expect(hasActiveFilters([], "price-asc")).toBe(true);
  });
});

describe("getCategorySelectionLabel", () => {
  it("todas quando vazio", () => {
    expect(getCategorySelectionLabel([])).toBe("Todas as categorias");
  });

  it("contagem para múltiplas", () => {
    expect(getCategorySelectionLabel(["literatura", "filosofia"])).toBe(
      "2 setores selecionados",
    );
  });
});

describe("initialCategorySlugsFromSlug", () => {
  it("all retorna array vazio", () => {
    expect(initialCategorySlugsFromSlug("all")).toEqual([]);
  });

  it("slug único vira array de um", () => {
    expect(initialCategorySlugsFromSlug("literatura")).toEqual(["literatura"]);
  });
});
