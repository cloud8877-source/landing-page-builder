'use client';

import TemplateC from '@/lib/templates/template-c';
import { LandingPage } from '@/lib/types';

export default function DemoTemplateCPage() {
  // Sample commercial properties for Template C
  const demoData: LandingPage = {
    id: 'demo-template-c',
    userId: 'demo',
    pageTitle: 'Premium Commercial Spaces',
    template: 'template-c',
    agentInfo: {
      name: 'David Tan & Associates',
      phone: '+60 12-777 8888',
      email: 'david@commercialproperties.my',
      whatsapp: '60127778888',
      logoUrl: '',
    },
    branding: {
      primaryColor: '#64748b',
      secondaryColor: '#ffffff',
      fontFamily: 'DM Sans, sans-serif',
      backgroundColor: '#ffffff',
    },
    properties: [
      {
        id: '1',
        title: 'Grade A Office Tower - Fully Fitted',
        type: 'Office',
        price: 12500000,
        location: 'Jalan Tun Razak, KL',
        bedrooms: 0,
        bathrooms: 4,
        sqft: 8500,
        description: 'Prime office space in prestigious business district. Fully fitted with modern workstations, meeting rooms, pantry, server room. 24/7 access, high-speed fiber internet, ample parking.',
        photos: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
        contactInfo: {
          phone: '+60 12-777 8888',
          email: 'david@commercialproperties.my',
          whatsapp: '60127778888',
        },
      },
      {
        id: '2',
        title: 'Retail Space in High-Traffic Mall',
        type: 'Retail',
        price: 4200000,
        location: 'Mid Valley, KL',
        bedrooms: 0,
        bathrooms: 2,
        sqft: 2800,
        description: 'Ground floor retail unit with excellent visibility and foot traffic. Ideal for F&B, fashion, or service business. Built-in grease trap, 3-phase power, exhaust system.',
        photos: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'],
        contactInfo: {
          phone: '+60 12-777 8888',
          email: 'david@commercialproperties.my',
          whatsapp: '60127778888',
        },
      },
      {
        id: '3',
        title: 'Industrial Warehouse with Loading Bay',
        type: 'Warehouse',
        price: 8900000,
        location: 'Shah Alam, Selangor',
        bedrooms: 0,
        bathrooms: 3,
        sqft: 35000,
        description: 'Detached warehouse facility on 2-acre land. Container height clearance, 4 loading bays, office space, ample parking for trucks. Strategic location near highway.',
        photos: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'],
        contactInfo: {
          phone: '+60 12-777 8888',
          email: 'david@commercialproperties.my',
          whatsapp: '60127778888',
        },
      },
      {
        id: '4',
        title: 'Medical Suites in Healthcare Hub',
        type: 'Medical',
        price: 3500000,
        location: 'Bangsar, KL',
        bedrooms: 0,
        bathrooms: 3,
        sqft: 4200,
        description: 'Purpose-built medical suites in established healthcare center. 6 consultation rooms, reception, waiting area, procedure room. Medical-grade plumbing and electrical.',
        photos: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800'],
        contactInfo: {
          phone: '+60 12-777 8888',
          email: 'david@commercialproperties.my',
          whatsapp: '60127778888',
        },
      },
      {
        id: '5',
        title: 'F&B Restaurant Space - Corner Lot',
        type: 'Restaurant',
        price: 2800000,
        location: 'Publika, KL',
        bedrooms: 0,
        bathrooms: 4,
        sqft: 3500,
        description: 'Premium corner unit with outdoor seating potential. Fully equipped commercial kitchen, dining for 120 pax, bar area, storage. Grease trap, exhaust, cold room installed.',
        photos: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'],
        contactInfo: {
          phone: '+60 12-777 8888',
          email: 'david@commercialproperties.my',
          whatsapp: '60127778888',
        },
      },
      {
        id: '6',
        title: 'Serviced Office - Flexible Terms',
        type: 'Co-Working',
        price: 1500000,
        location: 'The Gardens, KL',
        bedrooms: 0,
        bathrooms: 2,
        sqft: 2200,
        description: 'Turnkey solution for businesses. 15 workstations, meeting room, pantry, reception. Includes internet, utilities, cleaning, security. Professional business address.',
        photos: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'],
        contactInfo: {
          phone: '+60 12-777 8888',
          email: 'david@commercialproperties.my',
          whatsapp: '60127778888',
        },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div>
      <TemplateC data={demoData} />
    </div>
  );
}
