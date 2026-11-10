/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EditorialGallery } from './components/EditorialGallery';
import { AscentCollection } from './components/AscentCollection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { TraditionReimagined } from './components/TraditionReimagined';
import { CategoryMatrix } from './components/CategoryMatrix';
import { BespokeWizard } from './components/BespokeWizard';
import { BrandStatement } from './components/BrandStatement';
import { OrderTracker } from './components/OrderTracker';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AppointmentModal } from './components/AppointmentModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SearchModal } from './components/SearchModal';
import { ClientArchivesModal } from './components/ClientArchivesModal';
import { atelierStore } from './services/store';
import { Product, ProductCategory } from './types';
import { ClientPhotoRecord } from './config/brandAssets';

export function MainStorefront() {
  const [activeSection, setActiveSection] = useState('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals & Drawers
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isArchivesOpen, setIsArchivesOpen] = useState(false);

  // Order Tracker active query
  const [trackerQuery, setTrackerQuery] = useState('RY-9042');

  // Load and subscribe to store products
  useEffect(() => {
    setProducts(atelierStore.getProducts());
    const unsubscribe = atelierStore.subscribe(() => {
      setProducts(atelierStore.getProducts());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'editorial', 'collections', 'craftsmanship', 'bespoke', 'my-richyonce'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackReference = (reference: string) => {
    setTrackerQuery(reference);
    scrollToSection('my-richyonce');
  };

  const handleCategorySelect = (category: ProductCategory | 'all') => {
    setIsSearchOpen(true);
  };

  const handleOrderSuccess = (orderId: string) => {
    setIsCheckoutOpen(false);
    setTrackerQuery(orderId);
    scrollToSection('my-richyonce');
  };

  const handleSelectPhotoForBespoke = (photo: ClientPhotoRecord) => {
    scrollToSection('bespoke');
  };

  return (
    <div className="min-h-screen bg-[#06140F] text-[#FAFAFA] flex flex-col selection:bg-[#E5C07B]/30 selection:text-[#FAFAFA]">
      {/* Fixed Luxury Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenArchives={() => setIsArchivesOpen(true)}
      />

      {/* Main Narrative Scroll Experience */}
      <main className="flex-1">
        {/* EXPERIENCE A: The Opening — Enter the World of Richyonce */}
        <HeroSection
          onShopCollection={() => scrollToSection('collections')}
          onCreateYourLook={() => scrollToSection('bespoke')}
          onBookAppointment={() => setIsBookingOpen(true)}
          onOpenArchives={() => setIsArchivesOpen(true)}
        />

        {/* EXPERIENCE B: The Editorial Image Reveal */}
        <EditorialGallery
          onOpenArchives={() => setIsArchivesOpen(true)}
          onExploreGarment={(title) => {
            const match = products.find(
              (p) =>
                p.name.toLowerCase().includes(title.toLowerCase()) ||
                title.toLowerCase().includes(p.name.toLowerCase())
            );
            if (match) {
              setSelectedProduct(match);
            }
          }}
        />

        {/* EXPERIENCE C: ASCENT — The Collection in Motion */}
        <AscentCollection
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onExploreAscent={() => setIsSearchOpen(true)}
        />

        {/* EXPERIENCE D: Craftsmanship — The Details That Matter */}
        <div id="craftsmanship">
          <CraftsmanshipSection
            onExploreBespoke={() => scrollToSection('bespoke')}
          />
        </div>

        {/* EXPERIENCE E: Tradition Reimagined */}
        <div id="tradition">
          <TraditionReimagined
            onBespokeWedding={() => scrollToSection('bespoke')}
            onExploreCollection={() => scrollToSection('collections')}
          />
        </div>

        {/* Category Matrix: Find Your Expression */}
        <CategoryMatrix
          onSelectCategory={handleCategorySelect}
          onOpenBespoke={() => scrollToSection('bespoke')}
        />

        {/* EXPERIENCE F: The Bespoke Atelier (CREATE YOUR LOOK) */}
        <BespokeWizard onTrackReference={handleTrackReference} />

        {/* EXPERIENCE G: The Final Brand Statement (WEAR YOUR PRESENCE) */}
        <BrandStatement
          onExploreCollection={() => scrollToSection('collections')}
          onCreateBespoke={() => scrollToSection('bespoke')}
        />

        {/* MY RICHYONCE: 11-Stage Interactive Order Tracker */}
        <OrderTracker initialSearchQuery={trackerQuery} />
      </main>

      {/* Brand Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Slide-Over Shopping Bag */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreCollection={() => scrollToSection('collections')}
      />

      {/* Checkout & Payment Handshake Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Atelier Consultation / Fitting Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Product Quick-View & Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Protected Master Tailor Admin Console */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSelectOrderToTrack={(orderId) => {
          setTrackerQuery(orderId);
          scrollToSection('my-richyonce');
        }}
      />

      {/* Search & Atelier Archive Discovery Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Full 18-Photo Client Archives & Contact Sheet Modal */}
      <ClientArchivesModal
        isOpen={isArchivesOpen}
        onClose={() => setIsArchivesOpen(false)}
        onSelectPhotoForBespoke={handleSelectPhotoForBespoke}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainStorefront />
    </CartProvider>
  );
}
