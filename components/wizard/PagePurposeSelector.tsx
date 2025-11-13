'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageType } from '@/lib/types';
import { Building2, Users, Tag, BadgeDollarSign, UserCircle } from 'lucide-react';

interface PagePurposeSelectorProps {
  onSelect: (pageType: PageType) => void;
}

const pageTypes = [
  {
    type: 'property-listing' as PageType,
    icon: Building2,
    title: 'Property Listing',
    description: 'Showcase a specific property for sale or rent',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    type: 'buyer-lead-gen' as PageType,
    icon: Users,
    title: 'Buyer Lead Gen',
    description: 'Find buyers for your properties',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
  },
  {
    type: 'seller-lead-gen' as PageType,
    icon: Tag,
    title: 'Seller Lead Gen',
    description: 'Get property owners to list with you',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
  },
  {
    type: 'free-valuation' as PageType,
    icon: BadgeDollarSign,
    title: 'Free Valuation',
    description: 'Capture leads via free property valuation',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
  },
  {
    type: 'agent-profile' as PageType,
    icon: UserCircle,
    title: 'Agent Profile',
    description: 'Personal branding and showcase page',
    color: 'bg-pink-50 border-pink-200',
    iconColor: 'text-pink-600',
  },
];

export default function PagePurposeSelector({ onSelect }: PagePurposeSelectorProps) {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Choose Your Page Purpose</h2>
        <p className="text-muted-foreground text-lg">
          Select the type of landing page you want to create
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageTypes.map((pageType) => {
          const Icon = pageType.icon;
          return (
            <Card
              key={pageType.type}
              className={`${pageType.color} border-2 hover:shadow-lg transition-all cursor-pointer group`}
              onClick={() => onSelect(pageType.type)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className={`w-8 h-8 ${pageType.iconColor}`} />
                </div>
                <CardTitle className="text-xl">{pageType.title}</CardTitle>
                <CardDescription className="text-sm mt-2">
                  {pageType.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(pageType.type);
                  }}
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
