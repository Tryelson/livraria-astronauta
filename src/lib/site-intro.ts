/** Script síncrono no topo do body: define data-intro antes da pintura */
export const SITE_INTRO_BOOTSTRAP_SCRIPT = `(function(){try{var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;document.documentElement.dataset.intro=r?"done":"active";}catch(e){document.documentElement.dataset.intro="done";}})();`;
