import { BackButton } from "@/components/layout/back-button";
import { STORE_ADDRESS, STORE_NAME, STORE_PHONE } from "@/lib/config";

export const metadata = {
  title: "Sobre",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <BackButton href="/" className="mb-6" />
      <h1 className="font-serif text-3xl font-bold">Sobre a {STORE_NAME}</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Somos uma livraria online com curadoria de literatura, filosofia, história
        e ciência — do clássico ao contemporâneo. Navegue pelo catálogo, monte seu
        carrinho e finalize o pedido direto pelo WhatsApp.
      </p>

      <section id="entregas" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Despacho e entregas</h2>
        <p className="mt-3 text-muted-foreground">
          Enviamos para todo o Brasil. O prazo e o valor do frete são combinados
          no WhatsApp após a confirmação do pedido.
        </p>
      </section>

      <section id="privacidade" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Política de privacidade</h2>
        <p className="mt-3 text-muted-foreground">
          Utilizamos apenas os dados necessários para processar seu pedido via
          WhatsApp. Não vendemos informações a terceiros.
        </p>
      </section>

      <section id="trocas" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Trocas e devoluções</h2>
        <p className="mt-3 text-muted-foreground">
          Em caso de defeito ou diverência, entre em contato em até 7 dias após o
          recebimento para avaliarmos a troca ou reembolso.
        </p>
      </section>

      <section id="contato" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Contato</h2>
        <p className="mt-3 text-muted-foreground">
          Telefone: {STORE_PHONE}
          <br />
          {STORE_ADDRESS}
        </p>
      </section>
    </article>
  );
}
