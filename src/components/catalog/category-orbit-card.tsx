import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCategoryTheme } from "@/lib/category-theme";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/book";

type CategoryOrbitCardProps = {
  category: Category;
  bookCount: number;
  onNavigate?: () => void;
  className?: string;
};

export function CategoryOrbitCard({
  category,
  bookCount,
  onNavigate,
  className,
}: CategoryOrbitCardProps) {
  const { icon: Icon } = getCategoryTheme(category.slug);

  return (
    <Link
      href={`/categoria/${category.slug}`}
      onClick={onNavigate}
      className={cn(
        "category-orbit-card",
        `category-orbit-card--${category.slug}`,
        className,
      )}
    >
      <span className="category-orbit-card__ring" aria-hidden />
      <span className="category-orbit-card__planet">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="category-orbit-card__body">
        <span className="category-orbit-card__name">{category.name}</span>
        {category.description && (
          <span className="category-orbit-card__desc">
            {category.description}
          </span>
        )}
        <span className="category-orbit-card__count">
          {bookCount} {bookCount === 1 ? "título" : "títulos"}
        </span>
      </span>
      <ChevronRight
        className="category-orbit-card__arrow size-4 shrink-0"
        aria-hidden
      />
    </Link>
  );
}
