import { useState, useRef, useCallback } from 'react';
import { ANIMATION_DURATION } from '../constants';

interface UseNumberAnimationReturn {
  displayedStart: number;
  displayedEnd: number;
  animateNumbers: (fromStart: number, toStart: number, fromEnd: number, toEnd: number, duration?: number) => void;
  setDisplayedValues: (start: number, end: number) => void;
}

export const useNumberAnimation = (): UseNumberAnimationReturn => {
  const [displayedStart, setDisplayedStart] = useState<number>(0);
  const [displayedEnd, setDisplayedEnd] = useState<number>(0);
  
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const easeOutCubic = useCallback((t: number) => 1 - Math.pow(1 - t, 3), []);

  const animateNumbers = useCallback((
    fromStart: number,
    toStart: number,
    fromEnd: number,
    toEnd: number,
    duration = ANIMATION_DURATION
  ) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    startTimeRef.current = null;

    const step = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      const easedProgress = easeOutCubic(progress);

      const currentStart = Math.round(fromStart + (toStart - fromStart) * easedProgress);
      const currentEnd = Math.round(fromEnd + (toEnd - fromEnd) * easedProgress);

      setDisplayedStart(currentStart);
      setDisplayedEnd(currentEnd);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [easeOutCubic]);

  const setDisplayedValues = useCallback((start: number, end: number) => {
    setDisplayedStart(start);
    setDisplayedEnd(end);
  }, []);

  return {
    displayedStart,
    displayedEnd,
    animateNumbers,
    setDisplayedValues
  };
};
