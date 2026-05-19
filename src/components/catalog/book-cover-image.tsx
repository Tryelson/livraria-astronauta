import Image, { type ImageProps } from "next/image";

type BookCoverImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/**
 * Capas em /public/livraria-images — servidas direto, sem /_next/image.
 * Evita falhas intermitentes do otimizador no dev (muitas requisições ao abrir o grid).
 */
export function BookCoverImage({ src, alt, ...props }: BookCoverImageProps) {
  return <Image src={src} alt={alt} unoptimized {...props} />;
}
