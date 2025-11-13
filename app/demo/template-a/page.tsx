'use client';

import TemplateA from '@/lib/templates/template-a';
import { LandingPage } from '@/lib/types';

export default function DemoTemplateAPage() {
  // Sample data for demo
  const demoData: LandingPage = {
    id: 'demo-template-a',
    userId: 'demo',
    pageTitle: 'Find Your Dream Home',
    template: 'template-a',
    agentInfo: {
      name: 'Sarah Wong',
      phone: '+60 12-345 6789',
      email: 'sarah@propertyagent.my',
      whatsapp: '60123456789',
      logoUrl: '',
    },
    branding: {
      primaryColor: '#14b8a6',
      secondaryColor: '#1e3a8a',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#ffffff',
    },
    properties: [
      {
        id: '1',
        title: 'Modern 3-Bedroom Condo in KLCC',
        type: 'Condo',
        price: 1200000,
        location: 'KLCC, Kuala Lumpur',
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1400,
        description: 'Stunning modern condo with panoramic city views, premium finishes, and world-class amenities including infinity pool and gym.',
        photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
        contactInfo: {
          phone: '+60 12-345 6789',
          email: 'sarah@propertyagent.my',
          whatsapp: '60123456789',
        },
      },
      {
        id: '2',
        title: 'Luxury Penthouse with Rooftop Garden',
        type: 'Penthouse',
        price: 3500000,
        location: 'Mont Kiara, KL',
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3800,
        description: 'Exclusive penthouse featuring private rooftop garden, smart home automation, and breathtaking 360-degree views of the city skyline.',
        photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
        contactInfo: {
          phone: '+60 12-345 6789',
          email: 'sarah@propertyagent.my',
          whatsapp: '60123456789',
        },
      },
      {
        id: '3',
        title: 'Spacious Family Home in Damansara',
        type: 'Landed House',
        price: 1850000,
        location: 'Damansara Heights, KL',
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2800,
        description: 'Beautiful double-storey semi-D with spacious garden, modern kitchen, and located in prestigious neighborhood with excellent schools nearby.',
        photos: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
        contactInfo: {
          phone: '+60 12-345 6789',
          email: 'sarah@propertyagent.my',
          whatsapp: '60123456789',
        },
      },
      {
        id: '4',
        title: 'Affordable Studio in Bangsar',
        type: 'Studio',
        price: 450000,
        location: 'Bangsar, KL',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 650,
        description: 'Perfect for young professionals! Cozy studio with modern furnishings, walking distance to LRT, cafes, and shopping centers.',
        photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
        contactInfo: {
          phone: '+60 12-345 6789',
          email: 'sarah@propertyagent.my',
          whatsapp: '60123456789',
        },
      },
      {
        id: '5',
        title: 'Investment Opportunity - Setia Alam',
        type: 'Condo',
        price: 650000,
        location: 'Setia Alam, Selangor',
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1200,
        description: 'High rental yield property in growing township. Well-maintained unit with facilities, near schools and shopping mall.',
        photos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
        contactInfo: {
          phone: '+60 12-345 6789',
          email: 'sarah@propertyagent.my',
          whatsapp: '60123456789',
        },
      },
      {
        id: '6',
        title: 'Waterfront Condo with Pool View',
        type: 'Condo',
        price: 980000,
        location: 'Cyberjaya, Selangor',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1100,
        description: 'Serene waterfront living with beautiful lake views. Perfect for remote workers with high-speed internet and peaceful environment.',
        photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
        contactInfo: {
          phone: '+60 12-345 6789',
          email: 'sarah@propertyagent.my',
          whatsapp: '60123456789',
        },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div>
      <TemplateA data={demoData} />
    </div>
  );
}
