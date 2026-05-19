"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  /** Se informado, navega para esta rota em vez do histórico */
  href?: string;
  label?: string;
  className?: string;
};

function BackButtonInner({
  label,
  shining,
  onShineEnd,
}: {
  label: string;
  shining: boolean;
  onShineEnd: (event: React.AnimationEvent<HTMLSpanElement>) => void;
}) {
  return (
    <>
      <span className="back-button__orbit" aria-hidden />
      <span className="back-button__glow" aria-hidden />
      <span
        className={cn("back-button__shine", shining && "back-button__shine--active")}
        aria-hidden
        onAnimationEnd={onShineEnd}
      />
      <span className="back-button__spark back-button__spark--1" aria-hidden />
      <span className="back-button__spark back-button__spark--2" aria-hidden />
      <span className="back-button__spark back-button__spark--3" aria-hidden />
      <span className="relative z-1 inline-flex items-center gap-2.5">
        <ArrowLeft className="back-button__arrow" aria-hidden />
        {label}
      </span>
    </>
  );
}

export function BackButton({
  href,
  label = "Voltar",
  className,
}: BackButtonProps) {
  const router = useRouter();
  const [shining, setShining] = useState(false);

  const playShine = useCallback(() => {
    setShining(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setShining(true));
    });
  }, []);

  const stopShine = useCallback((event: React.AnimationEvent<HTMLSpanElement>) => {
    if (event.animationName !== "back-button-shine-sweep") return;
    setShining(false);
  }, []);

  const sharedProps = {
    className: cn(
      "back-button relative isolate inline-flex h-11 items-center gap-2.5 overflow-hidden rounded-full px-5 pe-6",
      className,
    ),
    onMouseEnter: playShine,
  };

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        <BackButtonInner label={label} shining={shining} onShineEnd={stopShine} />
      </Link>
    );
  }

  return (
    <button type="button" {...sharedProps} onClick={() => router.back()}>
      <BackButtonInner label={label} shining={shining} onShineEnd={stopShine} />
    </button>
  );
}
