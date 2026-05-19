import { CategoryOrbitCard } from "@/components/catalog/category-orbit-card";
import { categories } from "@/lib/books";
import { categoryBookCounts } from "@/lib/category-stats";
import { Compass } from "lucide-react";

export function CategoryStrip() {
  return (
    <section className="px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center gap-2">
          <Compass className="size-5 text-brand-teal" aria-hidden />
          <h2 className="text-lg font-bold text-foreground">
            Principais categorias
          </h2>
        </div>
        <ul className="category-strip__grid" aria-label="Principais categorias">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <CategoryOrbitCard
                category={cat}
                bookCount={categoryBookCounts[cat.slug] ?? 0}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
