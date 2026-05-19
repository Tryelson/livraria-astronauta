import Link from "next/link";
import type { Book } from "@/types/book";
import { BookGrid } from "@/components/catalog/book-grid";

type ProductSectionProps = {
  title: string;
  books: Book[];
  viewAllHref?: string;
};

export function ProductSection({
  title,
  books,
  viewAllHref,
}: ProductSectionProps) {
  return (
    <section className="bg-section-muted px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-sm font-medium text-brand-orange hover:underline"
            >
              Ver todos
            </Link>
          )}
        </div>
        <BookGrid books={books} />
      </div>
    </section>
  );
}

