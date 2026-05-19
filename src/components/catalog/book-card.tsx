import { BookCoverImage } from "@/components/catalog/book-cover-image";
import { BookCardAddButton } from "@/components/catalog/book-card-add-button";
import Link from "next/link";
import { Rocket, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Book } from "@/types/book";
import { cn } from "@/lib/utils";

type BookCardProps = {
  book: Book;
  className?: string;
};

export function BookCard({ book, className }: BookCardProps) {
  const highDiscount = (book.discountPercent ?? 0) >= 40;

  return (
    <article
      className={cn(
        "book-card group relative isolate flex flex-col p-2.5 rounded-[calc(var(--radius)*1.2)]",
        className,
      )}
    >
      <span className="book-card__frame" aria-hidden />

      {book.discountPercent != null && book.discountPercent > 0 && (
        <span
          className={cn(
            "book-card__discount",
            highDiscount && "book-card__discount--hot",
          )}
        >
          −{book.discountPercent}%
        </span>
      )}

      {book.isBestseller && (
        <span className="book-card__stamp" title="Mais vendido">
          <Sparkles className="size-3" aria-hidden />
        </span>
      )}

      <Link href={`/livro/${book.slug}`} className="book-card__cover">
        <span className="book-card__cover-nebula" aria-hidden />
        <BookCoverImage
          src={book.coverUrl}
          alt={`Capa de ${book.title}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 200px"
          className="book-card__cover-img"
        />
        {book.isNew && (
          <span className="book-card__ribbon">
            <Rocket className="size-3 shrink-0" aria-hidden />
            Novidade
          </span>
        )}
      </Link>

      <div className="relative z-1 flex min-h-0 flex-1 flex-col">
        <Link
          href={`/livro/${book.slug}`}
          className="block text-center text-inherit no-underline hover:[&_.book-card__title]:text-brand-cream"
        >
          <p className="book-card__author">{book.author}</p>
          <h3 className="book-card__title">{book.title}</h3>
        </Link>

        <div className="mt-2 flex flex-col items-center gap-0.5">
          {book.originalPrice != null && (
            <span className="book-card__price-old">
              {formatPrice(book.originalPrice)}
            </span>
          )}
          <span className="book-card__price shadow-brand-glow">
            {formatPrice(book.price)}
          </span>
        </div>

        <BookCardAddButton book={book} />
      </div>
    </article>
  );
}
