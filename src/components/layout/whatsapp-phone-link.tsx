import { STORE_PHONE } from "@/lib/config";
import { getWhatsAppContactUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type WhatsAppPhoneLinkProps = {
  className?: string;
  children?: React.ReactNode;
};

export function WhatsAppPhoneLink({
  className,
  children = STORE_PHONE,
}: WhatsAppPhoneLinkProps) {
  return (
    <a
      href={getWhatsAppContactUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("hover:text-brand-cream hover:underline", className)}
    >
      {children}
    </a>
  );
}
