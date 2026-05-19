import Image from "next/image";
import { STORE_LOGO_PATH } from "@/lib/config";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "size-10 sm:size-11",
  md: "size-12",
  intro: "size-full",
} as const;

type LogoMarkProps = {
  size?: keyof typeof sizeClasses;
  className?: string;
  priority?: boolean;
  imageSizes?: string;
};

export function LogoMark({
  size = "md",
  className,
  priority = false,
  imageSizes = "48px",
}: LogoMarkProps) {
  return (
    <span
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border border-brand-orange/60 bg-card shadow-[0_0_20px_oklch(0.72_0.17_52/0.25)] ring-2 ring-brand-orange/20",
        sizeClasses[size],
        className,
      )}
    >
      <Image
        src={STORE_LOGO_PATH}
        alt=""
        fill
        sizes={imageSizes}
        className="object-cover"
        priority={priority}
      />
    </span>
  );
}
