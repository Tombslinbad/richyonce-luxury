/**
 * RICHYONCE CLOTHING - PRODUCT DETAIL MODAL
 * Shows full craftsmanship specs, size selector, and direct bag addition.
 */

import React, { useState } from 'react';
import { X, Check, Plus, Minus, ShoppingBag, ShieldCheck, Ruler, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { AtelierLazyImage } from './AtelierLazyImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#081813] border border-[#E5C07B]/30 rounded-2xl shadow-2xl overflow-hidden text-white my-4 sm:my-8 max-h-[92vh] sm:max-h-[90vh] flex flex-col">
        {/* Mobile Sticky Bar with prominent Back & X buttons */}
        <div className="sm:hidden flex items-center justify-between p-3.5 bg-[#06140F] border-b border-white/10 sticky top-0 z-30">
          <button
            onClick={onClose}
            aria-label="Back to previous page"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#E5C07B] active:scale-95 transition-transform"
          >
            <X className="w-4 h-4 text-[#E5C07B]" />
            <span>BACK TO COLLECTION</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details and return to previous page"
          className="hidden sm:flex absolute top-4 right-4 z-20 w-11 h-11 items-center justify-center text-white/80 hover:text-[#0A231C] rounded-full bg-black/60 hover:bg-[#E5C07B] border border-white/20 hover:border-[#E5C07B] transition-all cursor-pointer shadow-lg active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Photography with Lazy Loading & Skeleton Loader */}
            <div className="relative aspect-[3/4] md:aspect-auto bg-black/50 overflow-hidden min-h-[320px]">
              <AtelierLazyImage
                src={product.image}
                alt={product.name}
                priority="low"
                className="w-full h-full object-cover object-top"
                containerClassName="relative w-full h-full min-h-[320px] overflow-hidden bg-[#071913]"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[10px] font-semibold tracking-widest px-3 py-1 rounded-full uppercase bg-[#081713]/85 text-[#E5C07B] border border-[#E5C07B]/40 backdrop-blur-md">
                  {product.stockStatus}
                </span>
              </div>
            </div>

          {/* Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#E5C07B] uppercase block mb-1">
                {product.subtitle || 'RICHYONCE SIGNATURE ATELIER'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {product.name}
              </h2>
              <p className="font-sans text-xl font-bold text-[#E5C07B] mt-2 tabular-nums">
                ₦{product.price.toLocaleString()}
              </p>

              <div className="w-12 h-0.5 bg-[#E5C07B]/40 my-4" />

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Craftsmanship Bullet Points */}
              <div className="mt-4 space-y-1.5">
                {product.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-white/70">
                    <span className="text-[#E5C07B] mt-0.5">✦</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-white/80 uppercase tracking-wider">
                    Select Size
                  </span>
                  <span className="text-[#E5C07B] text-[11px] flex items-center gap-1">
                    <Ruler className="w-3 h-3" /> Atelier Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#E5C07B] text-[#0A231C] ring-1 ring-[#E5C07B]'
                          : 'border border-white/20 text-white/80 hover:border-white/50 bg-black/20'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/20 rounded-lg bg-black/30 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-white/70 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-xs font-bold tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount || 99, quantity + 1))}
                    className="p-1.5 text-white/70 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 rounded-lg text-xs font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E5C07B]/15"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO ATELIER BAG</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-white/50 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Authentic Richyonce Tailoring
                </span>
                <span>·</span>
                <span>White-Glove Insured Dispatch</span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
