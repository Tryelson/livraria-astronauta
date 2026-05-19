import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  /** page: conteúdo com padding vertical; section: só largura máxima */
  variant?: "page" | "section" | "bar";
};

const variantClasses = {
  page: "mx-auto max-w-7xl px-4 py-8 md:px-6",
  section: "mx-auto max-w-7xl",
  bar: "mx-auto max-w-7xl px-4 py-5 md:px-6",
} as const;

export function PageContainer({
  children,
  className,
  as: Component = "div",
  variant = "page",
}: PageContainerProps) {
  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  );
}
