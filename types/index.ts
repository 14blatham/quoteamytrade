// ─── Trade / Service ────────────────────────────────────────────────────────

export type TradeSlug =
  | 'plumbers'
  | 'electricians'
  | 'builders'
  | 'surveyors'
  | 'plasterers'
  | 'painters-decorators'
  | 'roofers'
  | 'joiners-carpenters'
  | 'tilers'
  | 'gas-engineers';

export interface TradeCategory {
  slug: TradeSlug;
  name: string;           // "Plumbers"
  singularName: string;   // "Plumber"
  icon: string;           // emoji or icon identifier
  description: string;
  averageCostFrom: number; // pence
  averageCostTo: number;   // pence
  leadPriceFrom: number;   // pence
  leadPriceTo: number;     // pence
  popularLocations: string[];
  commonServices: string[];
}

export interface ServiceType {
  id: string;
  tradeSlug: TradeSlug;
  name: string;
  description: string;
  typicalDuration: string;
  priceFrom: number; // pence
  priceTo: number;   // pence
}

// ─── Location ───────────────────────────────────────────────────────────────

export interface UKLocation {
  city: string;
  slug: string;
  postcodeDistricts: string[];
  region: string;
  population?: number;
}

export interface PostcodeDistrict {
  code: string;
  area: string;
  city: string;
  region: string;
}

// ─── Supplier ───────────────────────────────────────────────────────────────

export type SupplierStatus = 'active' | 'paused' | 'suspended' | 'pending';
export type VerificationStatus = 'unverified' | 'verified' | 'featured';

export interface SupplierProfile {
  id: string;
  slug: string;
  companyName: string;
  ownerName: string;
  bio: string;
  trades: TradeSlug[];
  coveragePostcodes: string[];
  contact: {
    email: string;
    phone: string;
    website?: string;
    address?: string;
  };
  verification: VerificationStatus;
  status: SupplierStatus;
  leadsEnabled: boolean;
  stats: {
    reviewCount: number;
    averageRating: number; // 0–5 one decimal
    jobsCompleted: number;
    responseTimeHours: number;
    memberSince: string; // ISO date
  };
  pricing: {
    [serviceId: string]: {
      priceFrom: number; // pence
      priceTo: number;   // pence
      leadCost: number;  // pence
    };
  };
  accountBalance: number; // pence
}

export interface SupplierReview {
  id: string;
  supplierId: string;
  customerName: string;
  rating: number; // 1–5
  comment: string;
  serviceType: string;
  location: string;
  date: string; // ISO date
  verified: boolean;
}

// ─── Customer / Quote Request ────────────────────────────────────────────────

export type Urgency = 'emergency' | 'within-week' | 'flexible';
export type PropertyType = 'house' | 'flat' | 'commercial' | 'other';
export type PreferredContact = 'phone' | 'email' | 'either';

export interface QuoteRequest {
  id: string;
  tradeSlug: TradeSlug;
  serviceTypeId: string;
  postcode: string;
  postcodeDistrict: string;
  jobDetails: {
    description: string;
    urgency: Urgency;
    propertyType: PropertyType;
    accessNotes?: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContact: PreferredContact;
  };
  createdAt: string;
  matchedSupplierIds: string[];
}

// ─── Lead ────────────────────────────────────────────────────────────────────

export type LeadStatus = 'new' | 'viewed' | 'contacted' | 'won' | 'lost' | 'refunded';

export interface Lead {
  id: string;
  quoteRequestId: string;
  supplierId: string;
  service: {
    tradeSlug: TradeSlug;
    serviceTypeId: string;
    serviceName: string;
  };
  customer: {
    firstName: string;
    lastInitial: string;
    postcode: string;
    phone?: string;  // only revealed after lead purchase
    email?: string;
  };
  cost: number; // pence
  status: LeadStatus;
  createdAt: string;
  viewedAt?: string;
}

// ─── Billing ─────────────────────────────────────────────────────────────────

export type TransactionType = 'top-up' | 'lead-charge' | 'refund' | 'adjustment';

export interface BillingTransaction {
  id: string;
  supplierId: string;
  type: TransactionType;
  amountPence: number; // positive = credit, negative = debit
  description: string;
  reference?: string;
  createdAt: string;
  balanceAfterPence: number;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  leadsToday: number;
  leadsThisMonth: number;
  accountBalancePence: number;
  activeServicesCount: number;
  activePostcodesCount: number;
  conversionRate: number; // 0–1
}

// ─── Form State ──────────────────────────────────────────────────────────────

export interface QuoteFormState {
  step: 1 | 2 | 3;
  tradeSlug?: TradeSlug;
  serviceTypeId?: string;
  postcode?: string;
  jobDetails?: Partial<QuoteRequest['jobDetails']>;
  contact?: Partial<QuoteRequest['contact']>;
}

// ─── Testimonial ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  trade: string;
  rating: number;
  comment: string;
  date: string;
}
