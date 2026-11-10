/**
 * RICHYONCE CLOTHING - CORE DATA TYPES & MODELS
 */

export type StockBadge = 'IN STOCK' | 'LOW STOCK' | 'PRE-ORDER';

export type ProductCategory = 'ready-to-wear' | 'traditional' | 'bespoke' | 'accessories';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number; // in NGN (Nigerian Naira)
  currency: string;
  stockStatus: StockBadge;
  stockCount: number;
  category: ProductCategory;
  image: string;
  gallery?: string[];
  description: string;
  details: string[];
  sizes: string[];
  colors?: string[];
  featured?: boolean;
  isAscentCollection?: boolean;
}

export interface CartItem {
  id: string; // unique item cart key (productId + size)
  product: Product;
  size: string;
  quantity: number;
}

// 11-Stage Production & Fulfillment Lifecycle
export const ORDER_STAGES = [
  'REQUEST SUBMITTED',
  'REVIEW',
  'PROPOSAL',
  'DEPOSIT',
  'FABRIC SOURCING',
  'CUTTING',
  'CONSTRUCTION',
  'QUALITY CONTROL',
  'FITTING',
  'DELIVERY',
  'COMPLETED',
] as const;

export type OrderStageName = typeof ORDER_STAGES[number];

export interface StageHistoryItem {
  stage: OrderStageName;
  date: string;
  completed: boolean;
  notes?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface Order {
  id: string; // e.g. "RY-9042"
  reference: string;
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'Stripe' | 'Paystack' | 'Bank Transfer' | 'Atelier Concierge';
  paymentStatus: 'Pending' | 'Paid' | 'Deposit Paid' | 'Failed';
  currentStageIndex: number;
  stageHistory: StageHistoryItem[];
  createdAt: string;
  estimatedCompletion?: string;
  notes?: string;
}

// Bespoke Atelier Request
export type GarmentType =
  | 'Traditional Wedding'
  | 'Agbada'
  | 'Senator'
  | 'Suit'
  | 'Shirt'
  | 'Trousers'
  | 'Full Outfit';

export type OccasionType =
  | 'Wedding'
  | 'Birthday'
  | 'Church'
  | 'Red Carpet'
  | 'Business'
  | 'Everyday Luxury';

export type FabricChoice =
  | 'Ankara'
  | 'Brocade'
  | 'Aso-Oke'
  | 'Cotton'
  | 'Linen'
  | 'Velvet';

export type ArtistryCustomization =
  | 'Embroidery'
  | 'Beading'
  | 'Appliqué'
  | 'Layering'
  | 'Custom Buttons'
  | 'Monogram';

export interface ManualMeasurements {
  chest: string;
  waist: string;
  shoulder: string;
  sleeveLength: string;
  trouserLength: string;
  height: string;
  unit: 'inches' | 'cm';
  additionalNotes?: string;
}

export interface InPersonFittingPreference {
  customerName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  locationPreference: 'Lagos Atelier (Ikoyi)' | 'Abuja Showroom (Maitama)' | 'Ebonyi Heritage Atelier (Abakaliki)' | 'Private Hotel Suite' | 'Virtual Video Fitting';
}

export interface BespokeRequest {
  id: string; // e.g. "RY-ATELIER-7710"
  reference: string;
  garment: GarmentType;
  occasion: OccasionType;
  fabric: FabricChoice;
  customizations: ArtistryCustomization[];
  fitType: 'manual' | 'in-person';
  measurements?: ManualMeasurements;
  fittingDetails?: InPersonFittingPreference;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  status: 'Received' | 'Under Review' | 'Proposal Sent' | 'In Production' | 'Completed';
  currentStageIndex: number;
  stageHistory: StageHistoryItem[];
  createdAt: string;
}

// Appointment Model
export interface Appointment {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  appointmentType: 'Private Atelier Fitting' | 'Bespoke Consultation' | 'Wedding Entourage Styling' | 'Virtual Wardrobe Review';
  preferredDate: string;
  preferredTime: string;
  locationType: 'Lagos Atelier' | 'Abuja Atelier' | 'Abakaliki Atelier' | 'Virtual Video';
  notes?: string;
  status: 'Pending Confirmation' | 'Confirmed' | 'Completed' | 'Rescheduled';
  createdAt: string;
}
