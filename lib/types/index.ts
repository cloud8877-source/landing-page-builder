// User data structure
export interface User {
  id: string;
  email: string;
  name: string;
  displayName?: string; // For backward compatibility
  photoURL?: string;
  createdAt: Date;
  subscription: 'free' | 'pro' | 'enterprise';
  plan?: 'free' | 'pro' | 'enterprise'; // For backward compatibility
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
