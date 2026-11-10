/**
 * RICHYONCE CLOTHING - EXPERIENCE E: TRADITION REIMAGINED
 * Tells the story of modern African identity, royal heritage, and contemporary sovereignty
 * through the client's authentic traditional wedding and ceremonial garments.
 *
 * Upgraded with ScrollTrigger-style IntersectionObserver animations:
 * - Subtle scale-up (0.94 -> 1.0) and fade-in for each editorial regalia piece
 * - Staggered entrance sequencing as the section scrolls into the viewport
 */

import React from 'react';
import { ChevronRight, Crown } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface TraditionReimaginedProps {
  onBespokeWedding: () => void;
  onExploreCollection: () => void;
}

export const TraditionReimagined: React.FC<TraditionReimaginedProps> = ({
  onBespokeWedding,
  onExploreCollection,
}) => {
  // Coordinated scroll reveal sequence using useScrollReveal hook
  const sectionReveal = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const headerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15, delay: 0 });
  const cardsContainerReveal = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
    childSelector: '.heritage-card-reveal',
    staggerMs: 130,
  });
  const bannerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15, delay: 200 });

  const cards = [
    {
      title: 'The Sovereign Crimson Wedding',
      tag: 'IGBO NUPTIAL REGALIA',
      subtitle: 'Bespoke Nuptial Entourage',
      actionText: 'Inquire',
      image: '/assets/richyonce/traditional/royal-red-wedding-couple.jpg',
      alt: 'Royal Crimson Igbo Wedding Regalia',
      description:
        'White structured under-tunic paired with an open-front scarlet waistcoat, cascading floor-length George silk skirt, and authentic Benin raw coral beads.',
      onAction: onBespokeWedding,
    },
    {
      title: 'Chartreuse Imperial Ensemble',
      tag: 'IMPERIAL SILK AGBADA',
      subtitle: '3-Piece Royal Agbada',
      actionText: 'Explore',
      image: '/assets/richyonce/traditional/chartreuse-imperial-agbada.jpg',
      alt: 'Chartreuse Imperial Grand Agbada',
      description:
        'Radiant lime-emerald raw silk faille with deep geometric chevron threadwork, paired with matching Fila cap and ceremonial carved lion staff.',
      onAction: onExploreCollection,
    },
    {
      title: 'The Sovereign Lion Court',
      tag: 'ROYAL LIONHEAD ISIAGU',
      subtitle: 'Ancestral Dignity',
      actionText: 'Commission',
      image: '/assets/richyonce/collections/lion-court-wedding.jpg',
      alt: 'The Sovereign Lion Court',
      description:
        'Contrast white under-tunic with an obsidian structured tunic bearing the golden lion crest, completed with an eagle-feathered cap and custom carved fan.',
      onAction: onBespokeWedding,
    },
  ];

  return (
    <section
      ref={sectionReveal.ref}
      className={`scroll-reveal ${sectionReveal.isRevealed ? 'animate-fadeIn' : ''} py-24 lg:py-32 bg-[#05110D] relative overflow-hidden border-b border-[#E5C07B]/15`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[40rem] h-[35rem] bg-[#0E3A2F]/20 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with useScrollReveal hook and scroll-reveal class */}
        <div
          ref={headerReveal.ref}
          className={`scroll-reveal ${headerReveal.isRevealed ? 'animate-fadeIn' : ''} max-w-3xl mb-16`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-4 h-4 text-[#E5C07B]" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E5C07B] font-sans">
              HERITAGE & SOVEREIGNTY
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Tradition, Interpreted Through a Modern Lens
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#E5C07B] mt-2">
            "Rooted in heritage. Designed for becoming."
          </p>
          <p className="text-xs sm:text-sm text-white/70 font-light mt-3 max-w-2xl leading-relaxed">
            In African culture, a man’s ceremonial garment is his declaration of family honor, ancestral stature, and sovereign identity. We preserve centuries of Igbo, Yoruba, and West African sartorial dignity while tailoring with mathematical Savile Row discipline.
          </p>
        </div>

        {/* 3-Column Editorial Ensemble with Coordinated useScrollReveal Stagger and scroll-reveal class */}
        <div
          ref={cardsContainerReveal.ref}
          className={`scroll-reveal ${cardsContainerReveal.isRevealed ? 'animate-fadeIn' : ''} grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8`}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className={`scroll-reveal heritage-card-reveal ${cardsContainerReveal.isRevealed ? 'animate-fadeIn' : ''} group rounded-2xl overflow-hidden bg-[#071913] border border-[#E5C07B]/20 hover:border-[#E5C07B]/60 transition-all duration-500 shadow-xl flex flex-col`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071913] via-transparent to-transparent opacity-75" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest font-mono px-3 py-1 rounded-full bg-black/60 text-[#E5C07B] border border-[#E5C07B]/30 backdrop-blur-md">
                    {card.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#E5C07B] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#E5C07B]">
                  <span className="font-mono text-[11px]">{card.subtitle}</span>
                  <button
                    onClick={card.onAction}
                    className="hover:underline flex items-center gap-1 cursor-pointer font-semibold group/btn"
                  >
                    <span>{card.actionText}</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Cultural Maxim Strip with useScrollReveal hook and scroll-reveal class */}
        <div
          ref={bannerReveal.ref}
          className={`scroll-reveal ${bannerReveal.isRevealed ? 'animate-fadeIn' : ''} mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#071813] via-[#0A241D] to-[#071813] border border-[#E5C07B]/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl`}
        >
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#E5C07B] font-semibold block mb-1">
              THE RICHYONCE PHILOSOPHY
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
              "Presence Begins With What You Wear."
            </h4>
            <p className="text-xs text-white/70 font-light mt-1">
              Handcrafted in Ebonyi, Lagos, and London for weddings, state banquets, and red carpet summits.
            </p>
          </div>

          <button
            onClick={onBespokeWedding}
            className="px-8 py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-colors shrink-0 shadow-lg shadow-[#E5C07B]/15 cursor-pointer font-medium"
          >
            START BESPOKE COMMISSION
          </button>
        </div>
      </div>
    </section>
  );
};
