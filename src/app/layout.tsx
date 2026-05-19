import type { Metadata } from "next";
import { Exo_2, Inter, Libre_Baskerville } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { FloatingCartButton } from "@/components/cart/floating-cart-button";
import { BenefitsBar } from "@/components/layout/benefits-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GalaxyBackground } from "@/components/layout/galaxy-background";
import { Providers } from "@/components/providers";
import { STORE_NAME } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const exo2 = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${STORE_NAME} | Catálogo de livros`,
    template: `%s | ${STORE_NAME}`,
  },
  description:
    "Livraria online com literatura, filosofia, história e ofertas. Finalize seu pedido pelo WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${libreBaskerville.variable} ${exo2.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-sans">
        <GalaxyBackground />
        <Providers>
          <div className="relative z-0 flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip">
            <SiteHeader />
            <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
            <BenefitsBar />
            <SiteFooter />
          </div>
          <CartDrawer />
          <FloatingCartButton />
        </Providers>
      </body>
    </html>
  );
}
