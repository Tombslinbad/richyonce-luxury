/**
 * RICHYONCE CLOTHING - SIGNATURE LUXURY FOOTER
 * Faithfully matches the reference website with brand crest, quick links,
 * Nigerian atelier headquarters contact, and social presence.
 */

import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, Instagram, Facebook, Youtube } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05110D] text-white border-t border-[#E5C07B]/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand Emblem & Motto (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <BrandLogo size="lg" showTagline={true} />
            <p className="text-xs text-white/60 font-light leading-relaxed max-w-sm mt-3">
              Contemporary African Luxury, Tailored With Intention. Handcrafted menswear engineered for sovereign presence, cultural grandeur, and timeless distinction.
            </p>
            <div className="pt-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#E5C07B] font-semibold block">
                MAIN ATELIER & HEADQUARTERS
              </span>
              <span className="text-xs text-white/70">Abakaliki · Lagos · London</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2-3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-semibold tracking-[0.25em] text-[#E5C07B]">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#E5C07B] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#E5C07B] transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bespoke')}
                  className="hover:text-[#E5C07B] transition-colors cursor-pointer"
                >
                  Bespoke
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-richyonce')}
                  className="hover:text-[#E5C07B] transition-colors cursor-pointer"
                >
                  My Richyonce
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-white/40 hover:text-[#E5C07B] transition-colors cursor-pointer flex items-center gap-1 mt-2"
                >
                  <span>Atelier Admin Console</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-semibold tracking-[0.25em] text-[#E5C07B]">
              CONTACT
            </h4>
            <ul className="space-y-3 text-xs text-white/80">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E5C07B] shrink-0" />
                <a href="tel:+2348012345678" className="hover:text-[#E5C07B] transition-colors font-mono">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E5C07B] shrink-0" />
                <a href="mailto:hello@richyonce.com" className="hover:text-[#E5C07B] transition-colors">
                  hello@richyonce.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5C07B] shrink-0 mt-0.5" />
                <span>Abakaliki, Ebonyi State, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow Us (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-semibold tracking-[0.25em] text-[#E5C07B]">
              FOLLOW US
            </h4>
            <div className="flex items-center gap-3 text-white/70">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E5C07B] hover:text-[#E5C07B] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#tiktok"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E5C07B] hover:text-[#E5C07B] transition-colors text-xs font-bold"
                aria-label="TikTok"
              >
                ♪
              </a>
              <a
                href="#x"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E5C07B] hover:text-[#E5C07B] transition-colors text-xs font-bold"
                aria-label="X (Twitter)"
              >
                𝕏
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E5C07B] hover:text-[#E5C07B] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E5C07B] hover:text-[#E5C07B] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-white/50 pt-1">
              Join #RichyonceMen for private salon showings and seasonal drops.
            </p>
          </div>
        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2025 Richyonce Clothing. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/20">|</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <button
              onClick={scrollToTop}
              className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E5C07B] hover:text-[#0A231C] transition-colors ml-4 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
