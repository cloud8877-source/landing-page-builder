import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AgentInfo {
  fullName: string;
  agencyName: string;
  phoneNumber: string;
  email: string;
  whatsapp: string;
  renNumber: string;
  specialization: 'residential' | 'commercial' | 'both' | '';
  areasOfCoverage: string[];
  yearsOfExperience: number;
  languages: string[];
  bio: string;
  tagline: string;
  profilePhoto: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  description: string;
  images: string[];
  features: string[];
  furnishing: 'unfurnished' | 'partial' | 'fully' | '';
  parking: number;
}

export interface SiteDesign {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  heroStyle: 'modern' | 'classic' | 'minimal';
  layout: 'single-page' | 'multi-section';
}

export interface GeneratedContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  about: {
    bio: string;
    achievements: string[];
    whyChooseMe: string[];
  };
  services: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
    propertyType: string;
  }>;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

interface BuilderStore {
  // Agent Information
  agentInfo: AgentInfo;
  setAgentInfo: (info: Partial<AgentInfo>) => void;

  // Properties
  properties: Property[];
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  removeProperty: (id: string) => void;

  // Site Design
  siteDesign: SiteDesign;
  updateDesign: (design: Partial<SiteDesign>) => void;

  // Generated Content
  generatedContent: GeneratedContent | null;
  setGeneratedContent: (content: GeneratedContent | null) => void;

  // Workflow State
  currentStep: 'info' | 'properties' | 'preview' | 'publish';
  setCurrentStep: (step: 'info' | 'properties' | 'preview' | 'publish') => void;

  // Form Progress
  formProgress: number;
  calculateProgress: () => void;

  // Reset
  resetBuilder: () => void;
}

const initialAgentInfo: AgentInfo = {
  fullName: '',
  agencyName: '',
  phoneNumber: '',
  email: '',
  whatsapp: '',
  renNumber: '',
  specialization: '',
  areasOfCoverage: [],
  yearsOfExperience: 0,
  languages: [],
  bio: '',
  tagline: '',
  profilePhoto: '',
};

const initialSiteDesign: SiteDesign = {
  primaryColor: '#2563eb',
  secondaryColor: '#1e40af',
  fontFamily: 'Inter',
  heroStyle: 'modern',
  layout: 'single-page',
};

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
      // Initial State
      agentInfo: initialAgentInfo,
      properties: [],
      siteDesign: initialSiteDesign,
      generatedContent: null,
      currentStep: 'info',
      formProgress: 0,

      // Agent Info Actions
      setAgentInfo: (info) => {
        set((state) => ({
          agentInfo: { ...state.agentInfo, ...info },
        }));
        get().calculateProgress();
      },

      // Property Actions
      addProperty: (property) => {
        set((state) => ({
          properties: [...state.properties, property],
        }));
      },

      updateProperty: (id, updates) => {
        set((state) => ({
          properties: state.properties.map((prop) =>
            prop.id === id ? { ...prop, ...updates } : prop
          ),
        }));
      },

      removeProperty: (id) => {
        set((state) => ({
          properties: state.properties.filter((prop) => prop.id !== id),
        }));
      },

      // Design Actions
      updateDesign: (design) => {
        set((state) => ({
          siteDesign: { ...state.siteDesign, ...design },
        }));
      },

      // Generated Content Actions
      setGeneratedContent: (content) => {
        set({ generatedContent: content });
      },

      // Workflow Actions
      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      // Progress Calculation
      calculateProgress: () => {
        const { agentInfo } = get();
        let progress = 0;
        const requiredFields = [
          'fullName',
          'agencyName',
          'phoneNumber',
          'email',
          'whatsapp',
          'renNumber',
          'specialization',
        ];

        requiredFields.forEach((field) => {
          if (agentInfo[field as keyof AgentInfo]) {
            progress += 100 / requiredFields.length;
          }
        });

        if (agentInfo.areasOfCoverage.length > 0) progress += 10;
        if (agentInfo.languages.length > 0) progress += 10;
        if (agentInfo.bio) progress += 10;

        set({ formProgress: Math.min(progress, 100) });
      },

      // Reset
      resetBuilder: () => {
        set({
          agentInfo: initialAgentInfo,
          properties: [],
          siteDesign: initialSiteDesign,
          generatedContent: null,
          currentStep: 'info',
          formProgress: 0,
        });
      },
    }),
    {
      name: 'builder-storage',
      partialize: (state) => ({
        agentInfo: state.agentInfo,
        properties: state.properties,
        siteDesign: state.siteDesign,
        generatedContent: state.generatedContent,
        currentStep: state.currentStep,
      }),
    }
  )
);
