/**
 * RICHYONCE CLOTHING - ATELIER DATA STORE & LOCAL REPOSITORY
 * Provides persistence, initial demo seeding matching the reference website,
 * and reactive listeners for products, orders, bespoke requests, and appointments.
 */

import { BRAND_ASSETS } from '../config/brandAssets';
import {
  Product,
  Order,
  BespokeRequest,
  Appointment,
  ORDER_STAGES,
  StageHistoryItem,
} from '../types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ascent-pants-01',
    name: 'Ascend Pants',
    subtitle: 'Crimson Architectural Tailored Trousers',
    price: 85000,
    currency: '₦',
    stockStatus: 'IN STOCK',
    stockCount: 18,
    category: 'ready-to-wear',
    image: BRAND_ASSETS.ascentPants,
    description: 'A study in movement and modern elevation. Cut from premium architectural wool and cotton gabardine, tailored with an exact break, side tabs, and fluid drape as featured in our modern balcony editorial.',
    details: [
      'Tailored architectural silhouette',
      'Champagne gold metallic thread embroidery',
      'Solid brass engraved Richyonce button closure',
      'Deep tailored slash pockets and reinforced hems',
      'Handcrafted in Nigeria with ethical atelier practices',
    ],
    sizes: ['30', '32', '34', '36', '38'],
    isAscentCollection: true,
    featured: true,
  },
  {
    id: 'ascent-hoodie-02',
    name: 'Ascend Hoodies',
    subtitle: 'Contemporary Red Lionhead Isiagu Tunic',
    price: 75000,
    currency: '₦',
    stockStatus: 'LOW STOCK',
    stockCount: 4,
    category: 'ready-to-wear',
    image: BRAND_ASSETS.ascentHoodie,
    description: 'Impeccably weighted authentic red Isiagu silk cotton featuring the sovereign lionhead motif across the chest, paired with classic shirt collar and tailored sleeves. As seen in our modern gentleman series.',
    details: [
      'Authentic engineered placement lionhead print',
      'Breathable long-staple tropical cotton silk',
      'Reinforced side vents for natural drape',
      'Designed to pair with tailored trousers and coral accents',
      'Individually finished by Master Craftspeople in Nigeria',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isAscentCollection: true,
    featured: true,
  },
  {
    id: 'ascent-cargo-03',
    name: 'Ascend Cargo Pieces',
    subtitle: 'The Sovereign Lionhead Isiagu Masterpiece',
    price: 95000,
    currency: '₦',
    stockStatus: 'IN STOCK',
    stockCount: 14,
    category: 'ready-to-wear',
    image: BRAND_ASSETS.ascentCargo,
    description: 'A utilitarian statement reinterpreted through African luxury lens. Features the monumental golden lion crest embroidered with over 100,000 stitches of high-density bullion thread on structured black faille.',
    details: [
      'Iconic high-density bullion lion embroidery crest',
      'Structured contrast white inner sleeve cuffs',
      'Carved ceremonial fan attachment compatibility',
      'Flawless geometric symmetry across placket',
      'Treated with water-resistant artisanal matte coating',
    ],
    sizes: ['30', '32', '34', '36', '38'],
    isAscentCollection: true,
    featured: true,
  },
  {
    id: 'ascent-shirts-04',
    name: 'Ascend Shirts',
    subtitle: 'Crimson Textured Diamond Jacquard Tunic',
    price: 95000,
    currency: '₦',
    stockStatus: 'IN STOCK',
    stockCount: 12,
    category: 'ready-to-wear',
    image: BRAND_ASSETS.ascentShirts,
    description: 'Crafted from rich textured scarlet diamond-relief jacquard. Features subtle tone-on-tone ceremonial finishing and coordinates with authentic red coral bead crowns and black royal beads.',
    details: [
      'Diamond jacquard relief weave with natural luster',
      'Mandarin collar with concealed placket buttons',
      'Tailored cuff detailing engineered for wrist coral adornment',
      'Mother-of-pearl buttons with gold cross-stitch threading',
      'Relaxed resort silhouette tailored for tropical climates',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isAscentCollection: true,
    featured: true,
  },
  {
    id: 'limited-pieces-05',
    name: 'Limited Pieces',
    subtitle: 'The Sovereign Emerald Velvet Masterpiece',
    price: 120000,
    currency: '₦',
    stockStatus: 'PRE-ORDER',
    stockCount: 6,
    category: 'traditional',
    image: BRAND_ASSETS.limitedPieces,
    description: 'Numbered atelier release. Handcrafted from heavy forest emerald crushed velvet studded with hand-set crystal constellation studs and ivory silk neckline embroidery. As featured in our sovereign monarch series.',
    details: [
      'Triple-piece royal ceremonial ensemble',
      'Imported heavy German cotton velvet fabric',
      'Over 80,000 stitches of high-density bullion embroidery',
      'Comes with matching bespoke Fila cap and garment bag',
      'Strictly limited to 25 individually numbered pieces',
    ],
    sizes: ['M', 'L', 'XL', 'Bespoke Custom'],
    isAscentCollection: true,
    featured: true,
  },
  {
    id: 'hero-grand-agbada',
    name: 'The Sovereign Emerald Agbada',
    subtitle: 'Ceremonial Three-Piece Masterpiece',
    price: 320000,
    currency: '₦',
    stockStatus: 'PRE-ORDER',
    stockCount: 3,
    category: 'traditional',
    image: BRAND_ASSETS.heroAgbada,
    description: 'As featured in our main campaign. Worn by men of supreme presence. Cut from rich forest emerald raw silk and heavy jacquard, with cascading golden crest embroidery and hand-strung bead collar accents.',
    details: [
      'Masterpiece 3-piece grand Agbada, Awosoke, and Sokoto',
      'Pure gold thread hand embroidery',
      'Matching royal embroidered Fila crown included',
      'Requires 35 hours of master tailoring',
    ],
    sizes: ['40R', '42R', '44R', 'Bespoke'],
    featured: true,
  },
  {
    id: 'bespoke-3piece-suit',
    name: 'Obsidian 3-Piece Peak Lapel Suit',
    subtitle: 'Savile Row Precision, African Soul',
    price: 350000,
    currency: '₦',
    stockStatus: 'IN STOCK',
    stockCount: 5,
    category: 'bespoke',
    image: BRAND_ASSETS.categoryBespoke,
    description: 'Engineered from Super 150s English wool with a full canvas construction. Boasts wide 4-inch peak lapels, a tailored double-breasted horseshoe waistcoat, and flat-front trousers with side adjusters.',
    details: [
      'Super 150s worsted British wool',
      'Full floating horsehair canvas chest piece',
      'Hand-sewn Milanese buttonhole on left lapel',
      'Rich champagne silk jacquard internal lining',
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    featured: true,
  },
  {
    id: 'accessories-luxury-set',
    name: 'Heritage Royal Fila & Leather Set',
    subtitle: 'Ceremonial Velvet Cap & Accessories',
    price: 75000,
    currency: '₦',
    stockStatus: 'IN STOCK',
    stockCount: 22,
    category: 'accessories',
    image: BRAND_ASSETS.categoryAccessories,
    description: 'Hand-tailored black velvet Fila cap embroidered in golden bullion thread, accompanied by a raw polished red coral and gold prayer bead wrist adornment, and full-grain pebbled calfskin wallet.',
    details: [
      'Crushed German cotton velvet Fila',
      'Certified authentic Benin coral and brass beads',
      'Top-grain vegetable-tanned leather essentials',
      'Presented in a lacquered presentation gift box',
    ],
    sizes: ['One Size (Adjustable)'],
    featured: true,
  },
];

// Seeded sample order matching the user's reference screenshot #RY-9042 exactly
const INITIAL_DEMO_ORDER: Order = {
  id: 'RY-9042',
  reference: 'RY-9042',
  items: [
    {
      id: 'demo-item-1',
      product: INITIAL_PRODUCTS[5], // The Sovereign Emerald Agbada
      size: '42R Bespoke',
      quantity: 1,
    },
  ],
  customer: {
    fullName: 'Adekunle Okafor',
    email: 'adekunle.o@richyonce-client.com',
    phone: '+234 803 456 7890',
    address: 'Plot 12, Alexander Road',
    city: 'Ikoyi',
    state: 'Lagos',
    country: 'Nigeria',
    postalCode: '101233',
  },
  subtotal: 320000,
  shippingFee: 0,
  total: 320000,
  paymentMethod: 'Paystack',
  paymentStatus: 'Deposit Paid',
  currentStageIndex: 4, // FABRIC SOURCING (5th stage, index 4)
  stageHistory: [
    { stage: 'REQUEST SUBMITTED', date: 'Aug 20, 2025', completed: true, notes: 'Bespoke commission request registered.' },
    { stage: 'REVIEW', date: 'Aug 21, 2025', completed: true, notes: 'Measurements and fabric specifications verified by Master Tailor.' },
    { stage: 'PROPOSAL', date: 'Aug 22, 2025', completed: true, notes: 'Design blueprint and embroidery scheme approved by client.' },
    { stage: 'DEPOSIT', date: 'Aug 23, 2025', completed: true, notes: 'Commitment deposit confirmed via Paystack secure gateway.' },
    { stage: 'FABRIC SOURCING', date: 'Aug 25, 2025', completed: true, notes: 'Imported emerald raw silk & bullion threads allocated.' },
    { stage: 'CUTTING', date: 'Pending', completed: false, notes: 'Pattern making and shear cutting.' },
    { stage: 'CONSTRUCTION', date: 'Pending', completed: false, notes: 'Artisanal assembly in main atelier.' },
    { stage: 'QUALITY CONTROL', date: 'Pending', completed: false, notes: '18-point symmetry, seam tension, and finish inspection.' },
    { stage: 'FITTING', date: 'Pending', completed: false, notes: 'Private fitting consultation scheduled in Ikoyi atelier.' },
    { stage: 'DELIVERY', date: 'Pending', completed: false, notes: 'Secure white-glove bespoke courier dispatch.' },
    { stage: 'COMPLETED', date: 'Pending', completed: false, notes: 'Piece officially inducted into client wardrobe.' },
  ],
  createdAt: '2025-08-20T10:14:00Z',
  estimatedCompletion: 'September 12, 2025',
  notes: 'Client requested extra 2 inches drape on right sleeve. Private Ikoyi showroom delivery.',
};

const INITIAL_BESPOKE_REQUEST: BespokeRequest = {
  id: 'RY-ATELIER-7710',
  reference: 'RY-ATELIER-7710',
  garment: 'Suit',
  occasion: 'Wedding',
  fabric: 'Brocade',
  customizations: ['Embroidery', 'Monogram', 'Custom Buttons'],
  fitType: 'in-person',
  fittingDetails: {
    customerName: 'Chidubem Ebere',
    email: 'chidubem.e@gmail.com',
    phone: '+234 812 345 6789',
    preferredDate: '2026-11-05',
    preferredTime: '14:00',
    locationPreference: 'Lagos Atelier (Ikoyi)',
  },
  customerName: 'Chidubem Ebere',
  customerEmail: 'chidubem.e@gmail.com',
  customerPhone: '+234 812 345 6789',
  notes: 'Groom attire for traditional and white wedding transition.',
  status: 'Received',
  currentStageIndex: 0,
  stageHistory: [
    { stage: 'REQUEST SUBMITTED', date: 'Oct 14, 2026', completed: true, notes: 'Initial atelier inquiry received.' },
    ...ORDER_STAGES.slice(1).map(stage => ({ stage, date: 'Pending', completed: false }))
  ],
  createdAt: '2026-10-14T11:20:00Z',
};

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-101',
    customerName: 'Dr. Femi Adeleke',
    email: 'femi.adeleke@firm.ng',
    phone: '+234 802 888 1234',
    appointmentType: 'Private Atelier Fitting',
    preferredDate: '2026-10-24',
    preferredTime: '11:00 AM',
    locationType: 'Lagos Atelier',
    notes: 'Fitting for 3 bespoke Senator suits for international symposium.',
    status: 'Confirmed',
    createdAt: '2026-10-15T09:00:00Z',
  },
  {
    id: 'APT-102',
    customerName: 'Tariq Al-Mansoor',
    email: 'tariq.m@diaspora.co.uk',
    phone: '+44 7700 900123',
    appointmentType: 'Virtual Wardrobe Review',
    preferredDate: '2026-10-28',
    preferredTime: '03:30 PM',
    locationType: 'Virtual Video',
    notes: 'Virtual consultation for destination wedding in Dubai.',
    status: 'Pending Confirmation',
    createdAt: '2026-10-16T15:30:00Z',
  },
];

