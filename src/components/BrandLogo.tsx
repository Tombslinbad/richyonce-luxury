/**
 * RICHYONCE CLOTHING - EMBLEMATIC VECTOR BRAND LOGO
 * Renders the interlocking YR monogram and high-fashion wordmark.
 */

import React from 'react';

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showWordmark = true,
  showTagline = false,
  size = 'md',
  variant = 'gold',
}) => {
  const monogramSizes = {
    sm: { width: 30, height: 32 },
    md: { width: 38, height: 42 },
    lg: { width: 54, height: 58 },
    xl: { width: 80, height: 86 },
  };

  const textSizes = {
    sm: 'text-base tracking-[0.25em]',
    md: 'text-xl tracking-[0.3em]',
    lg: 'text-2xl tracking-[0.35em]',
    xl: 'text-4xl tracking-[0.4em]',
  };

  const goldFill = '#E5C07B';
  const goldLight = '#F3DCA2';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Interlocking YR Monogram */}
      <svg
        width={monogramSizes[size].width}
        height={monogramSizes[size].height}
        viewBox="0 0 100 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Richyonce Monogram"
      >
        <defs>
          <linearGradient id="ryGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D1" />
            <stop offset="35%" stopColor={goldFill} />
            <stop offset="70%" stopColor="#C99F54" />
            <stop offset="100%" stopColor="#E5C07B" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stem of Y / Center axis */}
        <path
          d="M34 18 C34 12, 40 8, 48 8 C54 8, 60 12, 60 18 L60 36 L78 12 C82 8, 88 8, 92 12 C96 16, 94 22, 90 28 L64 64 L64 96 C64 102, 58 104, 52 104 C46 104, 40 102, 40 96 L40 64 L14 28 C10 22, 8 16, 12 12 C16 8, 22 8, 26 12 L44 36 Z"
          fill="url(#ryGoldGrad)"
          opacity="0.95"
        />

        {/* Intertwining 'R' Loop & Tail */}
        <path
          d="M48 20 C64 20, 84 26, 84 46 C84 62, 68 70, 52 70 L48 70 L72 98 C76 102, 74 106, 68 106 C64 106, 60 104, 56 100 L34 72 L34 24 C38 21, 43 20, 48 20 Z M48 32 L48 58 C62 58, 70 54, 70 45 C70 36, 62 32, 48 32 Z"
          fill="url(#ryGoldGrad)"
          stroke="#0A231C"
          strokeWidth="2"
        />

        {/* Serif flourishes */}
        <path
          d="M26 12 L36 12 M82 12 L92 12 M34 100 L64 100"
          stroke="url(#ryGoldGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Text Lockup */}
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-serif uppercase font-semibold text-[#E5C07B] leading-none ${textSizes[size]}`}
            style={{
              textShadow: '0 2px 10px rgba(229,192,123,0.2)',
              letterSpacing: '0.22em',
            }}
          >
            RICHYONCE
          </span>
          {showTagline && (
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#FAFAFA]/70 mt-1 font-sans">
              Excellence in Every Stitch
            </span>
          )}
        </div>
      )}
    </div>
  );
};
