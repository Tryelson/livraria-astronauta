import { PageContainer } from "@/components/layout/page-container";
import { WhatsAppPhoneLink } from "@/components/layout/whatsapp-phone-link";
import { CreditCard, Phone, Rocket, Truck } from "lucide-react";

const benefits = [
  {
    icon: Phone,
    label: "Atendimento",
    accent: "orange" as const,
    isPhone: true,
  },
  {
    icon: CreditCard,
    label: "Pagamento",
    value: "Parcele em até 6x no cartão",
    accent: "teal" as const,
    isPhone: false,
  },
  {
    icon: Truck,
    label: "Entrega",
    value: "Entregas para Petrolândia e região",
    accent: "orange" as const,
    isPhone: false,
  },
] as const;

export function BenefitsBar() {
  return (
    <section className="mission-strip border-y border-border/50">
      <div className="mission-strip__nebula" aria-hidden />
      <PageContainer variant="bar">
        <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
          <Rocket className="size-4 text-brand-orange" aria-hidden />
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-cream/90 uppercase">
            Sua expedição literária
          </p>
        </div>
        <ul className="mission-strip__grid">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className={`mission-strip__card mission-strip__card--${item.accent}`}
              >
                <span className="mission-strip__icon">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="mission-strip__text">
                  <span className="mission-strip__label">{item.label}</span>
                  <span className="mission-strip__value">
                    {item.isPhone ? (
                      <WhatsAppPhoneLink className="text-inherit hover:text-brand-cream" />
                    ) : (
                      item.value
                    )}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </PageContainer>
    </section>
  );
}
