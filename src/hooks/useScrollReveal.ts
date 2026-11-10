/**
 * RICHYONCE CLOTHING - USE SCROLL REVEAL HOOK
 * Custom React hook using IntersectionObserver to add the `animate-fadeIn` class
 * to elements as they enter the viewport, with coordinated container & child sequence support.
 */

import { useEffect, useRef, useState, RefObject } from 'react';

export interface UseScrollRevealOptions {
  /** IntersectionObserver threshold from 0 to 1. Default 0.15 */
  threshold?: number | number[];
  /** Margin around root bounding box. Default '0px 0px -8% 0px' */
  rootMargin?: string;
  /** Whether to trigger only once (true) or re-trigger on scroll. Default true */
  triggerOnce?: boolean;
  /** Delay in milliseconds before adding the animation class. Default 0 */
  delay?: number;
  /** Class name added when the element enters viewport. Default 'animate-fadeIn' */
  animationClass?: string;
  /** Initial class applied prior to intersection to prime opacity/transform. Default 'scroll-reveal' */
  initClass?: string;
  /** Optional child CSS selector to coordinate a staggered reveal among children */
  childSelector?: string;
  /** Stagger delay in milliseconds between children when childSelector is provided. Default 110 */
  staggerMs?: number;
}

export interface UseScrollRevealReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;
  isRevealed: boolean;
  revealClass: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): UseScrollRevealReturn<T> {
  const {
    threshold = 0.02,
    rootMargin = '100px 0px 50px 0px',
    triggerOnce = true,
    delay = 0,
    animationClass = 'animate-fadeIn',
    initClass = 'scroll-reveal',
    childSelector,
    staggerMs = 0,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(true);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Prime the element with initClass if not yet revealed
    if (initClass && !node.classList.contains(animationClass)) {
      node.classList.add(initClass);
    }

    if (childSelector && initClass) {
      const childNodes = node.querySelectorAll<HTMLElement>(childSelector);
      childNodes.forEach((child) => {
        if (!child.classList.contains(animationClass)) {
          child.classList.add(initClass);
        }
      });
    }

    // Accessibility check: immediately reveal for users with reduced motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      node.classList.add(animationClass);
      if (childSelector) {
        const childNodes = node.querySelectorAll<HTMLElement>(childSelector);
        childNodes.forEach((child) => child.classList.add(animationClass));
      }
      setIsRevealed(true);
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const applyReveal = () => {
      node.classList.add(animationClass);
      setIsRevealed(true);

      if (childSelector) {
        const childNodes = Array.from(node.querySelectorAll<HTMLElement>(childSelector));
        childNodes.forEach((child, index) => {
          const childDelay = (index + 1) * staggerMs;
          const childTimer = setTimeout(() => {
            child.classList.add(animationClass);
          }, childDelay);
          timeouts.push(childTimer);
        });
      }
    };

    const removeReveal = () => {
      node.classList.remove(animationClass);
      setIsRevealed(false);

      if (childSelector) {
        const childNodes = node.querySelectorAll<HTMLElement>(childSelector);
        childNodes.forEach((child) => child.classList.remove(animationClass));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (entry.isIntersecting) {
          if (delay > 0) {
            const timer = setTimeout(applyReveal, delay);
            timeouts.push(timer);
          } else {
            applyReveal();
          }

          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          timeouts.forEach((t) => clearTimeout(t));
          timeouts.length = 0;
          removeReveal();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay, animationClass, initClass, childSelector, staggerMs]);

  return {
    ref: elementRef,
    isRevealed,
    revealClass: isRevealed ? animationClass : '',
  };
}

export default useScrollReveal;
