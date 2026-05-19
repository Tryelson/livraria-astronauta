"use client";

import { useState } from "react";
import { BookCard } from "@/components/catalog/book-card";
import type { RecalibratePhase } from "@/hooks/use-catalog-recalibrate";
import type { Book } from "@/types/book";
import { cn } from "@/lib/utils";

const GRID_CLASS =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";

type BookGridProps = {
  books: Book[];
  className?: string;
  /** Quando informado, ativa animações de recalibração do catálogo */
  phase?: RecalibratePhase;
};

export function BookGrid({
  books,
  className,
  phase = "idle",
}: BookGridProps) {
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

  const isRecalibrating = phase !== "idle";
  const displayBooks =
    phase === "reveal" || phase === "idle" ? books : (exitBooks ?? books);

  const gridPhase =
    phase === "sweep" ? "sweep" : phase === "reveal" ? "reveal" : "idle";

  if (displayBooks.length === 0 && phase !== "sweep") {
    return (
      <p
        className={cn(
          isRecalibrating
            ? "catalog-recalibrate__empty py-16 text-center text-muted-foreground"
            : "py-16 text-center text-muted-foreground",
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
        isRecalibrating && "catalog-recalibrate__grid",
        GRID_CLASS,
        isRecalibrating &&
          gridPhase !== "idle" &&
          `catalog-recalibrate__grid--${gridPhase}`,
        className,
      )}
      aria-busy={isRecalibrating}
    >
      {displayBooks.map((book, index) => {
        const card = <BookCard book={book} />;

        if (!isRecalibrating) {
          return <div key={book.id}>{card}</div>;
        }

        return (
          <div
            key={phase === "reveal" ? `${book.id}-reveal` : book.id}
            className="catalog-recalibrate__card-wrap"
            style={
              {
                "--recalibrate-i": index,
              } as React.CSSProperties
            }
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
