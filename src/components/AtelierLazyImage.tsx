/**
 * RICHYONCE CLOTHING - ATELIER LAZY IMAGE
 * Implements low-priority lazy loading with a luxury gold-shimmer skeleton state.
 * Keeps initial page load instantaneous while smoothly crossfading imagery when rendered.
 */

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface AtelierLazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  priority?: 'low' | 'auto' | 'high';
  showLabel?: boolean;
  onClick?: () => void;
}

export const AtelierLazyImage: React.FC<AtelierLazyImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover object-top',
  containerClassName = 'relative w-full h-full overflow-hidden bg-[#071913]',
  referrerPolicy = 'no-referrer',
  priority = 'low',
  showLabel = true,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset loaded status whenever the source changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={containerClassName} onClick={onClick}>
      {/* Low-Priority Skeleton Loader State */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#071913] flex flex-col items-center justify-center overflow-hidden z-10 transition-opacity duration-500 pointer-events-none"
        >
          {/* Subtle Atelier Ambient Shimmer Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#09221B]/40 via-[#071913] to-[#04100C]" />

          {/* Sweeping Gold Shimmer Band */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E5C07B]/12 to-transparent animate-skeleton-shimmer" />

          {/* Central Luxury Crest & Pulse Kicker */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-2 select-none">
            <div className="w-9 h-9 rounded-full border border-[#E5C07B]/25 bg-[#0A221B]/80 flex items-center justify-center shadow-lg shadow-black/40">
              <Sparkles className="w-4 h-4 text-[#E5C07B]/60 animate-pulse" />
            </div>
            {showLabel && (
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#E5C07B]/50 animate-pulse">
                ATELIER ARCHIVE
              </span>
            )}
          </div>
        </div>
      )}

      {/* Error Fallback State */}
      {hasError && (
        <div className="absolute inset-0 bg-[#071913] flex flex-col items-center justify-center p-4 text-center z-10">
          <span className="text-[10px] font-mono tracking-widest text-[#E5C07B]/60 uppercase">
            Piece Archive Loading
          </span>
        </div>
      )}

      {/* The Actual Lazy-Loaded Image with Low Network Priority */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        // @ts-ignore - fetchPriority is supported in modern browsers
        fetchpriority={priority}
        referrerPolicy={referrerPolicy}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
