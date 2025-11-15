export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'minimal' | 'brutalist';
  features: string[];
  preview: string;
  designStyle?: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

export const TEMPLATES: TemplateMetadata[] = [
  {
    id: 'template-a',
    name: 'Modern Professional',
    description: 'Clean and modern design perfect for tech-savvy agents',
    category: 'modern',
    features: ['Responsive design', 'Contact forms', 'Property galleries'],
    preview: '/templates/template-a-preview.jpg',
    designStyle: {
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      fontFamily: 'Inter, sans-serif',
    },
  },
  {
    id: 'template-b',
    name: 'Classic Elegance',
    description: 'Traditional design with a touch of sophistication',
    category: 'classic',
    features: ['Elegant layout', 'Professional styling', 'Lead capture'],
    preview: '/templates/template-b-preview.jpg',
    designStyle: {
      primaryColor: '#1f2937',
      secondaryColor: '#f59e0b',
      fontFamily: 'Georgia, serif',
    },
  },
  {
    id: 'template-c',
    name: 'Minimal Clean',
    description: 'Minimalist approach focusing on content',
    category: 'minimal',
    features: ['Clean design', 'Fast loading', 'Mobile-first'],
    preview: '/templates/template-c-preview.jpg',
    designStyle: {
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
  },
];

export function getTemplateMetadata(id: string): TemplateMetadata | null {
  return TEMPLATES.find(template => template.id === id) || null;
}

export function getTemplatesByCategory(category: TemplateMetadata['category']): TemplateMetadata[] {
  return TEMPLATES.filter(template => template.category === category);
}