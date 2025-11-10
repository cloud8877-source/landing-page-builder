export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  subdomain?: string;
  createdAt: Date;
  plan: 'free' | 'pro' | 'enterprise';
  whatsappNumber?: string;
  language: 'en' | 'ms' | 'zh';
}

export interface Site {
  id: string;
  userId: string;
  subdomain: string;
  title: string;
  description: string;
  template: string;
  customDomain?: string;
  htmlContent: string;
  cssContent: string;
  jsContent: string;
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  language: 'en' | 'ms' | 'zh';
}

export interface Lead {
  id: string;
  siteId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyInterest?: string;
  budget?: string;
  source: string;
  createdAt: Date;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}

export interface PropertyTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'luxury' | 'affordable' | 'commercial' | 'landed' | 'condo';
  htmlContent: string;
  cssContent: string;
  jsContent: string;
  previewImages: string[];
  features: string[];
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
