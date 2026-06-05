import type { LucideIcon } from "lucide-react";
import { BookOpen, Brain, Ghost, Landmark, ScrollText, Sparkles, Zap } from "lucide-react";

export type CategoryTheme = {
  icon: LucideIcon;
};

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  ofertas: { icon: Sparkles },
  literatura: { icon: BookOpen },
  conservadorismo: { icon: Landmark },
  historia: { icon: ScrollText },
  filosofia: { icon: Brain },
  quadrinhos: { icon: Zap },
  terror: { icon: Ghost },
};

export function getCategoryTheme(slug: string): CategoryTheme {
  return CATEGORY_THEMES[slug] ?? { icon: BookOpen };
}
