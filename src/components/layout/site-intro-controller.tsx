"use client";

import { useEffect } from "react";

const INTRO_PLAY_MS = 1400;
const INTRO_EXIT_MS = 650;

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
    }, INTRO_PLAY_MS);

    const doneTimer = window.setTimeout(() => {
      root.dataset.intro = "done";
    }, INTRO_PLAY_MS + INTRO_EXIT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return null;
}
