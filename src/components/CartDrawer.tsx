/**
 * RICHYONCE CLOTHING - LUXURY SLIDE-OVER SHOPPING BAG
 * Features item persistence, quantity management, and sleek drawer animation.
 */

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreCollection: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onExploreCollection,
}) => {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    itemCount,
    subtotal,
    shippingFee,
    total,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#081813] border-l border-[#E5C07B]/20 text-white flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E5C07B]" />
              <h2 className="font-serif text-xl font-bold tracking-wide">
                YOUR ATELIER BAG ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Your bag is empty</h3>
                  <p className="text-xs text-white/60 mt-1 max-w-xs">
                    Discover our ASCENT collection and bespoke creations tailored for men of distinction.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    onExploreCollection();
                  }}
                  className="px-6 py-2.5 rounded text-xs font-semibold tracking-wider uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-colors"
                >
                  DISCOVER ASCENT
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#0B2019]/70 border border-white/5 flex gap-4 items-center group"
                >
                  {/* Item Image */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-black/40 border border-white/10">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-semibold text-white truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#E5C07B] block mt-0.5">
                      Size: {item.size}
                    </span>
                    <span className="text-xs font-semibold text-white block mt-1 tabular-nums">
                      ₦{item.product.price.toLocaleString()}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-white/20 rounded bg-black/30">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-white/70 hover:text-white transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-white/70 hover:text-white transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/40 hover:text-red-400 p-1 transition-colors ml-auto cursor-pointer"
                        title="Remove piece"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#06140F] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Atelier White-Glove Shipping</span>
                  <span className="font-mono text-[#E5C07B]">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : `₦${shippingFee.toLocaleString()}`}
                  </span>
                </div>
                {shippingFee === 0 && (
                  <p className="text-[10px] text-emerald-400">
                    ✓ Complimentary insured shipping applied (Orders over ₦150,000)
                  </p>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Due</span>
                  <span className="font-serif text-lg text-[#E5C07B] tabular-nums">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  closeCart();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E5C07B]/15"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[10px] text-white/40 uppercase tracking-wider">
                Secured by Paystack & Atelier Guarantee
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
