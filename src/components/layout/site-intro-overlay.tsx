import { LogoMark } from "@/components/layout/logo-mark";
import { StoreWordmark } from "@/components/layout/store-wordmark";

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
          <LogoMark
            size="intro"
            className="site-intro__logo"
            priority
            imageSizes="88px"
          />
        </div>
        <StoreWordmark className="site-intro__wordmark" />
        <p className="site-intro__tagline">Entrando em órbita…</p>
      </div>
    </div>
  );
}
