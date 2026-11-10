/**
 * RICHYONCE CLOTHING - SCROLL REVEAL COMPONENT
 * Declarative scroll-triggered animation container using IntersectionObserver.
 * Implements subtle scale-up, fade, and editorial blur reveals with luxury deceleration easing.
 */

import React, { ElementType, ReactNode } from 'react';
import { useScrollTrigger, ScrollTriggerOptions } from '../hooks/useScrollTrigger';

export type ScrollAnimationType =
  | 'fade-scale'   // subtle scale-up (0.94 -> 1) with fade
  | 'scale-up'     // pronounced scale-up (0.90 -> 1)
  | 'fade-up'      // vertical slide-up (translateY(28px) -> 0)
  | 'fade-down'    // vertical slide-down
  | 'blur-fade'    // camera focus blur reveal (blur(8px) -> blur(0))
  | 'slide-left'   // horizontal slide from left
  | 'slide-right';  // horizontal slide from right

export interface ScrollRevealProps extends ScrollTriggerOptions {
  children: ReactNode;
  animation?: ScrollAnimationType;
  /** Duration in milliseconds (default 900ms for luxury editorial feel) */
  duration?: number;
  /** Stagger index when rendering inside a list or grid */
  staggerIndex?: number;
  /** Step delay per stagger item in milliseconds (default 100ms) */
  staggerStep?: number;
  /** Additional CSS class names */
  className?: string;
  /** HTML element type to render (default 'div') */
  as?: ElementType;
  /** Inline style overrides */
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-scale',
  duration = 150,
  delay = 0,
  staggerIndex = 0,
  staggerStep = 0,
  threshold = 0.01,
  rootMargin = '150px 0px 100px 0px',
  triggerOnce = true,
  className = '',
  as: Component = 'div',
  style = {},
}) => {
  const calculatedDelay = delay + staggerIndex * staggerStep;

  const { ref, isIntersecting } = useScrollTrigger<HTMLElement>({
    threshold,
    rootMargin,
    triggerOnce,
    delay: calculatedDelay,
  });

  // Calculate inline transform styles based on animation type
  const getInitialState = (type: ScrollAnimationType): React.CSSProperties => {
    switch (type) {
      case 'fade-scale':
        return {
          opacity: 0,
          transform: 'translate3d(0, 24px, 0) scale(0.94)',
          filter: 'blur(3px)',
        };
      case 'scale-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 0, 0) scale(0.90)',
          filter: 'blur(4px)',
        };
      case 'fade-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 36px, 0)',
        };
      case 'fade-down':
        return {
          opacity: 0,
          transform: 'translate3d(0, -36px, 0)',
        };
      case 'blur-fade':
        return {
          opacity: 0,
          transform: 'translate3d(0, 16px, 0) scale(0.97)',
          filter: 'blur(10px)',
        };
      case 'slide-left':
        return {
          opacity: 0,
          transform: 'translate3d(-40px, 0, 0) scale(0.96)',
        };
      case 'slide-right':
        return {
          opacity: 0,
          transform: 'translate3d(40px, 0, 0) scale(0.96)',
        };
      default:
        return {
          opacity: 0,
          transform: 'translate3d(0, 20px, 0)',
        };
    }
  };

  const getActiveState = (): React.CSSProperties => {
    return {
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale(1)',
      filter: 'blur(0px)',
    };
  };

  const animationStyles: React.CSSProperties = {
    ...(isIntersecting ? getActiveState() : getInitialState(animation)),
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: isIntersecting ? 'auto' : 'opacity, transform, filter',
    ...style,
  };

  return (
    <Component
      ref={ref}
      className={`scroll-trigger-node ${isIntersecting ? 'is-revealed' : 'is-pending'} ${className}`}
      style={animationStyles}
    >
      {children}
    </Component>
  );
};
