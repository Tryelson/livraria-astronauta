"use client";

import { useCallback, useRef, useState } from "react";

/** idle → filtros somem → varredura no grid + reset → livros entram */
export type RecalibratePhase = "idle" | "clearing" | "sweep" | "reveal";

const CLEAR_MS = 320;
const SWEEP_MS = 680;
const REVEAL_MS = 880;
const RESET_AT_SWEEP_MS = 220;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function useCatalogRecalibrate(onReset: () => void) {
  const [phase, setPhase] = useState<RecalibratePhase>("idle");
  const runningRef = useRef(false);

  const start = useCallback(async () => {
    if (runningRef.current) return;

    runningRef.current = true;
    try {
      setPhase("clearing");
      await wait(CLEAR_MS);

      setPhase("sweep");
      await wait(RESET_AT_SWEEP_MS);
      onReset();
      await wait(SWEEP_MS - RESET_AT_SWEEP_MS);

      setPhase("reveal");
      await wait(REVEAL_MS);

      setPhase("idle");
    } finally {
      runningRef.current = false;
    }
  }, [onReset]);

  return {
    phase,
    start,
    isActive: phase !== "idle",
  };
}
