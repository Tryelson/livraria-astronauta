import Link from "next/link";
import { Compass } from "lucide-react";
import { categories } from "@/lib/books";

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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="category-pill"
            >
              <span className="category-pill__glow" aria-hidden />
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
