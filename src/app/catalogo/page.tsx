import { CategoryCatalog } from "@/components/catalog/category-catalog";
import { books } from "@/lib/books";
import { DEFAULT_CATEGORY_SLUG } from "@/lib/filter-labels";

export const metadata = {
  title: "Catálogo completo",
  description: "Todos os livros disponíveis na Livraria Astronauta.",
};

export default function CatalogPage() {
  return (
    <CategoryCatalog
      initialCategorySlug={DEFAULT_CATEGORY_SLUG}
      title="Catálogo completo"
      description={`${books.length} títulos para explorar no universo Astronauta.`}
    />
  );
}
