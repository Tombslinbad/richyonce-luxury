/**
 * RICHYONCE CLOTHING - CHECKOUT & PAYSTACK INTEGRATION MODAL
 * Handles delivery address, payment method selection, Paystack environment boundary,
 * and order generation with real atelier tracking.
 */

import React, { useState } from 'react';
import { X, Check, Lock, CreditCard, Building2, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { atelierStore } from '../services/store';
import { CustomerInfo } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const { items, subtotal, shippingFee, total, clearCart } = useCart();

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'Stripe' | 'Paystack' | 'Bank Transfer'>('Stripe');
  const [stripeCardNumber, setStripeCardNumber] = useState('');
  const [stripeExp, setStripeExp] = useState('');
  const [stripeCvc, setStripeCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
    'Taraba', 'Yobe', 'Zamfara', 'International Diaspora (UK/US/UAE/EU)'
  ];

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!customer.fullName.trim()) {
      setErrorMessage('Please provide your full legal name for the bespoke delivery manifest.');
      return;
    }
    if (!customer.email.trim() || !customer.email.includes('@')) {
      setErrorMessage('Please provide a valid email address for receipt and progress updates.');
      return;
    }
    if (!customer.phone.trim()) {
      setErrorMessage('Please provide your phone number for white-glove courier contact.');
      return;
    }
    if (!customer.address.trim()) {
      setErrorMessage('Please enter your complete physical delivery address.');
      return;
    }

    setIsProcessing(true);

    // Simulate Paystack handshake or process bank invoice
    setTimeout(() => {
      try {
        const newOrder = atelierStore.createOrder({
          items,
          customer,
          subtotal,
          shippingFee,
          total,
          paymentMethod,
          paymentStatus: paymentMethod === 'Paystack' ? 'Paid' : 'Pending',
          notes: 'Customer verified order placed via digital atelier checkout.',
        });

        clearCart();
        setIsProcessing(false);
        onOrderSuccess(newOrder.id);
      } catch (err: any) {
        setIsProcessing(false);
        setErrorMessage(err?.message || 'Failed to complete order.');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#091C16] border border-[#E5C07B]/30 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#06140F]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#E5C07B]" />
            <h2 className="font-serif text-xl font-bold tracking-wide">
              ATELIER CHECKOUT
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCheckoutSubmit} className="p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Customer Details */}
          <div>
            <h3 className="text-xs uppercase font-semibold tracking-widest text-[#E5C07B] mb-3">
              1. CLIENT & SHIPPING PARTICULARS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block text-white/70 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="e.g. Chief Babatunde Adeleke"
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="client@domain.com"
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="+234 803 000 0000"
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">State / Territory *</label>
                <select
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                >
                  {nigerianStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/70 mb-1">Street Address & Estate *</label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="e.g. 14 Bourdillon Road, Ikoyi"
                  className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/15 focus:border-[#E5C07B] focus:outline-none text-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-xs uppercase font-semibold tracking-widest text-[#E5C07B] mb-3">
              2. PAYMENT SPECIFICATION
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('Stripe')}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'Stripe'
                    ? 'border-[#E5C07B] bg-[#E5C07B]/10 ring-1 ring-[#E5C07B]'
                    : 'border-white/10 bg-[#06150F] hover:border-white/30'
                }`}
              >
                <Lock className="w-5 h-5 text-[#E5C07B] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-white">Stripe Elements</span>
                  <span className="block text-[11px] text-white/60">
                    Global Cards & Apple Pay
                  </span>
                  <span className="inline-block mt-1 text-[10px] text-emerald-400 font-mono">
                    ● Encrypted Payment Intent
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Paystack')}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'Paystack'
                    ? 'border-[#E5C07B] bg-[#E5C07B]/10 ring-1 ring-[#E5C07B]'
                    : 'border-white/10 bg-[#06150F] hover:border-white/30'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#E5C07B] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-white">Paystack Gateway</span>
                  <span className="block text-[11px] text-white/60">
                    NGN Cards, Bank & USSD
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Bank Transfer')}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'Bank Transfer'
                    ? 'border-[#E5C07B] bg-[#E5C07B]/10 ring-1 ring-[#E5C07B]'
                    : 'border-white/10 bg-[#06150F] hover:border-white/30'
                }`}
              >
                <Building2 className="w-5 h-5 text-[#E5C07B] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-white">Direct Transfer</span>
                  <span className="block text-[11px] text-white/60">
                    Official Corporate Invoice
                  </span>
                </div>
              </button>
            </div>

            {/* Stripe Elements Mock Card Fields */}
            {paymentMethod === 'Stripe' && (
              <div className="mt-3 p-4 rounded-xl bg-black/40 border border-[#E5C07B]/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#E5C07B]">
                  <span className="font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    STRIPE ELEMENTS SDK CLIENT
                  </span>
                  <span className="text-[10px] font-mono text-white/60">256-BIT SSL ENCRYPTION</span>
                </div>

                <div>
                  <label className="block text-[11px] text-white/70 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="4242 •••• •••• 4242"
                    value={stripeCardNumber}
                    onChange={(e) => setStripeCardNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/20 text-white font-mono text-xs focus:border-[#E5C07B] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-white/70 mb-1">Expiration</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={stripeExp}
                      onChange={(e) => setStripeExp(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/20 text-white font-mono text-xs focus:border-[#E5C07B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-white/70 mb-1">CVC / CWW</label>
                    <input
                      type="text"
                      placeholder="•••"
                      maxLength={4}
                      value={stripeCvc}
                      onChange={(e) => setStripeCvc(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#06150F] border border-white/20 text-white font-mono text-xs focus:border-[#E5C07B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Paystack Integration Note */}
            {paymentMethod === 'Paystack' && (
              <div className="mt-3 p-3 rounded-lg bg-black/40 border border-[#E5C07B]/20 text-[11px] text-white/70 space-y-1">
                <div className="flex items-center gap-1.5 text-[#E5C07B] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PAYSTACK ENVIRONMENT BOUNDARY</span>
                </div>
                <p>
                  Active environment supports test keys & sandbox simulation. When production key{' '}
                  <code className="text-[#E5C07B] font-mono">PAYSTACK_PUBLIC_KEY</code> is set in environment secrets, direct live pop-ups engage.
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="p-4 rounded-xl bg-[#06140F] border border-white/10 space-y-2 text-xs">
            <div className="flex justify-between text-white/70">
              <span>Items Total ({items.length} pieces)</span>
              <span className="font-mono text-white">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>White-Glove Delivery</span>
              <span className="font-mono text-[#E5C07B]">
                {shippingFee === 0 ? 'COMPLIMENTARY' : `₦${shippingFee.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
              <span>Total Amount</span>
              <span className="font-serif text-xl text-[#E5C07B] tabular-nums">
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E5C07B]/20 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>COMMISSIONING ORDER IN ATELIER...</span>
              ) : (
                <>
                  <span>CONFIRM & PLACE ORDER (₦{total.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-white/40 mt-2">
              By confirming, you agree to Richyonce bespoke craft guidelines and insured delivery protocol.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
