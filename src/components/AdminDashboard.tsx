/**
 * RICHYONCE CLOTHING - ADMINISTRATIVE ATELIER CONSOLE
 * Comprehensive portal for managing orders, advancing 11 production stages,
 * reviewing bespoke measurements, scheduling appointments, and editing product inventory.
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Package,
  Scissors,
  Calendar,
  DollarSign,
  Search,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Plus,
  Edit2,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { atelierStore } from '../services/store';
import { Order, BespokeRequest, Appointment, Product, ORDER_STAGES } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrderToTrack?: (orderId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onSelectOrderToTrack,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'orders' | 'bespoke' | 'appointments' | 'products' | 'cms' | 'stripe'>('orders');
  // CMS Content State
  const [cmsHeroTitle, setCmsHeroTitle] = useState('Sovereignty in 3D Motion');
  const [cmsHeroSubtext, setCmsHeroSubtext] = useState('Experience timeless African luxury, ceremonial regalia, and architectural tailoring.');
  const [brandAssets, setBrandAssets] = useState<Record<string, string>>(() => atelierStore.getBrandAssets());
  const [editingAssetKey, setEditingAssetKey] = useState<string | null>(null);
  const [newAssetUrl, setNewAssetUrl] = useState('');
  const [cmsSaved, setCmsSaved] = useState(false);

  // Store data
  const [orders, setOrders] = useState<Order[]>([]);
  const [bespokeRequests, setBespokeRequests] = useState<BespokeRequest[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Order for stage update
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [stageNote, setStageNote] = useState('');

  // New Product Modal
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('110000');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('ready-to-wear');
  const [newProdStock, setNewProdStock] = useState('10');

  useEffect(() => {
    const refreshData = () => {
      setOrders(atelierStore.getOrders());
      setBespokeRequests(atelierStore.getBespokeRequests());
      setAppointments(atelierStore.getAppointments());
      setProducts(atelierStore.getProducts());
      setBrandAssets(atelierStore.getBrandAssets());
    };

    refreshData();
    const unsubscribe = atelierStore.subscribe(refreshData);
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default atelier passcode or quick access
    if (passcode === 'richyonce' || passcode === 'admin' || passcode === '2025' || passcode === '') {
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError('Invalid Master Tailor passcode. (Press Enter or use "richyonce" for demo)');
    }
  };

  const handleAdvanceStage = (orderId: string, currentStage: number) => {
    if (currentStage < ORDER_STAGES.length - 1) {
      const nextStage = currentStage + 1;
      atelierStore.updateOrderStage(orderId, nextStage, stageNote || undefined);
      setStageNote('');
      // update selected order view
      const updated = atelierStore.getOrderByIdOrRef(orderId);
      if (updated) setSelectedOrder(updated);
    }
  };

  const handleRevertStage = (orderId: string, currentStage: number) => {
    if (currentStage > 0) {
      const prevStage = currentStage - 1;
      atelierStore.updateOrderStage(orderId, prevStage);
      const updated = atelierStore.getOrderByIdOrRef(orderId);
      if (updated) setSelectedOrder(updated);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    atelierStore.createProduct({
      name: newProdName,
      price: parseInt(newProdPrice, 10) || 85000,
      currency: '₦',
      stockStatus: 'IN STOCK',
      stockCount: parseInt(newProdStock, 10) || 10,
      category: newProdCategory,
      image: '/assets/category-ready-to-wear.jpg',
      description: 'Exclusive Richyonce atelier creation tailored with royal Nigerian precision.',
      details: ['Handcrafted in Nigeria', 'Premium breathable textile', 'Tailored master cut'],
      sizes: ['32', '34', '36', '38'],
    });

    setNewProdName('');
    setShowAddProduct(false);
  };

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'Paid' || o.paymentStatus === 'Deposit Paid' ? o.total : 0), 0);
  const activeProductionCount = orders.filter((o) => o.currentStageIndex < ORDER_STAGES.length - 1).length;
  const pendingAppointmentsCount = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending Confirmation').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-6xl bg-[#081813] border border-[#E5C07B]/40 rounded-2xl shadow-2xl overflow-hidden text-white my-4 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#06140F]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E5C07B]/15 border border-[#E5C07B]/40 flex items-center justify-center text-[#E5C07B]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                RICHYONCE ATELIER MANAGEMENT CONSOLE
              </h2>
              <span className="text-[10px] text-white/50 uppercase tracking-widest">
                Authenticated Master Tailor & Production Terminal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5 text-xs flex items-center gap-1"
                title="Lock Terminal"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Lock</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E5C07B]/10 border border-[#E5C07B] flex items-center justify-center text-[#E5C07B]">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">Atelier Gatekeeper</h3>
              <p className="text-xs text-white/60 mt-1">
                Enter Master Tailor authentication passcode to review clients, advance stages, and manage inventory.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. richyonce)"
                className="w-full px-4 py-3 rounded-lg bg-[#05110C] border border-[#E5C07B]/40 text-center text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#E5C07B]"
                autoFocus
              />
              {authError && <p className="text-xs text-red-400">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-lg text-xs font-semibold tracking-widest uppercase bg-[#E5C07B] text-[#0A231C] hover:bg-[#F3DCA2] transition-colors"
              >
                ACCESS ATELIER CONSOLE
              </button>
              <p className="text-[11px] text-white/40">
                Demo access: simply click Access or type "richyonce"
              </p>
            </form>
          </div>
        ) : (
          /* Main Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* KPI Summary Cards */}
            <div className="p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#06140F]/60 border-b border-white/5">
              <div className="p-3.5 rounded-xl bg-[#091D17] border border-[#E5C07B]/20">
                <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-semibold block">
                  ATELIER REVENUE
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-white block mt-1 tabular-nums">
                  ₦{totalRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">● Orders & Bespoke Deposits</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091D17] border border-[#E5C07B]/20">
                <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-semibold block">
                  ACTIVE COMMISSIONS
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-white block mt-1 tabular-nums">
                  {activeProductionCount}
                </span>
                <span className="text-[10px] text-[#E5C07B] font-mono">In Cutting / Construction</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091D17] border border-[#E5C07B]/20">
                <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-semibold block">
                  FITTING RESERVATIONS
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-white block mt-1 tabular-nums">
                  {pendingAppointmentsCount}
                </span>
                <span className="text-[10px] text-sky-400 font-mono">Lagos & Abuja Showrooms</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091D17] border border-[#E5C07B]/20">
                <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-semibold block">
                  ACTIVE SKUS
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-white block mt-1 tabular-nums">
                  {products.length}
                </span>
                <span className="text-[10px] text-white/50 font-mono">ASCENT & Heritage lines</span>
              </div>
            </div>

            {/* Nav Tabs */}
            <div className="px-6 border-b border-white/10 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none bg-[#071813]">
              <div className="flex gap-2">
                {[
                  { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
                  { id: 'cms', label: 'CMS Content & 3D', icon: TrendingUp },
                  { id: 'stripe', label: 'Stripe & Webhooks', icon: DollarSign },
                  { id: 'bespoke', label: `Bespoke Dossiers (${bespokeRequests.length})`, icon: Scissors },
                  { id: 'appointments', label: `Fittings (${appointments.length})`, icon: Calendar },
                  { id: 'products', label: `Inventory (${products.length})`, icon: Edit2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setSelectedOrder(null);
                      }}
                      className={`flex items-center gap-2 py-3.5 px-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-[#E5C07B] text-[#E5C07B]'
                          : 'border-transparent text-white/60 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 py-2">
                <button
                  onClick={() => atelierStore.resetToDefaults()}
                  className="px-2.5 py-1 text-[11px] rounded border border-white/15 text-white/60 hover:text-white flex items-center gap-1"
                  title="Reload Initial Reference State"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span className="hidden md:inline">Reset Demo Data</span>
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  {selectedOrder ? (
                    /* Detailed Order Stage Controller */
                    <div className="p-6 rounded-xl bg-[#091F18] border border-[#E5C07B]/40 space-y-6">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#E5C07B]">
                            MANAGING ATELIER STAGES
                          </span>
                          <h3 className="font-serif text-2xl font-bold text-white">
                            Order #{selectedOrder.id} — {selectedOrder.customer.fullName}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedOrder(null)}
                          className="px-3 py-1.5 rounded border border-white/20 text-xs text-white/80 hover:text-white"
                        >
                          Back to List
                        </button>
                      </div>

                      {/* 11 Stage Controller */}
                      <div>
                        <div className="flex items-center justify-between mb-3 text-xs">
                          <span className="font-semibold text-[#E5C07B] uppercase tracking-wider">
                            Current Stage: {ORDER_STAGES[selectedOrder.currentStageIndex]} (Step {selectedOrder.currentStageIndex + 1} of 11)
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRevertStage(selectedOrder.id, selectedOrder.currentStageIndex)}
                              disabled={selectedOrder.currentStageIndex === 0}
                              className="px-3 py-1 rounded border border-white/20 text-xs text-white/70 hover:text-white disabled:opacity-30"
                            >
                              Revert Step
                            </button>
                            <button
                              onClick={() => handleAdvanceStage(selectedOrder.id, selectedOrder.currentStageIndex)}
                              disabled={selectedOrder.currentStageIndex >= ORDER_STAGES.length - 1}
                              className="px-4 py-1 rounded bg-[#E5C07B] text-[#0A231C] font-semibold text-xs hover:bg-[#F3DCA2] disabled:opacity-30"
                            >
                              Advance to Next Stage →
                            </button>
                          </div>
                        </div>

                        {/* Interactive Node Map */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                          {ORDER_STAGES.map((stg, idx) => {
                            const isDone = idx <= selectedOrder.currentStageIndex;
                            const isCurrent = idx === selectedOrder.currentStageIndex;
                            return (
                              <button
                                key={stg}
                                onClick={() => {
                                  atelierStore.updateOrderStage(selectedOrder.id, idx);
                                  const updated = atelierStore.getOrderByIdOrRef(selectedOrder.id);
                                  if (updated) setSelectedOrder(updated);
                                }}
                                className={`p-2.5 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                                  isCurrent
                                    ? 'border-[#E5C07B] bg-[#E5C07B]/20 text-[#E5C07B] font-bold ring-1 ring-[#E5C07B]'
                                    : isDone
                                    ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                                    : 'border-white/10 bg-black/20 text-white/40'
                                }`}
                              >
                                <span className="block font-mono text-[9px] opacity-60">
                                  {idx + 1}. {isDone ? 'COMPLETED' : 'PENDING'}
                                </span>
                                <span className="truncate block">{stg}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Add Custom Stage Note */}
                      <div className="p-4 rounded-lg bg-black/30 border border-white/10 space-y-2">
                        <label className="block text-xs font-semibold text-white/80">
                          Add Master Tailor Note to Active Stage:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={stageNote}
                            onChange={(e) => setStageNote(e.target.value)}
                            placeholder="e.g. Embroidery completed with 24k gold bullion thread. Pattern moving to assembly."
                            className="flex-1 px-3 py-2 rounded bg-[#06140F] border border-white/20 text-xs text-white"
                          />
                          <button
                            onClick={() => {
                              if (stageNote.trim()) {
                                atelierStore.updateOrderStage(selectedOrder.id, selectedOrder.currentStageIndex, stageNote);
                                setStageNote('');
                                const updated = atelierStore.getOrderByIdOrRef(selectedOrder.id);
                                if (updated) setSelectedOrder(updated);
                              }
                            }}
                            className="px-4 py-2 rounded bg-[#E5C07B] text-[#0A231C] text-xs font-semibold hover:bg-white"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>

                      {/* Items & Financials */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-4 rounded-lg bg-black/20 border border-white/10">
                          <h4 className="font-semibold text-[#E5C07B] mb-2 uppercase">Line Items</h4>
                          {selectedOrder.items.map((it) => (
                            <div key={it.id} className="flex justify-between py-1 border-b border-white/5">
                              <span>{it.product.name} ({it.size}) × {it.quantity}</span>
                              <span className="font-mono">₦{(it.product.price * it.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 rounded-lg bg-black/20 border border-white/10">
                          <h4 className="font-semibold text-[#E5C07B] mb-2 uppercase">Client & Dispatch</h4>
                          <p><strong>Client:</strong> {selectedOrder.customer.fullName}</p>
                          <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                          <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                          <p><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.state}</p>
                          <p className="mt-2 text-[#E5C07B]"><strong>Payment Status:</strong> {selectedOrder.paymentStatus} ({selectedOrder.paymentMethod})</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Orders Table */
                    <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#091D17]">
                      <table className="w-full text-left text-xs text-white/80">
                        <thead className="bg-[#06140F] text-[#E5C07B] uppercase tracking-wider text-[11px] border-b border-white/10">
                          <tr>
                            <th className="p-3.5">Order ID</th>
                            <th className="p-3.5">Client</th>
                            <th className="p-3.5">Piece</th>
                            <th className="p-3.5">Total</th>
                            <th className="p-3.5">Current Stage</th>
                            <th className="p-3.5">Payment</th>
                            <th className="p-3.5 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {orders.map((o) => (
                            <tr key={o.id} className="hover:bg-white/5 transition-colors">
                              <td className="p-3.5 font-mono font-bold text-white">#{o.id}</td>
                              <td className="p-3.5 font-medium">{o.customer.fullName}</td>
                              <td className="p-3.5">{o.items[0]?.product.name || 'Bespoke Piece'}</td>
                              <td className="p-3.5 font-mono text-[#E5C07B]">₦{o.total.toLocaleString()}</td>
                              <td className="p-3.5">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#E5C07B]/15 text-[#E5C07B] border border-[#E5C07B]/30">
                                  {ORDER_STAGES[o.currentStageIndex]}
                                </span>
                              </td>
                              <td className="p-3.5">
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                  o.paymentStatus === 'Paid' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                                }`}>
                                  {o.paymentStatus}
                                </span>
                              </td>
                              <td className="p-3.5 text-right space-x-2">
                                <button
                                  onClick={() => setSelectedOrder(o)}
                                  className="px-2.5 py-1 rounded bg-[#E5C07B] text-[#0A231C] font-semibold text-[11px] hover:bg-white"
                                >
                                  Manage Stages
                                </button>
                                {onSelectOrderToTrack && (
                                  <button
                                    onClick={() => {
                                      onSelectOrderToTrack(o.id);
                                      onClose();
                                    }}
                                    className="px-2 py-1 rounded border border-white/20 text-[11px] hover:text-[#E5C07B]"
                                  >
                                    View in Timeline
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* BESPOKE REQUESTS TAB */}
              {activeTab === 'bespoke' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bespokeRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-5 rounded-xl bg-[#091D17] border border-[#E5C07B]/20 space-y-3 text-xs"
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="font-mono text-sm font-bold text-[#E5C07B]">
                            {req.reference}
                          </span>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
                            {req.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-white/80">
                          <p><strong>Garment:</strong> {req.garment}</p>
                          <p><strong>Occasion:</strong> {req.occasion}</p>
                          <p><strong>Fabric:</strong> {req.fabric}</p>
                          <p><strong>Fit Mode:</strong> {req.fitType === 'in-person' ? 'In-Person Fitting' : 'Manual Measurements'}</p>
                          <p className="col-span-2"><strong>Customizations:</strong> {req.customizations.join(', ')}</p>
                        </div>

                        {req.fitType === 'manual' && req.measurements && (
                          <div className="p-3 bg-black/30 rounded border border-white/5 space-y-1 text-[11px] font-mono">
                            <span className="text-[#E5C07B] font-sans font-semibold block">Client Measurements ({req.measurements.unit}):</span>
                            <p>Chest: {req.measurements.chest} | Waist: {req.measurements.waist} | Shoulder: {req.measurements.shoulder}</p>
                            <p>Sleeve: {req.measurements.sleeveLength} | Trouser: {req.measurements.trouserLength} | Height: {req.measurements.height}</p>
                          </div>
                        )}

                        {req.fitType === 'in-person' && req.fittingDetails && (
                          <div className="p-3 bg-black/30 rounded border border-white/5 space-y-1 text-[11px]">
                            <span className="text-[#E5C07B] font-semibold block">Fitting Appointment:</span>
                            <p>Client: {req.fittingDetails.customerName} ({req.fittingDetails.phone})</p>
                            <p>Preferred: {req.fittingDetails.preferredDate} at {req.fittingDetails.preferredTime}</p>
                            <p>Venue: {req.fittingDetails.locationPreference}</p>
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-between border-t border-white/10">
                          <span className="text-white/50 text-[10px]">Received: {new Date(req.createdAt).toLocaleDateString()}</span>
                          <button
                            onClick={() => {
                              atelierStore.updateBespokeStatus(req.id, 'In Production', 4);
                            }}
                            className="px-3 py-1 rounded bg-[#E5C07B] text-[#0A231C] font-semibold text-[11px] hover:bg-white"
                          >
                            Approve for Production
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* APPOINTMENTS TAB */}
              {activeTab === 'appointments' && (
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#091D17]">
                  <table className="w-full text-left text-xs text-white/80">
                    <thead className="bg-[#06140F] text-[#E5C07B] uppercase tracking-wider text-[11px] border-b border-white/10">
                      <tr>
                        <th className="p-3.5">Code</th>
                        <th className="p-3.5">Client</th>
                        <th className="p-3.5">Contact</th>
                        <th className="p-3.5">Consultation</th>
                        <th className="p-3.5">Date & Time</th>
                        <th className="p-3.5">Venue</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {appointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-white/5">
                          <td className="p-3.5 font-mono font-bold text-white">{apt.id}</td>
                          <td className="p-3.5 font-semibold text-white">{apt.customerName}</td>
                          <td className="p-3.5">
                            <div>{apt.email}</div>
                            <div className="text-white/50 font-mono text-[10px]">{apt.phone}</div>
                          </td>
                          <td className="p-3.5">{apt.appointmentType}</td>
                          <td className="p-3.5 font-medium text-white">{apt.preferredDate} ({apt.preferredTime})</td>
                          <td className="p-3.5">{apt.locationType}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-400">
                              {apt.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => atelierStore.updateAppointmentStatus(apt.id, 'Confirmed')}
                              className="px-2.5 py-1 rounded bg-[#E5C07B] text-[#0A231C] text-[11px] font-semibold hover:bg-white"
                            >
                              Confirm
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PRODUCTS & INVENTORY TAB */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">
                      Manage pricing, inventory numbers, and stock badges across the storefront.
                    </span>
                    <button
                      onClick={() => setShowAddProduct(!showAddProduct)}
                      className="px-4 py-2 rounded-lg bg-[#E5C07B] text-[#0A231C] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-white"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Atelier SKU</span>
                    </button>
                  </div>

                  {showAddProduct && (
                    <form onSubmit={handleCreateProduct} className="p-4 rounded-xl bg-black/40 border border-[#E5C07B]/30 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="block text-white/70 mb-1">Product Name</label>
                        <input
                          type="text"
                          required
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          placeholder="e.g. Royal Ebony Senator Tunic"
                          className="w-full px-3 py-2 rounded bg-[#06140F] border border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-1">Price (NGN)</label>
                        <input
                          type="number"
                          required
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#06140F] border border-white/20 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-1">Category</label>
                        <select
                          value={newProdCategory}
                          onChange={(e) => setNewProdCategory(e.target.value as any)}
                          className="w-full px-3 py-2 rounded bg-[#06140F] border border-white/20 text-white"
                        >
                          <option value="ready-to-wear">Ready-To-Wear</option>
                          <option value="traditional">Traditional</option>
                          <option value="bespoke">Bespoke</option>
                          <option value="accessories">Accessories</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="w-full py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold uppercase tracking-wider text-xs"
                        >
                          Save to Catalog
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((p) => (
                      <div key={p.id} className="p-4 rounded-xl bg-[#091D17] border border-white/10 flex gap-3.5 items-center">
                        <img src={p.image} alt={p.name} className="w-16 h-20 object-cover rounded bg-black/40 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate text-xs">{p.name}</h4>
                          <span className="text-[#E5C07B] font-mono font-bold text-xs block">
                            ₦{p.price.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-white/60">Stock: {p.stockCount}</span>
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                              {p.stockStatus}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => {
                                const newPrice = prompt(`Update price for ${p.name}:`, p.price.toString());
                                if (newPrice) {
                                  atelierStore.updateProduct({ ...p, price: parseInt(newPrice, 10) || p.price });
                                }
                              }}
                              className="text-[10px] text-[#E5C07B] hover:underline"
                            >
                              Edit Price
                            </button>
                            <span className="text-white/20">|</span>
                            <button
                              onClick={() => {
                                const newCount = prompt(`Update stock count:`, p.stockCount.toString());
                                if (newCount) {
                                  const count = parseInt(newCount, 10) || 0;
                                  const stockStatus = count === 0 ? 'PRE-ORDER' : count <= 5 ? 'LOW STOCK' : 'IN STOCK';
                                  atelierStore.updateProduct({ ...p, stockCount: count, stockStatus });
                                }
                              }}
                              className="text-[10px] text-white/70 hover:underline"
                            >
                              Update Stock
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CMS CONTENT & IMAGE MANAGER TAB */}
              {activeTab === 'cms' && (
                <div className="space-y-6">
                  {/* Top Notification */}
                  <div className="p-5 rounded-xl bg-[#091D17] border border-[#E5C07B]/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-semibold">
                          CENTRAL BRAND IMAGE & CONTENT CMS
                        </span>
                        <h3 className="font-serif text-xl font-bold text-white">
                          Website Photography & Brand Asset Manager
                        </h3>
                        <p className="text-xs text-white/60 mt-1">
                          Update any image or editorial headline across the site in real-time. Changes are immediately saved and reflected across all visitor views.
                        </p>
                      </div>
                      {cmsSaved && (
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Saved & Published
                        </span>
                      )}
                    </div>

                    {/* Editorial Headlines */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Hero Section Main Headline</label>
                        <input
                          type="text"
                          value={cmsHeroTitle}
                          onChange={(e) => setCmsHeroTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#06140F] border border-white/20 text-white text-xs focus:border-[#E5C07B] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Hero Subtext & Atmosphere</label>
                        <input
                          type="text"
                          value={cmsHeroSubtext}
                          onChange={(e) => setCmsHeroSubtext(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#06140F] border border-white/20 text-white text-xs focus:border-[#E5C07B] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Website Images Grid */}
                  <div className="p-5 rounded-xl bg-[#091D17] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-[#E5C07B] tracking-wider">
                        Active Website Images ({Object.keys(brandAssets).length} Slots)
                      </span>
                      <span className="text-[11px] text-white/50">
                        Click "Change Image" on any slot to replace with any URL or local path
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(brandAssets).map(([key, url]) => (
                        <div
                          key={key}
                          className="p-3.5 rounded-xl bg-[#06140F] border border-white/10 flex flex-col justify-between space-y-3"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={url}
                              alt={key}
                              className="w-16 h-20 object-cover object-top rounded-lg bg-black/40 border border-white/10 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-mono uppercase text-[#E5C07B] tracking-wider block">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="text-[11px] text-white/50 truncate block mt-0.5">
                                {url}
                              </span>
                            </div>
                          </div>

                          {editingAssetKey === key ? (
                            <div className="space-y-2 pt-2 border-t border-white/10">
                              <input
                                type="text"
                                placeholder="Paste new image URL or path"
                                value={newAssetUrl}
                                onChange={(e) => setNewAssetUrl(e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded bg-black/50 border border-[#E5C07B]/40 text-xs text-white focus:outline-none"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    if (newAssetUrl.trim()) {
                                      atelierStore.updateBrandAsset(key, newAssetUrl.trim());
                                      setBrandAssets(atelierStore.getBrandAssets());
                                      setCmsSaved(true);
                                      setTimeout(() => setCmsSaved(false), 2500);
                                    }
                                    setEditingAssetKey(null);
                                    setNewAssetUrl('');
                                  }}
                                  className="flex-1 py-1 rounded bg-[#E5C07B] text-[#0A231C] text-[11px] font-bold hover:bg-white"
                                >
                                  Save Image
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingAssetKey(null);
                                    setNewAssetUrl('');
                                  }}
                                  className="px-3 py-1 rounded bg-white/10 text-white/70 text-[11px] hover:bg-white/20"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingAssetKey(key);
                                setNewAssetUrl(url);
                              }}
                              className="w-full py-1.5 rounded bg-white/5 hover:bg-[#E5C07B]/10 hover:border-[#E5C07B]/30 border border-white/10 text-[11px] font-semibold text-[#E5C07B] transition-colors cursor-pointer"
                            >
                              Change Image
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STRIPE & WEBHOOKS TAB */}
              {activeTab === 'stripe' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-xl bg-[#091D17] border border-[#E5C07B]/30 space-y-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-semibold">
                      PAYMENT GATEWAY CONFIGURATION
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">
                      Stripe Elements & Automated Fulfillment
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-lg bg-black/40 border border-white/10 space-y-2">
                        <span className="font-bold text-white block">Webhook Event Listener</span>
                        <p className="text-white/60 leading-relaxed">
                          Listening on <code className="text-[#E5C07B] font-mono">/api/payments/webhook</code> for <code className="text-emerald-400 font-mono">checkout.session.completed</code> and <code className="text-emerald-400 font-mono">payment_intent.succeeded</code>.
                        </p>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400">
                          Active & Listening
                        </span>
                      </div>

                      <div className="p-4 rounded-lg bg-black/40 border border-white/10 space-y-2">
                        <span className="font-bold text-white block">Automatic Inventory Depletion</span>
                        <p className="text-white/60 leading-relaxed">
                          Upon successful settlement, order status is updated to "Paid" and product stock count automatically decrements in the database.
                        </p>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400">
                          Automatic Sync Enabled
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
