/**
 * RICHYONCE CLOTHING - EXPERIENCE G: THE FINAL BRAND STATEMENT
 * Memorable closing editorial moment before the customer dashboard.
 * Bold typography, generous negative space, and authentic photography backdrop.
 *
 * Upgraded with ScrollTrigger-style IntersectionObserver animations:
 * - Subtle scale-up (0.92 -> 1.0) and cinematic blur-fade for the manifesto headline
 */

import React from 'react';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface BrandStatementProps {
  onExploreCollection: () => void;
  onCreateBespoke: () => void;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({
  onExploreCollection,
  onCreateBespoke,
}) => {
  return (
    <section className="relative py-28 lg:py-36 bg-[#040E0A] overflow-hidden text-center flex items-center justify-center border-b border-[#E5C07B]/15">
      {/* Background Photography with Deep Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/richyonce/editorial/twilight-mercedes-agbada.jpg"
          alt="Richyonce Twilight Editorial Masterpiece"
          className="w-full h-full object-cover object-center opacity-30 filter grayscale-[25%]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040E0A] via-[#040E0A]/80 to-[#040E0A]" />
        <div className="absolute inset-0 bg-[#071913]/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Editorial Pill / Kicker with ScrollReveal */}
        <ScrollReveal animation="fade-down" duration={700}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E5C07B]/30 bg-[#0A231C]/80 text-[#E5C07B] text-xs font-mono tracking-[0.25em] uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE SARTORIAL MANIFESTO</span>
          </div>
        </ScrollReveal>

        {/* Giant Monolithic Editorial Headline with Subtle Scale-Up */}
        <ScrollReveal animation="scale-up" duration={1000} threshold={0.15}>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] text-balance">
            WEAR YOUR{' '}
            <span className="bg-gradient-to-r from-white via-[#FAFAFA] to-[#E5C07B] bg-clip-text text-transparent">
              PRESENCE.
            </span>
          </h2>
        </ScrollReveal>

        {/* Subtitle with ScrollReveal Fade-Up */}
        <ScrollReveal animation="fade-up" delay={150} duration={850}>
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="font-serif text-xl sm:text-2xl text-[#E5C07B] font-medium tracking-wide">
              RICHYONCE <span className="font-sans font-light text-white/50">—</span> Excellence in Every Stitch.
            </p>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              From the grand ceremonial courts of West Africa to global capitals of art, culture, and power. Every stitch is an investment in your stature.
            </p>
          </div>
        </ScrollReveal>

        {/* Dual Actions with ScrollReveal Fade-Scale */}
        <ScrollReveal animation="fade-scale" delay={250} duration={800}>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreCollection}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-xs sm:text-sm font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-all duration-300 shadow-xl shadow-[#E5C07B]/20 cursor-pointer group"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onCreateBespoke}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-xs sm:text-sm font-semibold tracking-widest uppercase bg-transparent text-[#E5C07B] border border-[#E5C07B]/60 hover:bg-[#E5C07B]/10 hover:border-[#E5C07B] transition-all duration-300 cursor-pointer group"
            >
              <span>COMMISSION A BESPOKE CREATION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>

        {/* Heritage Seal */}
        <ScrollReveal animation="fade-up" delay={350} duration={700}>
          <div className="pt-8 flex items-center justify-center gap-6 text-[10px] text-white/40 tracking-[0.2em] uppercase font-mono">
            <span>AUTHENTIC CLIENT WORK</span>
            <span>·</span>
            <span>100% NIGERIAN TAILORING</span>
            <span>·</span>
            <span>WORLDWIDE COURIER DISPATCH</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
