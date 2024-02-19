"use client";

import { useCallback, useEffect, useState } from "react";

export default function useDebouncedPromise<T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedFunc = useCallback(
    (...args: Parameters<T>) => {
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        func(...args);
      }, delay);
      setTimer(newTimer);
    },
    [func, delay, timer],
  );

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return debouncedFunc;
}
