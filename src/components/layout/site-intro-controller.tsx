"use client";

import { useEffect } from "react";
import { SITE_INTRO } from "@/lib/motion-config";

/**
 * Avança data-intro (active → exiting → done) a cada carregamento.
 * O overlay e as animações são controlados por CSS em site-intro.css.
 */
export function SiteIntroController() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "active") return;

    const exitTimer = window.setTimeout(() => {
      root.dataset.intro = "exiting";
    }, SITE_INTRO.playMs);

    const doneTimer = window.setTimeout(() => {
      root.dataset.intro = "done";
    }, SITE_INTRO.playMs + SITE_INTRO.exitMs);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return null;
}
