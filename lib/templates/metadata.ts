import { TemplateMetadata } from '@/lib/types';

export const TEMPLATE_METADATA: Record<string, TemplateMetadata> = {
  'template-a': {
    id: 'template-a',
    name: 'Clean & Functional',
    description: 'Similar to PropertyGuru/iProperty but simplified. Perfect for general property listings.',
    targetAudience: 'Broad Audience - All property types',
    thumbnail: '/templates/template-a-thumb.png',
    demoUrl: '/demo/template-a',
    previewImages: [
      '/templates/template-a-preview-1.png',
      '/templates/template-a-preview-2.png',
    ],
    features: [
      'Clean white background',
      'Property grid layout (3 columns)',
      'Search and filter bar',
      'Mobile responsive',
      'Contact form integrated',
    ],
    designStyle: {
      primaryColor: '#14b8a6', // Teal
      secondaryColor: '#1e3a8a', // Navy blue
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#ffffff',
    },
  },
  'template-b': {
    id: 'template-b',
    name: 'Polished & Service-Oriented',
    description: 'Sophisticated luxury feel with gold accents. Ideal for high-end properties and niche markets.',
    targetAudience: 'Niche Market - Luxury & Premium Properties',
    thumbnail: '/templates/template-b-thumb.png',
    demoUrl: '/demo/template-b',
    previewImages: [
      '/templates/template-b-preview-1.png',
      '/templates/template-b-preview-2.png',
    ],
    features: [
      'Dark navy background with gold accents',
      'Large featured property cards',
      'Testimonials section',
      'VIP service emphasis',
      'Elegant typography',
    ],
    designStyle: {
      primaryColor: '#fbbf24', // Gold
      secondaryColor: '#0f172a', // Dark navy
      fontFamily: 'Playfair Display, serif',
      backgroundColor: '#0f172a',
    },
  },
  'template-c': {
    id: 'template-c',
    name: 'Corporate & Minimalist',
    description: 'Ultra-clean with geometric shapes. Perfect for commercial properties and corporate clients.',
    targetAudience: 'Commercial Properties - Office, Retail, Industrial',
    thumbnail: '/templates/template-c-thumb.png',
    demoUrl: '/demo/template-c',
    previewImages: [
      '/templates/template-c-preview-1.png',
      '/templates/template-c-preview-2.png',
    ],
    features: [
      'Minimalist design with lots of white space',
      'List view layout with specifications',
      'Interactive location map',
      'Download brochure CTA',
      'Clean gray and white palette',
    ],
    designStyle: {
      primaryColor: '#64748b', // Gray
      secondaryColor: '#ffffff', // White
      fontFamily: 'DM Sans, sans-serif',
      backgroundColor: '#ffffff',
    },
  },
};

export function getTemplateMetadata(templateId: string): TemplateMetadata {
  return TEMPLATE_METADATA[templateId] || TEMPLATE_METADATA['template-a'];
}

export function getAllTemplates(): TemplateMetadata[] {
  return Object.values(TEMPLATE_METADATA);
}
