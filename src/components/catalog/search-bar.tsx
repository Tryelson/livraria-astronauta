"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  defaultValue?: string;
  className?: string;
  /** false = ocupa toda a largura da coluna (header desktop) */
  constrainWidth?: boolean;
};

export function SearchBar({
  defaultValue = "",
  className,
  constrainWidth = true,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/busca?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full items-stretch gap-0 ${constrainWidth ? "max-w-2xl" : ""} ${className ?? ""}`}
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-white/50" />
        <Input
          type="search"
          placeholder="Buscar produto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 rounded-r-none border-white/20 bg-black/30 pr-3 pl-10 text-white placeholder:text-white/50 focus-visible:border-brand-orange/50 focus-visible:ring-brand-orange/30"
        />
      </div>
      <Button
        type="submit"
        className="h-11 rounded-l-none bg-primary px-6 font-semibold tracking-wide text-primary-foreground hover:bg-primary/90"
      >
        BUSCAR
      </Button>
    </form>
  );
}
