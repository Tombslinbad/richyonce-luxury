/**
 * RICHYONCE CLOTHING - FIXED LUXURY NAVIGATION BAR
 * Translucent dark glassmorphism navbar matching the reference website.
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Shield, Calendar, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenSearch: () => void;
  onOpenArchives?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
  onOpenSearch,
  onOpenArchives,
}) => {
  const { itemCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'editorial', label: 'EDITORIAL' },
    { id: 'collections', label: 'COLLECTIONS' },
    { id: 'craftsmanship', label: 'CRAFTSMANSHIP' },
    { id: 'bespoke', label: 'BESPOKE' },
    { id: 'my-richyonce', label: 'MY RICHYONCE' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#081713]/90 backdrop-blur-md border-b border-[#E5C07B]/15 shadow-2xl py-3.5'
          : 'bg-[#081713]/70 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Brand Monogram & Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center cursor-pointer text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C07B]"
            aria-label="Richyonce Clothing - Home"
          >
            <BrandLogo size="md" />
          </button>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xs uppercase font-medium tracking-[0.2em] transition-all relative py-1 cursor-pointer focus:outline-none ${
                    isActive
                      ? 'text-[#E5C07B]'
                      : 'text-white/80 hover:text-[#E5C07B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5C07B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-white/80 hover:text-[#E5C07B] transition-colors cursor-pointer rounded-full hover:bg-white/5"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium tracking-widest uppercase text-white/90 hover:text-[#E5C07B] transition-all cursor-pointer hover:bg-white/5 border border-white/10 hover:border-[#E5C07B]/40"
              aria-label={`Shopping Cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#E5C07B]" />
              <span className="tabular-nums">CART ({itemCount})</span>
            </button>

            {/* Booking Button */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded text-xs font-semibold tracking-widest uppercase bg-transparent text-[#E5C07B] border border-[#E5C07B]/60 hover:bg-[#E5C07B] hover:text-[#0A231C] transition-all duration-300 shadow-sm cursor-pointer"
            >
              <Calendar className="w-3 h-3" />
              <span>BOOKING</span>
            </button>

            {/* Archives Lookbook Button */}
            {onOpenArchives && (
              <button
                onClick={onOpenArchives}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-semibold tracking-widest uppercase bg-[#E5C07B]/10 text-[#E5C07B] border border-[#E5C07B]/30 hover:bg-[#E5C07B] hover:text-[#0A231C] transition-all cursor-pointer"
                title="18 Client Photography Archives"
              >
                <Sparkles className="w-3 h-3 text-[#E5C07B]" />
                <span>ARCHIVES</span>
              </button>
            )}

            {/* Admin Portal Toggle */}
            <button
              onClick={onOpenAdmin}
              className="hidden lg:inline-flex items-center gap-1 text-[11px] tracking-wider uppercase text-white/60 hover:text-[#E5C07B] transition-colors px-2 py-1 rounded border border-white/10 hover:border-[#E5C07B]/30"
              title="Atelier Management Portal"
            >
              <Shield className="w-3 h-3 text-[#E5C07B]" />
              <span>ATELIER</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-[#E5C07B] rounded-md focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A1713]/98 backdrop-blur-xl border-b border-[#E5C07B]/20 px-6 py-6 transition-all duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-sm uppercase tracking-[0.2em] py-2 transition-colors ${
                  activeSection === link.id
                    ? 'text-[#E5C07B] font-semibold'
                    : 'text-white/80 hover:text-[#E5C07B]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              {onOpenArchives && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenArchives();
                  }}
                  className="w-full py-2.5 px-4 rounded text-xs font-semibold tracking-widest uppercase bg-[#E5C07B]/15 text-[#E5C07B] border border-[#E5C07B]/40 text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CLIENT PHOTOGRAPHY ARCHIVES</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 rounded text-xs font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] text-center"
              >
                BOOK AN APPOINTMENT
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2 px-4 rounded text-xs font-medium tracking-widest uppercase text-[#E5C07B] border border-[#E5C07B]/40 flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>ADMIN ATELIER CONSOLE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
