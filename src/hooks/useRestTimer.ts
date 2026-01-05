import { useState, useRef, useCallback, useEffect } from 'react';

interface UseRestTimerReturn {
  timeRemaining: number;
  isRunning: boolean;
  start: (seconds?: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  skip: () => void;
}

export function useRestTimer(
  defaultSeconds: number,
  onComplete?: () => void
): UseRestTimerReturn {
  const [timeRemaining, setTimeRemaining] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(
    (seconds?: number) => {
      clear();
      const duration = seconds ?? defaultSeconds;
      endTimeRef.current = Date.now() + duration * 1000;
      setTimeRemaining(duration);
      setIsRunning(true);

      intervalRef.current = window.setInterval(() => {
        if (endTimeRef.current === null) return;

        const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
        setTimeRemaining(remaining);

        if (remaining === 0) {
          clear();
          setIsRunning(false);
          onComplete?.();
        }
      }, 100); // Check every 100ms for smooth UI
    },
    [defaultSeconds, clear, onComplete]
  );

  const pause = useCallback(() => {
    clear();
    setIsRunning(false);
  }, [clear]);

  const resume = useCallback(() => {
    if (timeRemaining > 0 && !isRunning) {
      start(timeRemaining);
    }
  }, [timeRemaining, isRunning, start]);

  const reset = useCallback(() => {
    clear();
    setTimeRemaining(defaultSeconds);
    setIsRunning(false);
    endTimeRef.current = null;
  }, [defaultSeconds, clear]);

  const skip = useCallback(() => {
    clear();
    setTimeRemaining(0);
    setIsRunning(false);
    endTimeRef.current = null;
    onComplete?.();
  }, [clear, onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clear();
  }, [clear]);

  return {
    timeRemaining,
    isRunning,
    start,
    pause,
    resume,
    reset,
    skip,
  };
}
