/**
 * RICHYONCE CLOTHING - ASCENT COLLECTION SECTION
 * Features 5 signature pieces with live pricing, stock badges, quick-add,
 * and horizontal navigation matching the reference website.
 */

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ScrollReveal } from './ScrollReveal';

interface AscentCollectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreAscent: () => void;
}

export const AscentCollection: React.FC<AscentCollectionProps> = ({
  products,
  onSelectProduct,
  onExploreAscent,
}) => {
  const { addToCart } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [addedId, setAddedId] = React.useState<string | null>(null);

  // Filter only ASCENT pieces or fallback to first 5
  const ascentPieces = products.filter((p) => p.isAscentCollection).slice(0, 5);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'M');
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const getBadgeStyle = (status: Product['stockStatus']) => {
    switch (status) {
      case 'IN STOCK':
        return 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40';
      case 'LOW STOCK':
        return 'bg-amber-950/80 text-amber-300 border border-amber-500/40';
      case 'PRE-ORDER':
        return 'bg-[#2A1D0B]/90 text-[#E5C07B] border border-[#E5C07B]/50';
      default:
        return 'bg-white/10 text-white/80 border border-white/20';
    }
  };

  return (
    <section id="collections" className="py-20 lg:py-28 bg-[#061611] relative overflow-hidden border-t border-b border-[#E5C07B]/10">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#0E3A2F]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with ScrollReveal Fade-Up */}
        <ScrollReveal animation="fade-up" duration={850} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E5C07B] block mb-2 font-sans">
              THE CURRENT COLLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              ASCENT <span className="text-[#E5C07B] font-light font-sans">—</span>{' '}
              <span className="text-white/80 font-normal text-2xl sm:text-3xl lg:text-4xl italic">
                A study in movement, elevation and becoming.
              </span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#E5C07B]/40 flex items-center justify-center text-[#E5C07B] hover:bg-[#E5C07B] hover:text-[#0A231C] transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#E5C07B]/40 flex items-center justify-center text-[#E5C07B] hover:bg-[#E5C07B] hover:text-[#0A231C] transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>

        {/* 5 Product Cards Horizontal Lookbook with ScrollReveal Scale-Up */}
        <ScrollReveal animation="fade-scale" duration={950} threshold={0.1}>
          <div
            ref={scrollContainerRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {ascentPieces.map((product) => {
              const isJustAdded = addedId === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group shrink-0 w-[270px] sm:w-[290px] md:w-[310px] snap-start rounded-xl overflow-hidden bg-[#0A2019]/60 border border-[#E5C07B]/15 hover:border-[#E5C07B]/50 transition-all duration-300 flex flex-col cursor-pointer relative shadow-xl hover:shadow-2xl hover:shadow-[#E5C07B]/5"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#081713]">
                    {/* Stock Status Badge */}
                    <div className="absolute top-3.5 left-3.5 z-20">
                      <span
                        className={`text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-full uppercase backdrop-blur-md ${getBadgeStyle(
                          product.stockStatus
                        )}`}
                      >
                        {product.stockStatus}
                      </span>
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2019] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Quick View Button On Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-[#081713]/90 text-[#E5C07B] border border-[#E5C07B]/50 shadow-md">
                        <Eye className="w-3.5 h-3.5" /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Card Footer: Product Info & Action */}
                  <div className="p-4 sm:p-5 flex items-center justify-between gap-3 mt-auto border-t border-white/5 bg-[#081914]">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-white font-medium group-hover:text-[#E5C07B] transition-colors leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-sm font-sans font-semibold text-[#E5C07B] mt-1 tabular-nums">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Add to Cart Circular Button */}
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'border border-[#E5C07B]/40 text-[#E5C07B] hover:bg-[#E5C07B] hover:text-[#0A231C]'
                      }`}
                      title="Add to shopping bag"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      {isJustAdded ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Bottom Call To Action: EXPLORE ASCENT */}
        <ScrollReveal animation="fade-scale" delay={150} className="mt-12 text-center">
          <button
            onClick={onExploreAscent}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase bg-transparent text-[#E5C07B] border border-[#E5C07B]/50 hover:bg-[#E5C07B] hover:text-[#0A231C] transition-all duration-300 cursor-pointer shadow-sm group"
          >
            <span>EXPLORE ASCENT</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
};
