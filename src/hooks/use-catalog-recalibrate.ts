"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CATALOG_RECALIBRATE } from "@/lib/motion-config";

/** idle → filtros somem → varredura no grid + reset → livros entram */
export type RecalibratePhase = "idle" | "clearing" | "sweep" | "reveal";

const { clearMs, sweepMs, revealMs, resetAtSweepMs } = CATALOG_RECALIBRATE;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function useCatalogRecalibrate(onReset: () => void) {
  const [phase, setPhase] = useState<RecalibratePhase>("idle");
  const runningRef = useRef(false);
  const runIdRef = useRef(0);

  useEffect(() => {
    return () => {
      runIdRef.current += 1;
      runningRef.current = false;
    };
  }, []);

  const start = useCallback(async () => {
    if (runningRef.current) return;

    const runId = ++runIdRef.current;
    const isStale = () => runId !== runIdRef.current;

    runningRef.current = true;
    try {
      setPhase("clearing");
      await wait(clearMs);
      if (isStale()) return;

      setPhase("sweep");
      await wait(resetAtSweepMs);
      if (isStale()) return;

      onReset();
      await wait(sweepMs - resetAtSweepMs);
      if (isStale()) return;

      setPhase("reveal");
      await wait(revealMs);
      if (isStale()) return;

      setPhase("idle");
    } finally {
      if (!isStale()) {
        runningRef.current = false;
      }
    }
  }, [onReset]);

  return {
    phase,
    start,
    isActive: phase !== "idle",
  };
}
