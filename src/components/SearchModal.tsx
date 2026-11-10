/**
 * RICHYONCE CLOTHING - SEARCH & ARCHIVE DISCOVERY MODAL
 */

import React, { useState } from 'react';
import { Search, X, ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const filtered = products.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-4 pt-20">
      <div className="relative w-full max-w-3xl bg-[#081813] border border-[#E5C07B]/30 rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3 bg-[#06140F]">
          <Search className="w-5 h-5 text-[#E5C07B]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ASCENT collection, Agbadas, Senator suits, accessories..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-white/40 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="px-6 py-3 border-b border-white/5 flex gap-2 overflow-x-auto text-xs bg-[#071914]">
          {['all', 'ready-to-wear', 'traditional', 'bespoke', 'accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-[#E5C07B] text-[#0A231C]'
                  : 'bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-white/50 text-xs">
              No bespoke garments match your search inquiry.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-[#091D17] border border-white/5 hover:border-[#E5C07B]/40 flex items-center gap-4 transition-all cursor-pointer group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded-lg bg-black/40 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-[#E5C07B] tracking-wider block">
                    {item.category.replace('-', ' ')}
                  </span>
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-white group-hover:text-[#E5C07B] transition-colors truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-white/60 truncate mt-0.5">{item.description}</p>
                  <span className="font-mono text-xs font-bold text-white block mt-1 tabular-nums">
                    ₦{item.price.toLocaleString()}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#E5C07B] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
