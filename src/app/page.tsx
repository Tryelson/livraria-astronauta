import { CategoryStrip } from "@/components/home/category-strip";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ProductSection } from "@/components/home/product-section";
import { getBestsellerBooks, getFeaturedBooks } from "@/lib/books";

export default function HomePage() {
  const featured = getFeaturedBooks();
  const bestsellers = getBestsellerBooks();

  return (
    <>
      <HeroCarousel />
      <CategoryStrip />
      <section id="destaques">
        <ProductSection
          title="Produtos em destaque"
          books={featured}
          viewAllHref="/categoria/ofertas"
        />
      </section>
      <section id="mais-vendidos">
        <ProductSection
          title="Os mais vendidos"
          books={bestsellers}
          viewAllHref="/categoria/literatura"
        />
      </section>
    </>
  );
}