// Helper to safely load and sync with localStorage
class AtelierStore {
  private products: Product[] = [];
  private orders: Order[] = [];
  private bespokeRequests: BespokeRequest[] = [];
  private appointments: Appointment[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedProducts = localStorage.getItem('ry_products');
      this.products = storedProducts ? JSON.parse(storedProducts) : INITIAL_PRODUCTS;

      const storedOrders = localStorage.getItem('ry_orders');
      this.orders = storedOrders ? JSON.parse(storedOrders) : [INITIAL_DEMO_ORDER];

      const storedBespoke = localStorage.getItem('ry_bespoke');
      this.bespokeRequests = storedBespoke ? JSON.parse(storedBespoke) : [INITIAL_BESPOKE_REQUEST];

      const storedAppointments = localStorage.getItem('ry_appointments');
      this.appointments = storedAppointments ? JSON.parse(storedAppointments) : INITIAL_APPOINTMENTS;

      const storedBrandAssets = localStorage.getItem('ry_brand_assets');
      this.brandAssets = storedBrandAssets ? JSON.parse(storedBrandAssets) : this.extractFlatBrandAssets();
    } catch {
      this.products = INITIAL_PRODUCTS;
      this.orders = [INITIAL_DEMO_ORDER];
      this.bespokeRequests = [INITIAL_BESPOKE_REQUEST];
      this.appointments = INITIAL_APPOINTMENTS;
      this.brandAssets = this.extractFlatBrandAssets();
    }
  }

  private extractFlatBrandAssets(): Record<string, string> {
    const flat: Record<string, string> = {};
    for (const [k, v] of Object.entries(BRAND_ASSETS)) {
      if (typeof v === 'string') {
        flat[k] = v;
      }
    }
    return flat;
  }

  private brandAssets: Record<string, string> = {};

  private persist() {
    try {
      localStorage.setItem('ry_products', JSON.stringify(this.products));
      localStorage.setItem('ry_orders', JSON.stringify(this.orders));
      localStorage.setItem('ry_bespoke', JSON.stringify(this.bespokeRequests));
      localStorage.setItem('ry_appointments', JSON.stringify(this.appointments));
      localStorage.setItem('ry_brand_assets', JSON.stringify(this.brandAssets));
    } catch {
      // storage unavailable
    }
    this.notify();
  }

  // Brand Imagery CMS API
  public getBrandAssets(): Record<string, string> {
    return { ...this.brandAssets };
  }

  public updateBrandAsset(key: string, url: string) {
    this.brandAssets[key] = url;
    this.persist();
  }

  public updateMultipleBrandAssets(assets: Record<string, string>) {
    this.brandAssets = { ...this.brandAssets, ...assets };
    this.persist();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  // Products API
  public getProducts(): Product[] {
    return [...this.products];
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  public updateProduct(updated: Product) {
    this.products = this.products.map((p) => (p.id === updated.id ? updated : p));
    this.persist();
  }

  public createProduct(newProd: Omit<Product, 'id'>): Product {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    this.products.unshift(product);
    this.persist();
    return product;
  }

  // Orders API
  public getOrders(): Order[] {
    return [...this.orders];
  }

  public getOrderByIdOrRef(query: string): Order | undefined {
    const cleaned = query.trim().toUpperCase().replace('#', '');
    return this.orders.find(
      (o) =>
        o.id.toUpperCase() === cleaned ||
        o.reference.toUpperCase() === cleaned ||
        o.id.toUpperCase() === `RY-${cleaned}` ||
        o.reference.toUpperCase() === `RY-${cleaned}`
    );
  }

  public createOrder(orderData: Omit<Order, 'id' | 'reference' | 'currentStageIndex' | 'stageHistory' | 'createdAt'>): Order {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const id = `RY-${randomNum}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const stageHistory: StageHistoryItem[] = ORDER_STAGES.map((stage, idx) => ({
      stage,
      date: idx === 0 ? today : 'Pending',
      completed: idx === 0,
      notes: idx === 0 ? 'Order initialized and payment confirmed.' : undefined,
    }));

    const newOrder: Order = {
      ...orderData,
      id,
      reference: id,
      currentStageIndex: 0,
      stageHistory,
      createdAt: new Date().toISOString(),
    };

    this.orders.unshift(newOrder);
    this.persist();
    return newOrder;
  }

  public updateOrderStage(orderId: string, newStageIndex: number, note?: string) {
    this.orders = this.orders.map((order) => {
      if (order.id !== orderId) return order;
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const updatedHistory = order.stageHistory.map((item, idx) => {
        if (idx <= newStageIndex) {
          return {
            ...item,
            completed: true,
            date: item.date === 'Pending' ? today : item.date,
            notes: idx === newStageIndex && note ? note : item.notes,
          };
        } else {
          return {
            ...item,
            completed: false,
            date: 'Pending',
          };
        }
      });

      return {
        ...order,
        currentStageIndex: newStageIndex,
        stageHistory: updatedHistory,
      };
    });
    this.persist();
  }

  // Bespoke API
  public getBespokeRequests(): BespokeRequest[] {
    return [...this.bespokeRequests];
  }

  public getBespokeRequestById(id: string): BespokeRequest | undefined {
    const cleaned = id.trim().toUpperCase();
    return this.bespokeRequests.find((r) => r.id.toUpperCase() === cleaned || r.reference.toUpperCase() === cleaned);
  }

  public createBespokeRequest(data: Omit<BespokeRequest, 'id' | 'reference' | 'status' | 'currentStageIndex' | 'stageHistory' | 'createdAt'>): BespokeRequest {
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const reference = `RY-ATELIER-${randCode}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const stageHistory: StageHistoryItem[] = ORDER_STAGES.map((stage, idx) => ({
      stage,
      date: idx === 0 ? today : 'Pending',
      completed: idx === 0,
      notes: idx === 0 ? 'Bespoke atelier dossier received.' : undefined,
    }));

    const newRequest: BespokeRequest = {
      ...data,
      id: reference,
      reference,
      status: 'Received',
      currentStageIndex: 0,
      stageHistory,
      createdAt: new Date().toISOString(),
    };

    this.bespokeRequests.unshift(newRequest);
    this.persist();
    return newRequest;
  }

  public updateBespokeStatus(requestId: string, status: BespokeRequest['status'], stageIndex?: number) {
    this.bespokeRequests = this.bespokeRequests.map((req) => {
      if (req.id !== requestId) return req;
      return {
        ...req,
        status,
        currentStageIndex: stageIndex !== undefined ? stageIndex : req.currentStageIndex,
      };
    });
    this.persist();
  }

  // Appointments API
  public getAppointments(): Appointment[] {
    return [...this.appointments];
  }

  public createAppointment(data: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Appointment {
    const id = `APT-${Math.floor(100 + Math.random() * 900)}`;
    const newApt: Appointment = {
      ...data,
      id,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    this.appointments.unshift(newApt);
    this.persist();
    return newApt;
  }

  public updateAppointmentStatus(id: string, status: Appointment['status']) {
    this.appointments = this.appointments.map((apt) => (apt.id === id ? { ...apt, status } : apt));
    this.persist();
  }

  // Reset to demo defaults if requested
  public resetToDefaults() {
    this.products = INITIAL_PRODUCTS;
    this.orders = [INITIAL_DEMO_ORDER];
    this.bespokeRequests = [INITIAL_BESPOKE_REQUEST];
    this.appointments = INITIAL_APPOINTMENTS;
    this.brandAssets = this.extractFlatBrandAssets();
    this.persist();
  }
}

export const atelierStore = new AtelierStore();
