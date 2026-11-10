/**
 * RICHYONCE CLOTHING - EXPERIENCE B: THE EDITORIAL IMAGE REVEAL
 * Cinematic, asymmetric luxury fashion magazine layout showcasing
 * authentic completed garments from the client's albums.
 *
 * Upgraded Features:
 * - In-place Piece Inspector modal with prominent mobile 'X' and 'Back' buttons
 * - Guaranteed zero scroll-jumping / no redirects to home page when closing inspection
 * - Instant image display: loading="eager", decoding="async", hardware accelerated
 * - Scrollable high-resolution photography viewer with craftsmanship hallmarks
 */

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, Compass, Eye, ShieldCheck, ChevronRight, X, ArrowLeft, Check, Ruler } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { AtelierLazyImage } from './AtelierLazyImage';

interface EditorialGalleryProps {
  onOpenArchives: () => void;
  onExploreGarment?: (title: string) => void;
}

interface InspectedPiece {
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  caption?: string;
  quote?: string;
  detail?: string;
  meta?: string;
  volumeTag?: string;
  specs: string[];
}

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({
  onOpenArchives,
  onExploreGarment,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [inspectedPiece, setInspectedPiece] = useState<InspectedPiece | null>(null);

  // Observer on the main gallery section to provide a subtle active aura
  const { ref: sectionRef, isIntersecting: isSectionInView } = useScrollTrigger<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -5% 0px',
    triggerOnce: false,
  });

  // Lock background body scroll when inspector modal is open
  useEffect(() => {
    if (inspectedPiece) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [inspectedPiece]);

  const stories = [
    {
      id: 'monarch',
      title: 'The Sovereign Monarch',
      subtitle: 'BURGUNDY VELVET & GOLD BULLION',
      image: '/assets/richyonce/editorial/monarch-throne.jpg',
      caption: 'Seated upon the carved throne of heritage. Crafted in crushed German cotton velvet with hand-guided bullion embroidery on the sleeves, matched with an embroidered velvet Fila crown and ebony staff.',
      quote: 'Power is quiet. Authority is tailored.',
      meta: 'Ciscography Atelier Series · 2025',
      volumeTag: 'VOL. 01 / SOVEREIGNTY',
      specs: [
        'Pure German cotton velvet in imperial royal burgundy',
        'Over 85,000 spun metallic bullion embroidery stitches',
        'Bespoke velvet Fila crown with matching crest placket',
        'Traditional zero-drag drape with structured shoulder bridge',
      ],
    },
    {
      id: 'mercedes',
      title: 'Twilight Automotive Campaign',
      subtitle: 'CHARTREUSE AGBADA & VINTAGE MERCEDES',
      image: '/assets/richyonce/editorial/twilight-mercedes-agbada.jpg',
      caption: 'Shot at dusk beside a classic vintage Mercedes dressed with blush roses. A study in architectural volume, raw silk faille drape, and jade royal beadwork.',
      quote: 'A collision of vintage mechanical grace and West African sovereign presence.',
      meta: 'Lagos Dusk Campaign · Big J Photography',
      volumeTag: 'VOL. 02 / AUTOMOTIVE DUSK',
      specs: [
        'Triple-weave chartreuse silk faille with high liquid lustre',
        'Triple-panel architectural winged Agbada silhouette',
        'Hand-knotted raw silk tassel neck tie with jade beads',
        'Precision blind hemline engineered for flowing gait',
      ],
    },
    {
      id: 'wedding',
      title: 'The Royal Crimson Union',
      subtitle: 'CEREMONIAL RED GEORGE & BRIDAL VELVET',
      image: '/assets/richyonce/traditional/royal-red-wedding-couple.jpg',
      caption: 'The highest expression of traditional Igbo wedding ceremony. The groom commands in structured white linen and a sweeping red silk wrapper with authentic Benin coral regalia.',
      quote: 'Rooted in timeless ritual, engineered for modern royalty.',
      meta: 'Heritage Nuptials Collection',
      volumeTag: 'VOL. 03 / CEREMONIAL REGALIA',
      specs: [
        'Authentic high-grade Nigerian ceremonial George textile',
        'Hand-carved royal coral beads from ancient Benin artisans',
        'Double-layered structured tunic with reinforced placket',
        'Custom ceremonial horsehair flywhisk and beaded walking staff',
      ],
    },
    {
      id: 'bronze',
      title: 'The Chocolate Bronze Isiagu',
      subtitle: 'LION CREST & BRIDAL GOLD LACE',
      image: '/assets/richyonce/traditional/bronze-isiagu-couple.jpg',
      caption: 'Rich chocolate brown Isiagu tunic featuring the revered lion crest and custom tassel placket, accompanied by a bridal architectural gown in gold sequins and hand-beaded lace.',
      quote: 'Where ancestral symbolism meets Savile Row precision.',
      meta: 'Dcanny Studio Private Commission',
      volumeTag: 'VOL. 04 / ANCESTRAL MAJESTY',
      specs: [
        'Dense woven chocolate bronze jacquard with embossed lion head',
        'Custom gold bullion placket buttons with braided tassels',
        'Breathable silk cotton blend lining for tropical celebrations',
        'Reinforced side vents for royal seated comfort and ease of movement',
      ],
    },
  ];

  // Secondary Lookbook Archive Strip for deep scroll immersion
  const lookbookStrip = [
    {
      title: 'The Lion Crest Isiagu Masterpiece',
      category: 'CEREMONIAL ISIAGU',
      image: '/assets/richyonce/collections/lion-crest-isiagu-masterpiece.jpg',
      detail: 'Over 100,000 spun metallic gold bullion stitches with eagle feather crown',
      tag: 'ARCHIVE 05',
      specs: [
        'Embossed lion head velvet motif symbolizing ancestral chieftaincy',
        '24-carat gold-tone metallic wire embroidery',
        'Structured shoulder bridge preventing lapel collapse',
        'Includes red chieftaincy cap with authentic eagle feather',
      ],
    },
    {
      title: 'Crimson Architectural Double-Breasted Blazer',
      category: 'SAVILE ROW TAILORING',
      image: '/assets/richyonce/collections/crimson-blazer-bespoke.jpg',
      detail: 'Pure wool full-canvas construction with 24k gold-rimmed horn buttons',
      tag: 'ARCHIVE 06',
      specs: [
        'Super 150s pure Australian merino wool in imperial crimson',
        'Full floating horsehair canvas chest piece',
        'Hand-sewn Milanese buttonhole on left peaked lapel',
        'Genuine horn buttons rimmed with 24k gold plating',
      ],
    },
    {
      title: 'Crimson Textured Jacquard Tunic',
      category: 'TRADITIONAL COUTURE',
      image: '/assets/richyonce/collections/crimson-ceremonial-tunic.jpg',
      detail: 'Hand-set coral beaded crown and diamond jacquard relief tailoring',
      tag: 'ARCHIVE 07',
      specs: [
        'Textured diamond relief jacquard woven on artisanal looms',
        'Concealed magnetic placket closure with mother-of-pearl accents',
        'Structured mandarin collar engineered to remain upright',
        'Paired with handcrafted Edo coral bead crown',
      ],
    },
    {
      title: 'Velvet Sovereign Profile Study',
      category: 'ATELIER DETAILS',
      image: '/assets/richyonce/details/wine-velvet-profile.jpg',
      detail: 'Zero-drag architectural hemline with structured shoulder bridge',
      tag: 'ARCHIVE 08',
      specs: [
        'Crushed wine velvet treated for moisture resilience',
        'Hand-guided bullion sleeve crest embroidery',
        'Custom silk lining with bespoke monogram placement',
        'Weight-balanced hemline for majestic walking drape',
      ],
    },
  ];

  const currentStory = stories[activeStoryIndex];

  const handleOpenInspector = (piece: {
    title: string;
    subtitle?: string;
    category?: string;
    image: string;
    caption?: string;
    quote?: string;
    detail?: string;
    meta?: string;
    volumeTag?: string;
    specs?: string[];
  }) => {
    setInspectedPiece({
      title: piece.title,
      subtitle: piece.subtitle || piece.category || 'RICHYONCE BESPOKE ARCHIVE',
      category: piece.category || 'EDITORIAL COMMISSION',
      image: piece.image,
      caption: piece.caption || piece.detail,
      quote: piece.quote,
      detail: piece.detail,
      meta: piece.meta || 'Richyonce Atelier Lagos · Verified Piece',
      volumeTag: piece.volumeTag || 'ATELIER STUDY',
      specs: piece.specs || [
        'Handcrafted in Nigeria by Master Tailors',
        '100% authentic completed client commission',
        'Custom bespoke measurement profile available',
      ],
    });
  };

  return (
    <section
      ref={sectionRef}
      id="editorial"
      className="py-24 lg:py-32 bg-[#05130E] relative overflow-hidden border-b border-[#E5C07B]/15"
    >
      {/* Background ambient lighting with subtle breathing effect */}
      <div
        className={`absolute top-1/3 left-10 w-[35rem] h-[35rem] rounded-full blur-[160px] pointer-events-none transition-opacity duration-1000 ${
          isSectionInView ? 'opacity-35 bg-[#0E3A2F]' : 'opacity-15 bg-[#0E3A2F]'
        }`}
      />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E5C07B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Editorial Header - ScrollTrigger Fade-Up */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <ScrollReveal animation="fade-up" duration={850} className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-[#E5C07B]" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E5C07B] font-sans">
                THE EDITORIAL REVEAL · ARCHITECTURAL ATELIER
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              A Living Documentary of African Sovereignty
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light mt-3 leading-relaxed">
              Every garment in this archive was commissioned by real men of presence and handcrafted stitch by stitch in our ateliers. No synthetic illusions — only authentic completed tailoring.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-scale" delay={150} duration={800} className="flex items-center gap-3">
            <button
              onClick={onOpenArchives}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase bg-[#E5C07B]/10 text-[#E5C07B] border border-[#E5C07B]/40 hover:bg-[#E5C07B] hover:text-[#0A231C] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#E5C07B]/20"
            >
              <Compass className="w-4 h-4" />
              <span>EXPLORE ALL 18 ARCHIVES</span>
            </button>
          </ScrollReveal>
        </div>

        {/* Asymmetric Magazine Spread Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Large Cinematic Frame (7 cols) with ScrollTrigger Subtle Scale-Up */}
          <div className="lg:col-span-7 relative">
            <ScrollReveal
              animation="fade-scale"
              duration={950}
              threshold={0.12}
              className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-[#E5C07B]/30 shadow-2xl group bg-[#081813]"
            >
              {/* Dynamic Image with low-priority lazy loading & luxury skeleton state */}
              <AtelierLazyImage
                key={currentStory.id}
                src={currentStory.image}
                alt={currentStory.title}
                priority="low"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                containerClassName="relative w-full h-full overflow-hidden bg-[#081813]"
              />

              {/* Multi-stage Scrim Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05130E] via-[#05130E]/30 to-transparent opacity-90 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#05130E]/50 via-transparent to-transparent hidden sm:block pointer-events-none" />

              {/* Overlay Metadata on Image */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-black/60 text-[#E5C07B] border border-[#E5C07B]/35 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B] animate-pulse" />
                  <span>{currentStory.volumeTag}</span>
                </span>
                <span className="font-serif italic text-white/90 text-xs px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hidden sm:block">
                  Richyonce Atelier Lagos
                </span>
              </div>

              {/* Floating Quote & Title Callout */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#081813]/90 backdrop-blur-md border border-[#E5C07B]/25 shadow-2xl">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-serif italic text-base sm:text-lg text-[#E5C07B]">
                    "{currentStory.quote}"
                  </p>
                  <button
                    onClick={() => handleOpenInspector(currentStory)}
                    className="shrink-0 px-3 py-1.5 rounded-full bg-[#E5C07B]/15 hover:bg-[#E5C07B] text-[#E5C07B] hover:text-[#0A231C] border border-[#E5C07B]/40 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider shadow-md"
                    title="Inspect garment details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {currentStory.title}
                </h3>
                <span className="text-[11px] font-sans font-semibold tracking-[0.25em] text-[#E5C07B] uppercase block mt-0.5">
                  {currentStory.subtitle}
                </span>
                <p className="text-xs text-white/75 font-light mt-2 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {currentStory.caption}
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                  <span className="font-mono">{currentStory.meta}</span>
                  <button
                    onClick={() => handleOpenInspector(currentStory)}
                    className="text-[#E5C07B] hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Atelier Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Story Index Selector & Editorial Details (5 cols) - Staggered ScrollTrigger */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal animation="fade-up" duration={700}>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5C07B] font-semibold block mb-2 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5C07B]" />
                <span>CURATED CHAPTERS (SELECT TO REVEAL)</span>
              </span>
            </ScrollReveal>

            <div className="space-y-3">
              {stories.map((story, idx) => {
                const isActive = activeStoryIndex === idx;
                return (
                  <ScrollReveal
                    key={story.title}
                    animation="fade-scale"
                    staggerIndex={idx}
                    staggerStep={110}
                    duration={800}
                  >
                    <button
                      onClick={() => setActiveStoryIndex(idx)}
                      className={`w-full p-4 sm:p-5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group ${
                        isActive
                          ? 'border-[#E5C07B] bg-[#0A221B]/90 shadow-xl shadow-[#E5C07B]/10 ring-1 ring-[#E5C07B]/50 translate-x-1.5'
                          : 'border-white/10 bg-[#081813]/60 hover:border-[#E5C07B]/40 hover:bg-[#081813] hover:translate-x-1'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#E5C07B]' : 'text-[#E5C07B]/70'}`}>
                            0{idx + 1}.
                          </span>
                          <span className="text-[10px] tracking-widest uppercase text-white/50 font-semibold truncate">
                            {story.subtitle}
                          </span>
                        </div>
                        <h4 className={`font-serif text-base sm:text-lg font-bold mt-1 transition-colors ${
                          isActive ? 'text-[#E5C07B]' : 'text-white group-hover:text-[#E5C07B]'
                        }`}>
                          {story.title}
                        </h4>
                        <p className="text-xs text-white/60 font-light truncate mt-0.5">
                          {story.caption}
                        </p>
                      </div>

                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? 'border-[#E5C07B] bg-[#E5C07B] text-[#0A231C] scale-110 shadow-md shadow-[#E5C07B]/30'
                          : 'border-white/20 text-white/50 group-hover:border-[#E5C07B] group-hover:text-[#E5C07B]'
                      }`}>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Atelier Assurance Box */}
            <ScrollReveal animation="fade-up" delay={450} duration={850}>
              <div className="p-4 rounded-xl bg-black/50 border border-[#E5C07B]/20 mt-6 text-xs text-white/70 space-y-1.5 shadow-lg">
                <div className="flex items-center gap-1.5 text-[#E5C07B] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="tracking-wider uppercase text-[11px]">AUTHENTIC COMPLETED ATELIER COMMISSIONS</span>
                </div>
                <p className="text-[11px] leading-relaxed text-white/65">
                  All garments shown are physical bespoke commissions executed by Richyonce Clothing in Nigeria. No synthetic models, artificial clothing, or generated textures.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* SECONDARY EDITORIAL LOOKBOOK STRIP: Cascading Gallery */}
        <div className="mt-20 pt-16 border-t border-[#E5C07B]/15">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <ScrollReveal animation="fade-up">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5C07B] font-semibold block mb-1 font-mono">
                SARTORIAL VOLUMES & LOOKBOOK DETAILS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Architectural Menswear Studies
              </h3>
            </ScrollReveal>

            <ScrollReveal animation="fade-scale" delay={100}>
              <button
                onClick={onOpenArchives}
                className="text-xs text-[#E5C07B] hover:text-[#FAFAFA] flex items-center gap-1.5 font-medium transition-colors cursor-pointer group"
              >
                <span>View Complete Contact Sheet</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </ScrollReveal>
          </div>

          {/* 4-Card Staggered Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lookbookStrip.map((item, idx) => (
              <ScrollReveal
                key={item.title}
                animation="fade-scale"
                staggerIndex={idx}
                staggerStep={120}
                duration={900}
                threshold={0.15}
                className="group relative rounded-2xl overflow-hidden bg-[#071913] border border-[#E5C07B]/20 hover:border-[#E5C07B]/60 transition-all duration-500 shadow-xl flex flex-col"
              >
                {/* Image Container with Direct Click to Inspect */}
                <div
                  onClick={() => handleOpenInspector(item)}
                  className="relative aspect-[3/4] overflow-hidden bg-black/40 cursor-pointer"
                >
                  <AtelierLazyImage
                    src={item.image}
                    alt={item.title}
                    priority="low"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                    containerClassName="relative w-full h-full overflow-hidden bg-black/40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071913] via-transparent to-transparent opacity-85" />

                  {/* Tag badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] uppercase tracking-widest font-mono px-2.5 py-0.5 rounded-full bg-black/70 text-[#E5C07B] border border-[#E5C07B]/30 backdrop-blur-md">
                      {item.tag}
                    </span>
                  </div>

                  {/* Mobile & Desktop Inspect Piece Button Overlay */}
                  <div className="absolute inset-0 bg-[#0A231C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-full bg-[#E5C07B] text-[#0A231C] text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Piece</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#E5C07B] block mb-1">
                      {item.category}
                    </span>
                    <h4
                      onClick={() => handleOpenInspector(item)}
                      className="font-serif text-base font-bold text-white group-hover:text-[#E5C07B] transition-colors leading-snug cursor-pointer"
                    >
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-white/65 font-light mt-1.5 leading-relaxed line-clamp-2">
                      {item.detail}
                    </p>
                  </div>

                  {/* Prominent Action Bar with Mobile-Clear Inspect Button */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs gap-2">
                    <button
                      onClick={() => handleOpenInspector(item)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-[#E5C07B]/10 hover:bg-[#E5C07B] text-[#E5C07B] hover:text-[#0A231C] border border-[#E5C07B]/30 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Piece</span>
                    </button>
                    <button
                      onClick={() => handleOpenInspector(item)}
                      className="w-8 h-8 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-[#E5C07B] flex items-center justify-center shrink-0 transition-colors"
                      title="View garment details"
                      aria-label={`View ${item.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* DEDICATED PIECE INSPECTION MODAL - Mobile-Friendly with Prominent 'X' Button */}
      {inspectedPiece && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 md:p-8"
        >
          <div className="relative w-full max-w-4xl bg-[#081813] border border-[#E5C07B]/40 rounded-2xl shadow-2xl overflow-hidden text-white my-2 sm:my-6 max-h-[94vh] flex flex-col animate-fadeIn">
            {/* Sticky Mobile/Desktop Top Header Bar with prominent X button */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#06140F] flex items-center justify-between sticky top-0 z-30 shadow-md">
              <button
                onClick={() => setInspectedPiece(null)}
                aria-label="Back to lookbook - retain scroll position"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#E5C07B] text-white hover:text-[#0A231C] border border-white/15 transition-all cursor-pointer font-semibold text-xs uppercase tracking-wider active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO LOOKBOOK</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs text-[#E5C07B] font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>AUTHENTIC ATELIER COMMISSION</span>
              </div>

              {/* Large, High-Contrast 'X' Button (44x44px touch target) */}
              <button
                onClick={() => setInspectedPiece(null)}
                aria-label="Close piece inspection and return to previous page"
                className="w-11 h-11 flex items-center justify-center text-white/90 hover:text-[#0A231C] rounded-full bg-white/10 hover:bg-[#E5C07B] border border-white/20 hover:border-[#E5C07B] transition-all cursor-pointer shadow-lg active:scale-95 shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Full Aspect Photography Display */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="relative rounded-xl overflow-hidden border border-[#E5C07B]/30 bg-black aspect-[3/4] shadow-2xl group">
                    <AtelierLazyImage
                      src={inspectedPiece.image}
                      alt={inspectedPiece.title}
                      priority="low"
                      className="w-full h-full object-cover object-top"
                      containerClassName="relative w-full h-full overflow-hidden bg-black"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    {/* Volume Tag Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-black/80 text-[#E5C07B] border border-[#E5C07B]/40 backdrop-blur-md">
                        {inspectedPiece.volumeTag || inspectedPiece.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-[11px] text-white/80 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10">
                      <p className="italic font-serif text-[#E5C07B]">
                        "{inspectedPiece.quote || 'Crafted with intention, presence, and cultural majesty.'}"
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/50 text-center font-mono">
                    High-Resolution Photography · 100% Unaltered Client Garment
                  </p>
                </div>

                {/* Garment Specifications & Editorial Details */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#E5C07B] uppercase block mb-1">
                      {inspectedPiece.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {inspectedPiece.title}
                    </h3>
                    {inspectedPiece.subtitle && (
                      <span className="text-xs font-sans font-semibold tracking-wider text-[#E5C07B] uppercase block mt-1">
                        {inspectedPiece.subtitle}
                      </span>
                    )}
                  </div>

                  <div className="w-12 h-0.5 bg-[#E5C07B]/40" />

                  {/* Caption & Description */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <span className="text-[10px] font-semibold text-[#E5C07B] uppercase tracking-wider block">
                      CURATORIAL OVERVIEW
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed font-light">
                      {inspectedPiece.caption || inspectedPiece.detail}
                    </p>
                  </div>

                  {/* Specifications Checklist */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block">
                      ATELIER CRAFTSMANSHIP HALLMARKS:
                    </span>
                    <div className="space-y-2">
                      {inspectedPiece.specs.map((spec, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-white/80 p-2.5 rounded-lg bg-[#0A221B]/60 border border-white/5">
                          <Check className="w-4 h-4 text-[#E5C07B] shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata & Atelier Location */}
                  <div className="pt-2 text-[11px] text-white/50 space-y-1 font-mono">
                    <p>Atelier Reference: {inspectedPiece.meta}</p>
                    <p>Dispatch: Insured White-Glove Worldwide Delivery</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 space-y-3">
                    <button
                      onClick={() => {
                        setInspectedPiece(null);
                        onOpenArchives();
                      }}
                      className="w-full py-3.5 px-4 rounded-lg bg-[#E5C07B] text-[#0A231C] font-semibold text-xs uppercase tracking-widest hover:bg-[#F3DCA2] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#E5C07B]/20"
                    >
                      <Compass className="w-4 h-4" />
                      <span>EXPLORE ARCHIVE CONTACT SHEET</span>
                    </button>

                    <button
                      onClick={() => setInspectedPiece(null)}
                      className="w-full py-3 px-4 rounded-lg bg-transparent text-white/80 hover:text-white border border-white/20 hover:border-white/50 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4 text-[#E5C07B]" />
                      <span>CLOSE & RETURN TO LOOKBOOK</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
