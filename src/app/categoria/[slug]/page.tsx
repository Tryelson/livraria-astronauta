import { notFound } from "next/navigation";
import { CategoryCatalog } from "@/components/catalog/category-catalog";
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getBooksByCategory,
} from "@/lib/books";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Categoria não encontrada" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const count = getBooksByCategory(slug).length;

  return (
    <CategoryCatalog
      initialCategorySlug={slug}
      title={category.name}
      description={
        category.description ??
        `${count} título(s) nesta categoria.`
      }
    />
  );
}
