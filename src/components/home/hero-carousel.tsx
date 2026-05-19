"use client";

import { BookCoverImage } from "@/components/catalog/book-cover-image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    tag: "Destaque",
    title: "Os trabalhadores do mar",
    subtitle: "Victor Hugo — clássico em destaque",
    href: "/livro/os-trabalhadores-do-mar",
    coverUrl: "/livraria-images/os-trabalhadores-do-mar.jpeg",
    accent: "teal" as const,
  },
  {
    id: 2,
    tag: "Coleção",
    title: "Sherlock Holmes",
    subtitle: "6 volumes — edição especial",
    href: "/livro/colecao-especial-sherlock-holmes-6-livros",
    coverUrl:
      "/livraria-images/sherlock-holmes-6-volumes-colecao-especial.jpeg",
    accent: "orange" as const,
  },
  {
    id: 3,
    tag: "Premium",
    title: "Wicked capa dura",
    subtitle: "Gregory Maguire — edição premium",
    href: "/livro/wicked-capa-dura",
    coverUrl: "/livraria-images/gregory-maguire-wicked-darkside.jpeg",
    accent: "cream" as const,
  },
];

function HeroBannerDots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="hero-carousel__dots"
      role="tablist"
      aria-label="Slides do banner"
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={active === index}
          aria-label={`Ir para slide ${index + 1}`}
          className={cn(
            "hero-carousel__dot",
            active === index && "hero-carousel__dot--active",
          )}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setActive(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="hero-carousel-section px-4 py-6 md:px-6 md:py-8">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="hero-carousel mx-auto max-w-7xl"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-4 md:pl-6">
              <Link
                href={slide.href}
                className={cn("hero-banner", `hero-banner--${slide.accent}`)}
              >
                <span className="hero-banner__nebula" aria-hidden />
                <span className="hero-banner__stars" aria-hidden />
                <span
                  className="hero-banner__orbit hero-banner__orbit--a"
                  aria-hidden
                />
                <span
                  className="hero-banner__orbit hero-banner__orbit--b"
                  aria-hidden
                />

                <div className="hero-banner__grid relative z-2 grid min-h-88 grid-cols-1 items-center gap-5 px-5 pt-6 pb-12 md:min-h-74 md:grid-cols-[1.15fr_0.85fr] md:gap-8 md:px-9 md:pt-8 md:pb-11">
                  <div className="flex flex-col items-start text-left">
                    <span className="hero-banner__tag">{slide.tag}</span>
                    <p className="hero-banner__eyebrow">Livraria Astronauta</p>
                    <h2 className="hero-banner__title">{slide.title}</h2>
                    <p className="hero-banner__subtitle">{slide.subtitle}</p>
                    <span className="hero-banner__cta">
                      Ver livro
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </div>

                  <div className="hero-banner__visual">
                    <span className="hero-banner__cover-glow" aria-hidden />
                    <div className="hero-banner__cover">
                      <BookCoverImage
                        src={slide.coverUrl}
                        alt=""
                        fill
                        priority={slide.id === 1}
                        className="object-contain p-2 drop-shadow-2xl"
                        sizes="(max-width: 768px) 40vw, 220px"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          type="button"
          className="hero-carousel__nav hero-carousel__nav--prev"
          onClick={() => api?.scrollPrev()}
          aria-label="Slide anterior"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          className="hero-carousel__nav hero-carousel__nav--next"
          onClick={() => api?.scrollNext()}
          aria-label="Próximo slide"
        >
          <ChevronRight className="size-5" />
        </button>

        <HeroBannerDots
          count={slides.length}
          active={active}
          onSelect={(index) => api?.scrollTo(index)}
        />
      </Carousel>
    </section>
  );
}
