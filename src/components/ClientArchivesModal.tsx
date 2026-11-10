/**
 * RICHYONCE CLOTHING - CLIENT PHOTOGRAPHY ARCHIVES & LOOKBOOK CONTACT SHEET
 * Interactive full-resolution inspection modal for all 18 authentic client photographs.
 * Grouped by outfit type, garment craftsmanship notes, and intended atelier section.
 */

import React, { useState } from 'react';
import { X, Search, Check, ShieldCheck, Tag, Sparkles, ExternalLink, Filter } from 'lucide-react';
import { CLIENT_PHOTOGRAPHY_CATALOG, ClientPhotoRecord } from '../config/brandAssets';

interface ClientArchivesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhotoForBespoke?: (photo: ClientPhotoRecord) => void;
}

export const ClientArchivesModal: React.FC<ClientArchivesModalProps> = ({
  isOpen,
  onClose,
  onSelectPhotoForBespoke,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<ClientPhotoRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All 18 Client Archives' },
    { id: 'traditional', label: 'Traditional Nuptial & Regalia' },
    { id: 'collections', label: 'Lion Crest & Isiagu' },
    { id: 'editorial', label: 'Automotive & Throne Editorial' },
    { id: 'bespoke', label: 'Bespoke Tailoring' },
    { id: 'details', label: 'Craftsmanship & Drapery' },
  ];

  const filteredPhotos = CLIENT_PHOTOGRAPHY_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.garmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceFilename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-6xl bg-[#081813] border border-[#E5C07B]/40 rounded-2xl shadow-2xl overflow-hidden text-white my-4 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#06140F]">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-wide">
                CLIENT PHOTOGRAPHY ARCHIVES & CONTACT SHEET
              </h2>
            </div>
            <p className="text-xs text-white/60 mt-0.5">
              Authentic completed garments from the client’s supplied albums. 100% verified physical creations.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close client archives and return to previous page"
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white/80 hover:text-[#0A231C] rounded-full bg-white/10 hover:bg-[#E5C07B] border border-white/20 hover:border-[#E5C07B] transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 sm:p-5 border-b border-white/5 bg-[#071914] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#E5C07B] text-[#0A231C]'
                    : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garments, fabrics..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E5C07B]"
            />
          </div>
        </div>

        {/* Contact Sheet Grid & Detailed View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {selectedRecord ? (
            /* Full Detailed Photo Inspection */
            <div className="p-6 rounded-2xl bg-[#091D17] border border-[#E5C07B]/40 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#E5C07B] uppercase tracking-widest">
                    SOURCE FILE: {selectedRecord.sourceFilename}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                    {selectedRecord.title}
                  </h3>
                  <span className="text-xs text-[#E5C07B] font-semibold block">
                    {selectedRecord.garmentType}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-3.5 py-1.5 rounded border border-white/20 text-xs text-white/80 hover:text-white"
                >
                  Back to Contact Sheet
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 rounded-xl overflow-hidden border border-white/10 bg-black max-h-[600px] flex items-center justify-center">
                  <img
                    src={selectedRecord.localPath}
                    alt={selectedRecord.title}
                    className="max-h-[580px] w-auto object-contain mx-auto"
                  />
                </div>

                <div className="lg:col-span-5 space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <span className="text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block">
                      GARMENT SPECIFICATIONS
                    </span>
                    <p className="text-white/80 leading-relaxed">
                      {selectedRecord.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <span className="text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block">
                      VERIFIED CRAFTSMANSHIP NOTES
                    </span>
                    <p className="text-white/75 font-mono text-[11px] leading-relaxed">
                      {selectedRecord.craftsmanshipNotes}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1">
                    <span className="text-[10px] text-white/40 uppercase font-mono block">MAPPING SLOT</span>
                    <span className="font-semibold text-white">{selectedRecord.localPath}</span>
                    <span className="text-[10px] text-emerald-400 block">✓ Resolving Local Asset</span>
                  </div>

                  {onSelectPhotoForBespoke && (
                    <button
                      onClick={() => {
                        onSelectPhotoForBespoke(selectedRecord);
                        onClose();
                      }}
                      className="w-full py-3 rounded-lg bg-[#E5C07B] text-[#0A231C] font-semibold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                    >
                      COMMISSION THIS EXACT BESPOKE DESIGN
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* 18-Card Contact Sheet Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedRecord(photo)}
                  className="group rounded-xl overflow-hidden bg-[#091D17] border border-white/10 hover:border-[#E5C07B]/60 transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#E5C07B]/10"
                >
                  <div className="relative aspect-[3/4] bg-black/40 overflow-hidden">
                    <img
                      src={photo.localPath}
                      alt={photo.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-black/70 text-[#E5C07B] border border-white/10 backdrop-blur-md">
                        #{idx + 1} · {photo.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-[#081813]/90 text-[#E5C07B] border border-[#E5C07B]/40 text-[11px] font-semibold uppercase tracking-wider">
                        Inspect Piece
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2 border-t border-white/5 bg-[#071914]">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#E5C07B] transition-colors truncate">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-[#E5C07B] truncate mt-0.5">
                        {photo.garmentType}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/50 font-mono">
                      <span className="truncate max-w-[130px]">{photo.sourceFilename}</span>
                      <span className="text-[#E5C07B]">View Details →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
