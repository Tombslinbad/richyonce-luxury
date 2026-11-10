/**
 * RICHYONCE CLOTHING - INTERACTIVE CATEGORY MATRIX
 * Four tall editorial panels matching the reference website:
 * Ready-to-Wear, Traditional, Custom / Bespoke, and Accessories.
 *
 * Upgraded with ScrollTrigger-style IntersectionObserver animations:
 * - Staggered fade and subtle scale-up reveals (0.94 -> 1.0)
 * - Hover elevation and gold-sheen transitions
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_ASSETS } from '../config/brandAssets';
import { ProductCategory } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CategoryMatrixProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onOpenBespoke: () => void;
}

interface CategoryItem {
  id: ProductCategory;
  title: string;
  tagline: string;
  image: string;
  isBespokeAction?: boolean;
}

interface CategoryCardProps {
  item: CategoryItem;
  index: number;
  onClick: (item: CategoryItem) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ item, index, onClick }) => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({
    threshold: 0.12,
    delay: index * 110,
    animationClass: 'animate-fadeIn',
  });

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isRevealed ? 'animate-fadeIn' : ''} h-[420px] sm:h-[480px] lg:h-[540px]`}
    >
      <div
        onClick={() => onClick(item)}
        className="group relative w-full h-full rounded-xl overflow-hidden border border-[#E5C07B]/20 hover:border-[#E5C07B]/70 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-end p-6"
      >
        {/* Background Photography with Zoom Effect */}
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
        />

        {/* Multi-stage Scrim Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061611] via-[#061611]/50 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />
        <div className="absolute inset-0 bg-[#E5C07B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col">
          <span className="text-[11px] font-sans font-semibold tracking-[0.25em] text-[#E5C07B] uppercase block mb-1">
            ATELIER ARCHIVE
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-[#E5C07B] transition-colors">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 font-light mt-1 mb-4">
            {item.tagline}
          </p>

          {/* Circular Gold Arrow Indicator */}
          <div className="w-10 h-10 rounded-full border border-[#E5C07B]/50 flex items-center justify-center text-[#E5C07B] group-hover:bg-[#E5C07B] group-hover:text-[#0A231C] transition-all duration-300 self-start shadow-md">
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategoryMatrix: React.FC<CategoryMatrixProps> = ({
  onSelectCategory,
  onOpenBespoke,
}) => {
  const sectionReveal = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const headerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15, delay: 0 });

  const categories: CategoryItem[] = [
    {
      id: 'ready-to-wear',
      title: 'READY-TO-WEAR',
      tagline: 'Modern cuts. Timeless style.',
      image: BRAND_ASSETS.categoryReadyToWear,
    },
    {
      id: 'traditional',
      title: 'TRADITIONAL',
      tagline: 'Heritage. Reimagined.',
      image: BRAND_ASSETS.categoryTraditional,
    },
    {
      id: 'bespoke',
      title: 'CUSTOM / BESPOKE',
      tagline: 'Your vision. Our craft.',
      image: BRAND_ASSETS.categoryBespoke,
      isBespokeAction: true,
    },
    {
      id: 'accessories',
      title: 'ACCESSORIES',
      tagline: 'Details make the difference.',
      image: BRAND_ASSETS.categoryAccessories,
    },
  ];

  const handleClick = (item: CategoryItem) => {
    if (item.isBespokeAction) {
      onOpenBespoke();
    } else {
      onSelectCategory(item.id);
    }
  };

  return (
    <section
      ref={sectionReveal.ref}
      className={`scroll-reveal ${sectionReveal.isRevealed ? 'animate-fadeIn' : ''} py-20 lg:py-28 bg-[#071813] relative overflow-hidden border-b border-[#E5C07B]/15`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with useScrollReveal hook and scroll-reveal class */}
        <div
          ref={headerReveal.ref}
          className={`scroll-reveal ${headerReveal.isRevealed ? 'animate-fadeIn' : ''} mb-12`}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E5C07B] block mb-2 font-sans">
            SHOP BY CATEGORY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Find Your Expression
          </h2>
        </div>

        {/* 4-Column Editorial Matrix with each component using useScrollReveal and scroll-reveal class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item, idx) => (
            <CategoryCard
              key={item.id}
              item={item}
              index={idx}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
