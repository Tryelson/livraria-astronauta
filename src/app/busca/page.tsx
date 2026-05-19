import { SearchCatalog } from "@/components/catalog/search-catalog";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata = {
  title: "Busca",
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  return <SearchCatalog query={q?.trim() ?? ""} />;
}
