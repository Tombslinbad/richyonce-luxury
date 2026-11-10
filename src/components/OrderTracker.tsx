/**
 * RICHYONCE CLOTHING - MY RICHYONCE CUSTOMER ATELIER & ORDER TRACKER
 * Features the 11-stage timeline matching the reference screenshot #RY-9042.
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  Check,
  ChevronRight,
  Package,
  Calendar,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { atelierStore } from '../services/store';
import { Order, BespokeRequest, ORDER_STAGES } from '../types';

interface OrderTrackerProps {
  initialSearchQuery?: string;
  onSelectProductForDetails?: (id: string) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  initialSearchQuery = '',
}) => {
  const [query, setQuery] = useState('RY-9042');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [activeBespoke, setActiveBespoke] = useState<BespokeRequest | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showFullDetails, setShowFullDetails] = useState(false);

  // Load default demo order or query on mount
  useEffect(() => {
    const targetQuery = initialSearchQuery || 'RY-9042';
    setQuery(targetQuery);
    executeSearch(targetQuery);
  }, [initialSearchQuery]);

  const executeSearch = (searchVal: string) => {
    setSearchError(null);
    if (!searchVal.trim()) {
      setSearchError('Please enter a valid Order ID or Bespoke reference.');
      return;
    }

    const order = atelierStore.getOrderByIdOrRef(searchVal);
    if (order) {
      setActiveOrder(order);
      setActiveBespoke(null);
      return;
    }

    const bespoke = atelierStore.getBespokeRequestById(searchVal);
    if (bespoke) {
      setActiveBespoke(bespoke);
      setActiveOrder(null);
      return;
    }

    // Not found
    setActiveOrder(null);
    setActiveBespoke(null);
    setSearchError(
      `No atelier commission found for "${searchVal}". Please verify your reference or test with demo reference RY-9042.`
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  // Determine current timeline data
  const currentRefId = activeOrder?.id || activeBespoke?.id;
  const currentStageIndex = activeOrder ? activeOrder.currentStageIndex : activeBespoke ? activeBespoke.currentStageIndex : 0;
  const stageHistory = activeOrder?.stageHistory || activeBespoke?.stageHistory || [];

  return (
    <section id="my-richyonce" className="py-20 lg:py-28 bg-[#071813] relative overflow-hidden border-b border-[#E5C07B]/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] bg-[#0E3A2F]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header matching reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E5C07B] block mb-2 font-sans">
              MY RICHYONCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Track Your Order
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light mt-1">
              Enter your Order ID to view the latest status of your order.
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="font-serif italic text-white/80 text-sm lg:text-base block">
              "Luxury isn't just what you wear,
            </span>
            <span className="font-serif italic text-[#E5C07B] text-sm lg:text-base">
              it's how it arrives."
            </span>
          </div>
        </div>

        {/* Search Bar matching screenshot */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative max-w-4xl flex flex-col sm:flex-row items-stretch gap-3 mb-12"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
              <Package className="w-5 h-5 text-[#E5C07B]/80" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your Order ID (e.g. RY-9042)"
              className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-[#0A2019]/80 border border-[#E5C07B]/30 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#E5C07B] focus:ring-1 focus:ring-[#E5C07B] backdrop-blur-md"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-colors cursor-pointer shrink-0 shadow-lg shadow-[#E5C07B]/10"
          >
            <span>TRACK ORDER</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        {/* Search Error State */}
        {searchError && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs sm:text-sm flex items-center gap-3 mb-8 max-w-4xl">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <div className="flex-1">
              <span>{searchError}</span>
              <button
                type="button"
                onClick={() => {
                  setQuery('RY-9042');
                  executeSearch('RY-9042');
                }}
                className="ml-3 underline text-[#E5C07B] hover:text-white"
              >
                Load demo RY-9042
              </button>
            </div>
          </div>
        )}

        {/* Tracking Card: 11-Stage Interactive Timeline */}
        {(activeOrder || activeBespoke) && (
          <div className="rounded-2xl bg-[#091F18]/70 border border-[#E5C07B]/25 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            {/* Top Bar of Card: Order ID & Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E5C07B] font-semibold block">
                  COMMISSION IDENTIFIER
                </span>
                <div className="flex items-center gap-3 mt-0.5">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    Order ID #{currentRefId}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E5C07B]/15 text-[#E5C07B] border border-[#E5C07B]/30">
                    <ShieldCheck className="w-3 h-3" /> Verified Atelier Record
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFullDetails(!showFullDetails)}
                  className="text-xs font-semibold tracking-wider uppercase text-[#E5C07B] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{showFullDetails ? 'Hide details' : 'View details'}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${showFullDetails ? 'rotate-90' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* 11-STAGE HORIZONTAL PROGRESS TIMELINE (Responsive Scrollable on Mobile) */}
            <div className="relative overflow-x-auto pb-4 scrollbar-none">
              <div className="min-w-[950px] relative py-4 px-2">
                {/* Background Connecting Line */}
                <div className="absolute top-9 left-6 right-6 h-0.5 bg-white/15 -z-0" />

                {/* Active Filled Progress Line */}
                <div
                  className="absolute top-9 left-6 h-0.5 bg-[#E5C07B] -z-0 transition-all duration-700"
                  style={{
                    width: `${(currentStageIndex / (ORDER_STAGES.length - 1)) * 100}%`,
                  }}
                />

                {/* 11 Nodes */}
                <div className="flex justify-between items-start relative z-10">
                  {ORDER_STAGES.map((stageName, idx) => {
                    const isCompleted = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;
                    const historyItem = stageHistory[idx];

                    return (
                      <div
                        key={stageName}
                        className="flex flex-col items-center text-center w-20 px-0.5"
                      >
                        {/* Node Circle */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isCompleted
                              ? 'bg-[#E5C07B] text-[#0A231C] shadow-lg shadow-[#E5C07B]/20 ring-2 ring-[#0A231C]'
                              : 'bg-[#0A2019] border-2 border-white/20 text-white/30'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-5 h-5 stroke-[2.5]" />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          )}
                        </div>

                        {/* Stage Name */}
                        <span
                          className={`text-[10px] font-semibold tracking-wider uppercase mt-3 leading-tight block ${
                            isCurrent
                              ? 'text-[#E5C07B] font-bold'
                              : isCompleted
                              ? 'text-white'
                              : 'text-white/40'
                          }`}
                        >
                          {stageName}
                        </span>

                        {/* Stage Date (if completed) */}
                        {historyItem && historyItem.date !== 'Pending' ? (
                          <span className="text-[9px] text-[#E5C07B]/80 font-mono mt-1">
                            {historyItem.date}
                          </span>
                        ) : (
                          <span className="text-[9px] text-white/30 font-mono mt-1">
                            Pending
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Current Active Stage Highlight Banner */}
            <div className="mt-8 p-4 rounded-xl bg-[#081713]/80 border border-[#E5C07B]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5C07B] animate-pulse" />
                <span className="text-white/90">
                  <strong className="text-[#E5C07B] uppercase tracking-wider">
                    CURRENT STATUS:
                  </strong>{' '}
                  {ORDER_STAGES[currentStageIndex]} —{' '}
                  {stageHistory[currentStageIndex]?.notes ||
                    'Master craftspeople actively advancing production in our atelier.'}
                </span>
              </div>
              <span className="text-white/50 text-[11px] font-mono shrink-0">
                Targeted Completion: {activeOrder?.estimatedCompletion || 'Within 14 Business Days'}
              </span>
            </div>

            {/* Expanded Detailed Dossier */}
            {showFullDetails && (
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                {/* Commission Summary */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-semibold block">
                    PIECE SPECIFICATIONS
                  </span>
                  {activeOrder ? (
                    <div>
                      {activeOrder.items.map((item) => (
                        <div key={item.id} className="text-xs text-white/90">
                          <p className="font-semibold text-sm">{item.product.name}</p>
                          <p className="text-white/70">
                            Variant: {item.size} · Qty: {item.quantity}
                          </p>
                          <p className="text-[#E5C07B] font-mono mt-1">
                            ₦{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : activeBespoke ? (
                    <div className="text-xs text-white/90 space-y-1">
                      <p className="font-semibold text-sm">
                        {activeBespoke.garment} ({activeBespoke.occasion})
                      </p>
                      <p className="text-white/70">Fabric: {activeBespoke.fabric}</p>
                      <p className="text-white/70">
                        Customizations: {activeBespoke.customizations.join(', ')}
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* Delivery & Logistics */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-semibold block">
                    DESTINATION & CONCIERGE
                  </span>
                  <div className="text-xs text-white/80">
                    <p className="font-semibold text-white">
                      {activeOrder ? activeOrder.customer.fullName : activeBespoke?.customerName}
                    </p>
                    <p className="text-white/60">
                      {activeOrder
                        ? `${activeOrder.customer.city}, ${activeOrder.customer.state}, ${activeOrder.customer.country}`
                        : activeBespoke?.fittingDetails?.locationPreference || 'Private Fitting'}
                    </p>
                    <p className="text-[#E5C07B] mt-1">
                      Method:{' '}
                      {activeOrder?.paymentMethod || 'Atelier Bespoke Protocol'}
                    </p>
                  </div>
                </div>

                {/* Tailoring Notes */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-semibold block">
                    ATELIER NOTES
                  </span>
                  <p className="text-xs text-white/70 italic bg-black/20 p-3 rounded-lg border border-white/5">
                    {activeOrder?.notes || activeBespoke?.notes || 'No special modifications specified.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
