/**
 * RICHYONCE CLOTHING - EXPERIENCE A: THE OPENING — ENTER THE WORLD OF RICHYONCE
 * Cinematic 50/50 split layout upgraded with authentic client photography,
 * multi-campaign toggle, gradual gold typography reveal, and animated scroll indicator.
 */

import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowDown, Sparkles, Compass } from 'lucide-react';
import { BRAND_ASSETS } from '../config/brandAssets';

interface HeroSectionProps {
  onShopCollection: () => void;
  onCreateYourLook: () => void;
  onBookAppointment: () => void;
  onOpenArchives?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopCollection,
  onCreateYourLook,
  onBookAppointment,
  onOpenArchives,
}) => {
  // Campaign photography toggle (authentic client shoots)
  const campaigns = [
    {
      id: 'emerald',
      title: 'The Sovereign Emerald Agbada',
      subtitle: 'HAND-STUDDED VELVET WITH EAGLE TOTEM STAFF',
      image: '/assets/richyonce/editorial/hero-sovereign-emerald.jpg',
      meta: 'Masterpiece Atelier Series · Ciscography',
    },
    {
      id: 'mercedes',
      title: 'The Twilight Mercedes Campaign',
      subtitle: 'CHARTREUSE AGBADA & VINTAGE MERCEDES SEDAN',
      image: '/assets/richyonce/editorial/twilight-mercedes-agbada.jpg',
      meta: 'Twilight Nuptial Editorial · Big J Photography',
    },
    {
      id: 'monarch',
      title: 'The Sovereign Monarch on Throne',
      subtitle: 'BURGUNDY VELVET & GOLD BULLION EMBROIDERY',
      image: '/assets/richyonce/editorial/monarch-throne.jpg',
      meta: 'Royal Court Archive · 2025',
    },
  ];

  const [activeCampaign, setActiveCampaign] = useState(0);

  // Auto transition campaign every 9s if user doesn't manually switch
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCampaign((prev) => (prev + 1) % campaigns.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [campaigns.length]);

  const currentCamp = campaigns[activeCampaign];

  return (
    <section id="home" className="relative min-h-[94vh] lg:min-h-screen pt-20 lg:pt-0 overflow-hidden flex items-center bg-[#071813]">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0E3A2F]/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[32rem] h-[32rem] bg-[#E5C07B]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[82vh] lg:min-h-[88vh]">
          {/* Left Panel: High Editorial Typography (50% / 7 cols) */}
          <div className="lg:col-span-7 relative z-10 flex flex-col justify-center py-6 lg:py-12">
            {/* Subtle Watermark YR Monogram with slow floating feel */}
            <div className="absolute -top-12 -left-8 sm:-left-12 opacity-[0.035] pointer-events-none select-none text-[#E5C07B] text-[18rem] sm:text-[26rem] font-serif leading-none font-bold transform -translate-y-2">
              YR
            </div>

            {/* Kicker / Motto with refined letter spacing */}
            <div className="relative mb-4 animate-hero-reveal hero-delay-1">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#E5C07B] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#E5C07B]" />
                MAIN CHARACTER ENERGY ONLY.
              </span>
              <span className="block text-xs sm:text-sm tracking-[0.2em] text-white/70 font-light mt-1">
                Bold. Audacious. Limitless.
              </span>
            </div>

            {/* Main Brand Title */}
            <h1 className="relative font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tight leading-[0.92] mb-4 text-balance animate-hero-reveal hero-delay-2">
              <span className="bg-gradient-to-r from-white via-[#FAFAFA] to-[#E5C07B] bg-clip-text text-transparent">
                RICHYONCE
              </span>
            </h1>

            {/* Brand Subtitle / Tagline */}
            <div className="relative mb-8">
              <h2 className="text-sm sm:text-base font-semibold tracking-[0.32em] uppercase text-[#E5C07B] mb-2 font-sans animate-hero-reveal hero-delay-3">
                EXCELLENCE IN EVERY STITCH
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-xl font-light leading-relaxed animate-hero-reveal hero-delay-4">
                Contemporary African Luxury, Tailored With Intention. Handcrafted bespoke grand Agbadas, regal Isiagu tunics, and modern razor-sharp tailoring.
              </p>
            </div>

            {/* Call to Actions (matching reference buttons) */}
            <div className="relative flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
              <button
                onClick={onShopCollection}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-all duration-300 shadow-xl shadow-[#E5C07B]/15 hover:shadow-[#E5C07B]/30 cursor-pointer group animate-hero-reveal hero-delay-5"
              >
                <span>SHOP COLLECTION</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onCreateYourLook}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-widest uppercase bg-[#081713]/80 text-[#E5C07B] border border-[#E5C07B]/60 hover:border-[#E5C07B] hover:bg-[#E5C07B]/10 transition-all duration-300 backdrop-blur-sm cursor-pointer group animate-hero-reveal hero-delay-6"
              >
                <span>CREATE YOUR LOOK</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onBookAppointment}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-widest uppercase bg-transparent text-white/85 border border-white/20 hover:border-[#E5C07B]/70 hover:text-[#E5C07B] transition-all duration-300 cursor-pointer group animate-hero-reveal hero-delay-7"
              >
                <span>BOOK AN APPOINTMENT</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Authentic Campaign Switcher Strip */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 animate-hero-reveal hero-delay-8">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E5C07B]">
                  CAMPAIGN LOOK:
                </span>
                <div className="flex gap-1.5">
                  {campaigns.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCampaign(i)}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        activeCampaign === i
                          ? 'bg-[#E5C07B] text-[#0A231C] font-bold'
                          : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      0{i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {onOpenArchives && (
                <button
                  onClick={onOpenArchives}
                  className="text-[11px] text-[#E5C07B] hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium tracking-wider"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>View All 18 Client Archives</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Panel: Editorial Media Column (50% / 5 cols) */}
          <div className="lg:col-span-5 relative w-full h-[520px] sm:h-[620px] lg:h-[720px] flex items-center justify-center animate-hero-media hero-delay-media">
            {/* Cinematic Frame with Subtle Gold Border */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#E5C07B]/30 shadow-2xl group">
              <img
                src={currentCamp.image}
                alt={currentCamp.title}
                key={currentCamp.id}
                className="w-full h-full object-cover object-top transition-all duration-1000 group-hover:scale-105 animate-fadeIn"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Scrim and Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071813] via-transparent to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071813]/60 via-transparent to-transparent hidden lg:block" />

              {/* Verified Authentic Badge */}
              <div className="absolute top-5 right-5">
                <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/70 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
                  ● Authentic Client Work
                </span>
              </div>

              {/* Subtle Atelier Tag on Media */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#081713]/85 backdrop-blur-md border border-[#E5C07B]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#E5C07B] font-semibold block">
                    {currentCamp.meta}
                  </span>
                  <span className="font-serif text-base text-white font-medium block truncate max-w-[220px]">
                    {currentCamp.title}
                  </span>
                </div>
                <button
                  onClick={onShopCollection}
                  className="px-3 py-1.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-white transition-colors cursor-pointer shrink-0"
                >
                  VIEW
                </button>
              </div>
            </div>

            {/* Scroll Indicator with animated line (Right margin on wide screens) */}
            <div className="hidden xl:flex absolute -right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-white/50">
              <span className="text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center text-[#E5C07B]/80 font-mono">
                SCROLL
              </span>
              <div className="w-5 h-9 rounded-full border border-[#E5C07B]/40 flex justify-center p-1 mt-6">
                <span className="w-1 h-2 bg-[#E5C07B] rounded-full animate-bounce mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
