/**
 * RICHYONCE CLOTHING - CART CONTEXT & STATE HOOK
 * Manages cart state, persistence in localStorage, quantity restrictions,
 * and drawer visibility.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('ry_cart_items');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ry_cart_items', JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: Product, size?: string, quantity: number = 1) => {
    const selectedSize = size || (product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    const itemId = `${product.id}-${selectedSize}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        // Enforce stock count limit if defined
        const nextQty = Math.min(existing.quantity + quantity, product.stockCount || 99);
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: nextQty } : i));
      } else {
        const initialQty = Math.min(quantity, product.stockCount || 99);
        return [...prev, { id: itemId, product, size: selectedSize, quantity: initialQty }];
      }
    });

    setIsOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const maxAllowed = item.product.stockCount || 99;
            return { ...item, quantity: Math.min(newQty, maxAllowed) };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  // Free delivery within Nigeria for luxury purchases over ₦150,000, else ₦5,000 flat
  const shippingFee = subtotal > 150000 || subtotal === 0 ? 0 : 5000;
  const total = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
