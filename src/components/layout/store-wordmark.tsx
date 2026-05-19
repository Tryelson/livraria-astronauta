import { cn } from "@/lib/utils";

type StoreWordmarkProps = {
  className?: string;
  /** Variante menor para mobile */
  size?: "default" | "compact";
};

/**
 * Wordmark em duas linhas — espelha a logo (LIVRARIA creme + ASTRONAUTA teal).
 */
export function StoreWordmark({
  className,
  size = "default",
}: StoreWordmarkProps) {
  const compact = size === "compact";

  return (
    <span
      className={cn(
        "store-wordmark inline-flex flex-col leading-none select-none",
        className,
      )}
    >
      <span
        className={cn(
          "font-brand font-medium uppercase text-brand-cream",
          compact
            ? "text-[0.7rem] tracking-[0.24em]"
            : "text-xs tracking-[0.28em] sm:text-sm",
        )}
      >
        Livraria
      </span>
      <span
        className={cn(
          "font-brand font-bold uppercase text-brand-teal [text-shadow:0_0_20px_oklch(0.62_0.08_215/0.55),0_0_40px_oklch(0.55_0.1_215/0.25)]",
          compact
            ? "mt-0.5 text-base tracking-[0.1em]"
            : "mt-1 text-lg tracking-[0.14em] sm:text-xl lg:text-[1.35rem]",
        )}
      >
        Astronauta
      </span>
    </span>
  );
}
