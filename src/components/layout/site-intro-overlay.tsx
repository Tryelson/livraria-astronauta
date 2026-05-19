import Image from "next/image";
import { StoreWordmark } from "@/components/layout/store-wordmark";
import { STORE_LOGO_PATH } from "@/lib/config";

/** Overlay de abertura — visível via html[data-intro] (ver site-intro.css). */
export function SiteIntroOverlay() {
  return (
    <div className="site-intro" role="presentation" aria-hidden>
      <div className="site-intro__veil" />
      <div className="site-intro__stars" />
      <div className="site-intro__scan" />
      <div className="site-intro__content">
        <div className="site-intro__logo-wrap">
          <div className="site-intro__orbit" aria-hidden />
          <div className="site-intro__logo">
            <Image
              src={STORE_LOGO_PATH}
              alt=""
              fill
              sizes="88px"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <StoreWordmark className="site-intro__wordmark" />
        <p className="site-intro__tagline">Entrando em órbita…</p>
      </div>
    </div>
  );
}
