"use client";

import { useEffect, useRef, useState } from "react";

/** Pulso curto quando `value` aumenta e `enabled` é verdadeiro. */
export function usePulseOnIncrease(value: number, enabled: boolean) {
  const [pulse, setPulse] = useState(false);
  const prevRef = useRef(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = value;

    if (value > prev && enabled) {
      setPulse(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setPulse(false), 900);
    }
  }, [value, enabled]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return pulse;
}
