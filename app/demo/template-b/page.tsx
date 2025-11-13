'use client';

import TemplateB from '@/lib/templates/template-b';
import { LandingPage } from '@/lib/types';

export default function DemoTemplateBPage() {
  // Sample luxury properties for Template B
  const demoData: LandingPage = {
    id: 'demo-template-b',
    userId: 'demo',
    pageTitle: 'Exclusive Luxury Properties',
    template: 'template-b',
    agentInfo: {
      name: 'Alexander Chen',
      phone: '+60 12-888 9999',
      email: 'alex@luxuryproperties.my',
      whatsapp: '60128889999',
      logoUrl: '',
    },
    branding: {
      primaryColor: '#fbbf24',
      secondaryColor: '#0f172a',
      fontFamily: 'Playfair Display, serif',
      backgroundColor: '#0f172a',
    },
    properties: [
      {
        id: '1',
        title: 'Ultra-Luxury Penthouse at Four Seasons',
        type: 'Penthouse',
        price: 15800000,
        location: 'KLCC, Kuala Lumpur',
        bedrooms: 6,
        bathrooms: 6,
        sqft: 8500,
        description: 'The pinnacle of luxury living. Exclusive penthouse with private elevator, marble finishes throughout, infinity pool, wine cellar, and unobstructed Twin Towers views. Reserved parking for 6 vehicles.',
        photos: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'],
        contactInfo: {
          phone: '+60 12-888 9999',
          email: 'alex@luxuryproperties.my',
          whatsapp: '60128889999',
        },
      },
      {
        id: '2',
        title: 'Spectacular Waterfront Mansion',
        type: 'Bungalow',
        price: 28500000,
        location: 'Damansara Heights, KL',
        bedrooms: 7,
        bathrooms: 8,
        sqft: 12000,
        description: 'Architectural masterpiece on prime land. Smart home integrated, indoor cinema, gym, spa, infinity pool overlooking lake, 10-car basement parking. Gated & guarded prestigious address.',
        photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
        contactInfo: {
          phone: '+60 12-888 9999',
          email: 'alex@luxuryproperties.my',
          whatsapp: '60128889999',
        },
      },
      {
        id: '3',
        title: 'Designer Duplex at The Troika',
        type: 'Duplex',
        price: 6800000,
        location: 'KLCC, Kuala Lumpur',
        bedrooms: 4,
        bathrooms: 5,
        sqft: 5200,
        description: 'Impeccably designed by award-winning interior designer. Double-height ceilings, Italian marble, Miele kitchen appliances, wine fridge, stunning city panorama. Concierge services.',
        photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
        contactInfo: {
          phone: '+60 12-888 9999',
          email: 'alex@luxuryproperties.my',
          whatsapp: '60128889999',
        },
      },
      {
        id: '4',
        title: 'Contemporary Villa in Country Heights',
        type: 'Villa',
        price: 12500000,
        location: 'Kajang, Selangor',
        bedrooms: 5,
        bathrooms: 6,
        sqft: 9800,
        description: 'Modern tropical paradise. Floor-to-ceiling windows, outdoor entertainment pavilion, temperature-controlled wine cellar, golf course frontage. Unmatched privacy and serenity.',
        photos: ['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800'],
        contactInfo: {
          phone: '+60 12-888 9999',
          email: 'alex@luxuryproperties.my',
          whatsapp: '60128889999',
        },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div>
      <TemplateB data={demoData} />
    </div>
  );
}
