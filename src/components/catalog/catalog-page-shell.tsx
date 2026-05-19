import { BackButton } from "@/components/layout/back-button";
import { PageContainer } from "@/components/layout/page-container";

type CatalogPageShellProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  backHref?: string;
  children: React.ReactNode;
};

export function CatalogPageShell({
  title,
  description,
  backHref = "/",
  children,
}: CatalogPageShellProps) {
  return (
    <PageContainer>
      <BackButton href={backHref} className="mb-4" />
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description ? (
          <p className="mt-2 text-muted-foreground">{description}</p>
        ) : null}
      </header>
      {children}
    </PageContainer>
  );
}
