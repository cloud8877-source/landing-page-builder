// User data structure (Agent Profile for PropertyPage MY)
export interface User {
  id: string;
  email: string;
  name: string;
  displayName?: string; // For backward compatibility
  photoURL?: string;
  createdAt: Date;
  subscription: 'free' | 'pro' | 'enterprise';
  plan?: 'free' | 'pro' | 'enterprise'; // For backward compatibility

  // PropertyPage MY - Agent specific fields
  agentName?: string;
  phone?: string; // WhatsApp number
  license?: string; // REA license number
  yearsExperience?: number;
  serviceAreas?: string[];
  brandColors?: {
    primary: string; // Default: #1e3a8a (navy)
    accent: string;  // Default: #d97706 (gold/amber)
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

// Agent contact information
export interface AgentInfo {
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
  logoUrl?: string;
}

// Branding colors
export interface Branding {
  primaryColor: string; // hex color
  secondaryColor: string; // hex color
}

// Property listing structure
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: 'Condo' | 'Apartment' | 'Landed' | 'Commercial';
  description: string;
  photos: string[]; // Array of 5 photo URLs
  contactInfo: {
    phone: string;
    email: string;
    whatsapp: string;
  };
}

// Landing page structure (replaces Site)
export interface LandingPage {
  id: string;
  userId: string; // Owner of the page
  templateId: 'template-a' | 'template-b' | 'template-c';
  pageTitle: string;
  agentInfo: AgentInfo;
  branding: Branding;
  properties: Property[]; // Max 6 properties
  publishedUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  published?: boolean; // For compatibility
}

// Lead capture from landing pages
export interface Lead {
  id: string;
  pageId: string;
  userId: string; // Agent who owns the page
  name: string;
  phone: string;
  email: string;
  message?: string;
  propertyId?: string; // Which property they inquired about
  submittedAt: Date;
  status: 'new' | 'contacted' | 'closed';
}

// Template metadata
export interface TemplateMetadata {
  id: 'template-a' | 'template-b' | 'template-c';
  name: string;
  description: string;
  targetAudience: string;
  thumbnail: string;
  demoUrl?: string;
  previewImages: string[];
  features: string[];
  designStyle: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    backgroundColor: string;
  };
}

// Form data for landing page creation
export interface LandingPageFormData {
  pageTitle: string;
  templateId: 'template-a' | 'template-b' | 'template-c';
  agentInfo: AgentInfo;
  branding: Branding;
  properties: Property[];
}

// Legacy types for backward compatibility
export interface Site extends Omit<LandingPage, 'pageTitle' | 'agentInfo' | 'branding'> {
  subdomain?: string;
  title: string;
  description?: string;
  template: string;
  customDomain?: string;
  htmlContent?: string;
  cssContent?: string;
  jsContent?: string;
  seoMetadata?: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  language?: 'en' | 'ms' | 'zh';
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  billplzSubscriptionId?: string;
  amount: number;
  currency: 'MYR';
}

export interface Translation {
  en: string;
  ms: string;
  zh: string;
}

// PropertyPage MY - New Page Types
export type PageType =
  | 'property-listing'
  | 'buyer-lead-gen'
  | 'seller-lead-gen'
  | 'free-valuation'
  | 'agent-profile';

// PropertyPage structure for PropertyPage MY
export interface PropertyPage {
  id: string;
  userId: string;
  pageType: PageType;
  slug: string; // Unique URL slug (agent-name-property-name-randomid)
  title: string;
  status: 'draft' | 'published';
  data: PropertyListingData | BuyerLeadGenData | SellerLeadGenData | FreeValuationData | AgentProfileData;
  htmlContent: string; // Final generated HTML
  imageURLs: string[]; // Uploaded images from Firebase Storage
  createdAt: Date;
  updatedAt: Date;
  views: number;
}

// Property Listing Form Data
export interface PropertyListingData {
  propertyName: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: string;
  description: string;
  features: string[]; // 6 features
  amenities: string[]; // 3 nearby amenities
  images: File[]; // 6 images to upload
}

// Buyer Lead Gen Form Data
export interface BuyerLeadGenData {
  headline: string;
  serviceAreas: string[];
  featuredProperties?: Array<{
    name: string;
    price: number;
    location: string;
  }>;
  leadFormFields: Array<'name' | 'email' | 'phone' | 'budget' | 'propertyType'>;
}

// Seller Lead Gen Form Data
export interface SellerLeadGenData {
  headline: string;
  recentSalesStats: {
    propertiesSold: number;
    averageDaysToSell: number;
  };
  sellingProcessSteps: string[]; // 3-5 steps
  testimonials: Array<{
    name: string;
    quote: string;
  }>;
}

// Free Valuation Form Data
export interface FreeValuationData {
  headline: string;
  valuationProcessSteps: string[]; // 3 steps
  turnaroundTime: string;
}

// Agent Profile Form Data
export interface AgentProfileData {
  bio: string;
  specializations: string[]; // 3 specializations
  recentlySoldProperties: Array<{
    name: string;
    price: number;
    location: string;
  }>;
  testimonials: Array<{
    name: string;
    quote: string;
    title?: string;
  }>;
  serviceAreas: string[];
}
