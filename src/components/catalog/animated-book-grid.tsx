"use client";

import { useState } from "react";
import { BookCard } from "@/components/catalog/book-card";
import type { RecalibratePhase } from "@/hooks/use-catalog-recalibrate";
import type { Book } from "@/types/book";
import { cn } from "@/lib/utils";

type AnimatedBookGridProps = {
  books: Book[];
  phase: RecalibratePhase;
  className?: string;
};

export function AnimatedBookGrid({
  books,
  phase,
  className,
}: AnimatedBookGridProps) {
  const [exitBooks, setExitBooks] = useState<Book[] | null>(null);
  const [prevPhase, setPrevPhase] = useState(phase);

  if (phase !== prevPhase) {
    setPrevPhase(phase);
    if (phase === "clearing") {
      setExitBooks(books);
    } else if (phase === "idle") {
      setExitBooks(null);
    }
  }

  const displayBooks =
    phase === "reveal" || phase === "idle" ? books : (exitBooks ?? books);

  const gridPhase =
    phase === "sweep" ? "sweep" : phase === "reveal" ? "reveal" : "idle";

  if (displayBooks.length === 0 && phase !== "sweep") {
    return (
      <p
        className={cn(
          "catalog-recalibrate__empty py-16 text-center text-muted-foreground",
          phase === "reveal" && "catalog-recalibrate__empty--reveal",
        )}
      >
        Nenhum livro encontrado.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "catalog-recalibrate__grid",
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        gridPhase !== "idle" && `catalog-recalibrate__grid--${gridPhase}`,
        className,
      )}
      aria-busy={phase !== "idle"}
    >
      {displayBooks.map((book, index) => (
        <div
          key={phase === "reveal" ? `${book.id}-reveal` : book.id}
          className="catalog-recalibrate__card-wrap"
          style={
            {
              "--recalibrate-i": index,
            } as React.CSSProperties
          }
        >
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}
