import type { LucideIcon } from "lucide-react";
import { BookOpen, Compass, Rocket, Star } from "lucide-react";

export type SiteLink = {
  href: string;
  label: string;
};

export type NavQuickLink =
  | (SiteLink & { icon: LucideIcon })
  | SiteLink;

export const categoryNavQuickLinks: NavQuickLink[] = [
  { href: "/catalogo", label: "Catálogo", icon: BookOpen },
  { href: "/#destaques", label: "Destaques", icon: Star },
  { href: "/#mais-vendidos", label: "Mais vendidos", icon: Rocket },
  { href: "/busca?q=autor", label: "Autores", icon: Compass },
  { href: "/categoria/historia", label: "Editoras" },
  { href: "/categoria/literatura", label: "Novidades" },
];

export const siteMapLinks: SiteLink[] = [
  { href: "/catalogo", label: "Catálogo completo" },
  { href: "/#destaques", label: "Destaques" },
  { href: "/#mais-vendidos", label: "Mais vendidos" },
  { href: "/categoria/literatura", label: "Literatura" },
  { href: "/categoria/filosofia", label: "Filosofia" },
  { href: "/categoria/ofertas", label: "Ofertas" },
];

export const infoLinks: SiteLink[] = [
  { href: "/sobre", label: "Sobre a Livraria Astronauta" },
  { href: "/sobre#entregas", label: "Despacho e entregas" },
  { href: "/sobre#privacidade", label: "Política de privacidade" },
  { href: "/sobre#trocas", label: "Trocas e devoluções" },
];
