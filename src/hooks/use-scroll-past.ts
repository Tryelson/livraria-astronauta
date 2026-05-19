"use client";

import { useSyncExternalStore } from "react";

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getScrollPastSnapshot(threshold: number) {
  return window.scrollY > threshold;
}

function getServerScrollPastSnapshot() {
  return false;
}

/** `true` quando a página foi rolada além do limite (SSR-safe). */
export function useScrollPast(threshold: number) {
  return useSyncExternalStore(
    subscribeScroll,
    () => getScrollPastSnapshot(threshold),
    () => getServerScrollPastSnapshot(),
  );
}
