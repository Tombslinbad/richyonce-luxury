/**
 * RICHYONCE CLOTHING - LIGHTWEIGHT SCROLLTRIGGER HOOK
 * High-performance IntersectionObserver hook for luxury editorial scroll animations.
 * Provides GPU-accelerated enter/exit triggers, stagger sequencing, and progress tracking.
 */

import { useEffect, useRef, useState, useMemo } from 'react';

export interface ScrollTriggerOptions {
  /** Intersection threshold from 0 to 1 (or array). Default 0.15 */
  threshold?: number | number[];
  /** Margin around root bounding box, e.g. '0px 0px -10% 0px'. Default triggers slightly before bottom */
  rootMargin?: string;
  /** Whether to trigger only once or re-trigger when scrolling back. Default true */
  triggerOnce?: boolean;
  /** Execution delay in ms (useful for stagger sequences). Default 0 */
  delay?: number;
  /** Element ID or CSS selector of custom scroll container (default viewport) */
  root?: Element | null;
}

export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  options: ScrollTriggerOptions = {}
) {
  const {
    threshold = 0.01,
    rootMargin = '150px 0px 100px 0px',
    triggerOnce = true,
    delay = 0,
    root = null,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [hasTriggered, setHasTriggered] = useState(true);
  const [intersectionRatio, setIntersectionRatio] = useState(1);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsIntersecting(true);
      setHasTriggered(true);
      setIntersectionRatio(1);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        setIntersectionRatio(entry.intersectionRatio);

        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = setTimeout(() => {
              setIsIntersecting(true);
              setHasTriggered(true);
            }, delay);
          } else {
            setIsIntersecting(true);
            setHasTriggered(true);
          }

          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          if (timeoutId) clearTimeout(timeoutId);
          setIsIntersecting(false);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(node);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay, root]);

  return {
    ref: elementRef,
    isIntersecting: triggerOnce ? hasTriggered : isIntersecting,
    hasTriggered,
    intersectionRatio,
  };
}

/**
 * Hook for generating a staggered sequence of trigger states
 * Useful for grids and lists where children animate sequentially.
 */
export function useStaggeredScrollTrigger(
  itemCount: number,
  baseDelay = 80,
  options: ScrollTriggerOptions = {}
) {
  const parentTrigger = useScrollTrigger<HTMLDivElement>(options);

  const itemStates = useMemo(() => {
    return Array.from({ length: itemCount }).map((_, idx) => ({
      delayMs: idx * baseDelay,
      isRevealed: parentTrigger.isIntersecting,
    }));
  }, [itemCount, baseDelay, parentTrigger.isIntersecting]);

  return {
    containerRef: parentTrigger.ref,
    isIntersecting: parentTrigger.isIntersecting,
    itemStates,
  };
}
