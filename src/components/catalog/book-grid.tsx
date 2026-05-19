import type { Book } from "@/types/book";
import { BookCard } from "@/components/catalog/book-card";
import { cn } from "@/lib/utils";

type BookGridProps = {
  books: Book[];
  className?: string;
};

export function BookGrid({ books, className }: BookGridProps) {
  if (books.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        Nenhum livro encontrado.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        className,
      )}
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
