import { BookCoverImage } from "@/components/catalog/book-cover-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/catalog/add-to-cart-button";
import { BackButton } from "@/components/layout/back-button";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import {
  getAllBookSlugs,
  getBookBySlug,
  getCategoryBySlug,
  formatPrice,
} from "@/lib/books";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "Livro não encontrado" };
  return {
    title: book.title,
    description: book.synopsis ?? `${book.title} por ${book.author}`,
  };
}

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const category = getCategoryBySlug(book.categorySlug);
  const highDiscount = (book.discountPercent ?? 0) >= 40;

  return (
    <PageContainer as="article">
      <BackButton
        href={category ? `/categoria/${category.slug}` : "/"}
        className="mb-6"
      />
      <div className="grid gap-8 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-[320px] overflow-hidden border border-border bg-card p-4">
          <BookCoverImage
            src={book.coverUrl}
            alt={book.title}
            fill
            priority
            className="object-contain p-4"
            sizes="320px"
          />
          {book.isNew && (
            <Badge className="absolute bottom-4 left-4 rounded-none bg-primary hover:bg-primary">
              Novidade
            </Badge>
          )}
        </div>

        <div>
          {category && (
            <Link
              href={`/categoria/${category.slug}`}
              className="text-sm font-medium text-brand-orange hover:underline"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-2 font-serif text-3xl font-bold">{book.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{book.author}</p>
          {book.publisher && (
            <p className="text-sm text-muted-foreground">
              Editora: {book.publisher}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-end gap-3">
            {book.discountPercent != null && book.discountPercent > 0 && (
              <Badge
                className={
                  highDiscount
                    ? "rounded-none bg-amber-300 text-amber-950"
                    : "rounded-none bg-zinc-200 text-zinc-800"
                }
              >
                -{book.discountPercent}%
              </Badge>
            )}
            {book.originalPrice != null && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(book.originalPrice)}
              </span>
            )}
            <span className="text-3xl font-bold">{formatPrice(book.price)}</span>
          </div>

          <AddToCartButton book={book} className="mt-8" />

          {book.synopsis && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold">Sinopse</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {book.synopsis}
              </p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
