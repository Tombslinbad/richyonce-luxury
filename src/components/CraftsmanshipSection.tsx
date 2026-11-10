/**
 * RICHYONCE CLOTHING - EXPERIENCE D: CRAFTSMANSHIP — THE DETAILS THAT MATTER
 * Deep editorial sequence focusing on verified authentic garment details from the client's albums:
 * Embroidery, beading, lion crest stitchwork, velvet finishing, and royal coral regalia.
 *
 * Upgraded with ScrollTrigger-style IntersectionObserver animations:
 * - Subtle scale-up (0.94 -> 1.0) and fade-in for the master craftsmanship spotlight
 * - Staggered reveal for atelier specifications
 */

import React, { useState } from 'react';
import { Sparkles, Scissors, Eye, ShieldCheck, Check } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CraftsmanshipSectionProps {
  onExploreBespoke: () => void;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({ onExploreBespoke }) => {
  const [selectedPillar, setSelectedPillar] = useState(0);

  // Coordinated reveal sequence using useScrollReveal hook
  const sectionReveal = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const headerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15, delay: 0 });
  const tabsReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15, delay: 140 });
  const cardReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.12, delay: 260 });

  const pillars = [
    {
      id: 'embroidery',
      title: 'The Sovereign Lion Crest',
      tagline: 'HIGH-DENSITY BULLION EMBROIDERY',
      quote: 'Luxury is not announced. It is noticed.',
      description: 'The iconic African lion crest is rendered across our ceremonial Isiagu tunics with over 100,000 hand-calibrated stitches using spun metallic gold thread. Each tooth, mane contour, and royal gaze is balanced for maximum dignity.',
      image: '/assets/richyonce/collections/lion-crest-isiagu-masterpiece.jpg',
      specs: [
        'Over 100,000 individual bullion stitches per crest',
        'Direct application on high-twist wool & silk faille',
        'Tone-on-tone edge finishing with zero puckering',
        'Reinforced internal stabilizer prevents fabric distortion',
      ],
      detailLabel: 'Verified Client Archive · Lion Crest Isiagu Masterpiece',
    },
    {
      id: 'velvet',
      title: 'German Velvet & Regal Drapery',
      tagline: 'ZERO-DRAG ARCHITECTURAL TAILORING',
      quote: 'Every detail has a purpose.',
      description: 'Our ceremonial robes and grand Agbadas utilize dense cotton-back velvet with a rich matte luster. Tailored with an architectural sleeve shoulder bridge that rests comfortably without sagging during royal processions.',
      image: '/assets/richyonce/details/wine-velvet-profile.jpg',
      specs: [
        '500 GSM heavy-drape cotton-back velvet',
        'Structured shoulder saddle for natural arm carriage',
        'Hand-sewn gold filigree cuff bands',
        'Full silk satin lining for seamless fluid movement',
      ],
      detailLabel: 'Verified Client Archive · Velvet Monarch Silhouette Study',
    },
    {
      id: 'train',
      title: 'Ceremonial George Silk Train',
      tagline: 'SCULPTURAL DORSAL CONSTRUCTION',
      quote: 'Crafted with intention. Worn with presence.',
      description: 'The dramatic floor-sweeping red George silk wedding ensemble features a custom cape-back silhouette with subtle tone-on-tone embroidery running along the spine, balanced by structured shoulder wings that hold their shape.',
      image: '/assets/richyonce/details/red-train-back-embroidery.jpg',
      specs: [
        'Floor-length waterfall train with weighted hem',
        'Architectural box-shoulder wing construction',
        'Hand-embroidered sovereign dorsal crest',
        'Designed to accompany the bride’s train in harmony',
      ],
      detailLabel: 'Verified Client Archive · Red Ceremonial Train Study',
    },
    {
      id: 'regalia',
      title: 'Ancestral Coral & Carved Totems',
      tagline: 'AUTHENTIC CORAL CROWNS & EBONY STAFFS',
      quote: 'Presence begins with what you wear.',
      description: 'Every Richyonce ceremonial outfit is styled with heirloom-grade coral crowns crafted with authentic cylindrical and barrel beads from ancient Nigerian traditions, completed with hand-carved eagle and lion totem ebony staffs.',
      image: '/assets/richyonce/traditional/royal-red-coral-regalia.jpg',
      specs: [
        'Authentic polished cylindrical coral beads',
        'Hand-carved solid ebony staffs with eagle finials',
        'Custom fitted velvet & coral caps',
        'Ceremonial carved fans with horse hair whisks',
      ],
      detailLabel: 'Verified Client Archive · Royal Coral Regalia',
    },
  ];

  const current = pillars[selectedPillar];

  return (
    <section
      ref={sectionReveal.ref}
      className={`scroll-reveal ${sectionReveal.isRevealed ? 'animate-fadeIn' : ''} py-24 lg:py-32 bg-[#061611] relative overflow-hidden border-b border-[#E5C07B]/15`}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-[#0E3A2F]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Lead & Quotes with useScrollReveal hook and scroll-reveal class */}
        <div
          ref={headerReveal.ref}
          className={`scroll-reveal ${headerReveal.isRevealed ? 'animate-fadeIn' : ''} text-center max-w-3xl mx-auto mb-16`}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E5C07B] block mb-2 font-sans">
            CRAFTSMANSHIP CHAPTER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            The Details That Matter
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-12 h-px bg-[#E5C07B]/50" />
            <p className="font-serif italic text-base sm:text-lg text-[#E5C07B]">
              "Luxury is not announced. It is noticed."
            </p>
            <span className="w-12 h-px bg-[#E5C07B]/50" />
          </div>
          <p className="text-xs sm:text-sm text-white/60 font-light mt-2 max-w-xl mx-auto">
            Crafted with intention. Worn with presence. Inspect the genuine tailoring hallmarks of Richyonce garments.
          </p>
        </div>

        {/* 4 Interactive Pillar Tabs with useScrollReveal hook and scroll-reveal class */}
        <div
          ref={tabsReveal.ref}
          className={`scroll-reveal ${tabsReveal.isRevealed ? 'animate-fadeIn' : ''} flex justify-center gap-2 sm:gap-3 mb-12 overflow-x-auto pb-2 scrollbar-none`}
        >
          {pillars.map((pillar, idx) => {
            const isSelected = selectedPillar === idx;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(idx)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#E5C07B] text-[#0A231C] shadow-lg shadow-[#E5C07B]/20 font-bold scale-105'
                    : 'bg-[#0A2019] text-white/70 hover:text-white border border-white/10 hover:border-[#E5C07B]/40'
                }`}
              >
                <span>{pillar.title}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>

        {/* Main Craftsmanship Display Card with useScrollReveal hook and scroll-reveal class */}
        <div
          ref={cardReveal.ref}
          className={`scroll-reveal ${cardReveal.isRevealed ? 'animate-fadeIn' : ''} rounded-2xl bg-[#081B14] border border-[#E5C07B]/30 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[500px]`}
        >
            {/* Left Column: Authentic Photography Crop with Scrim (6 cols) */}
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto bg-black/40 overflow-hidden group">
              <img
                key={current.id}
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081B14] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#081B14] opacity-50 hidden lg:block" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-black/70 text-[#E5C07B] border border-[#E5C07B]/30 backdrop-blur-md">
                  {current.detailLabel}
                </span>
              </div>
            </div>

            {/* Right Column: Craftsmanship Specifications (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-sans font-semibold tracking-[0.25em] text-[#E5C07B] uppercase block mb-1">
                  {current.tagline}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  {current.title}
                </h3>
                <p className="font-serif italic text-sm text-[#E5C07B] mt-1">
                  "{current.quote}"
                </p>

                <div className="w-12 h-0.5 bg-[#E5C07B]/40 my-4" />

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  {current.description}
                </p>

                {/* Concrete Craftsmanship Hallmarks */}
                <div className="mt-6 space-y-2.5">
                  <span className="text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block">
                    ATELIER STANDARDS & SPECIFICATIONS:
                  </span>
                  {current.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-white/75">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B] mt-1.5 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Atelier Action */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-white/50 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Inspected by Master Tailor
                </span>

                <button
                  onClick={onExploreBespoke}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-colors cursor-pointer shadow-md"
                >
                  REQUEST CUSTOM CRAFT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};
