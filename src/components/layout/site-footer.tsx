import Link from "next/link";
import { WhatsAppPhoneLink } from "@/components/layout/whatsapp-phone-link";
import {
  STORE_ADDRESS,
  STORE_INSTAGRAM_URL,
  STORE_NAME,
  TM_SOFTWARE_URL,
} from "@/lib/config";
import { getWhatsAppContactUrl } from "@/lib/whatsapp";
import { infoLinks, siteMapLinks } from "@/lib/site-links";

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div className="bg-card/85 text-foreground backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4 md:px-6">
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wider uppercase">
              Mapa do site
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteMapLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wider uppercase">
              Informações
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wider uppercase">
              Endereço
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {STORE_ADDRESS}
            </p>
            <h3 className="mt-6 mb-3 text-sm font-bold tracking-wider uppercase">
              Fale conosco
            </h3>
            <p className="text-sm text-muted-foreground">
              <WhatsAppPhoneLink />
            </p>
            <a
              href={getWhatsAppContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-brand-orange hover:underline"
            >
              Entre em contato
            </a>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wider uppercase">
              Formas de pagamento
            </h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Finalize seu pedido pelo WhatsApp. Aceitamos Pix, cartão e
              transferência — combinamos na conversa.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Pix", "Visa", "Master", "Elo", "Amex"].map((method) => (
                <span
                  key={method}
                  className="rounded border border-border bg-muted px-2 py-1 text-xs text-foreground"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border bg-background/80 py-4 text-center text-xs text-muted-foreground backdrop-blur-md">
        <p className="font-medium">
          <a
            href={STORE_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-cream hover:underline"
          >
            {STORE_NAME}
          </a>
        </p>
        <p className="mt-1">
          © Todos os direitos reservados. {new Date().getFullYear()}
        </p>
        <p className="mt-2">
          Desenvolvido por{" "}
          <a
            href={TM_SOFTWARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-orange hover:underline"
          >
            TM Software
          </a>
        </p>
      </div>
    </footer>
  );
}
