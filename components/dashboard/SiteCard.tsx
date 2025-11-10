'use client';

import Link from 'next/link';
import { Site } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ExternalLink,
  Edit,
  Trash2,
  Globe,
  Calendar,
  Eye
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SiteCardProps {
  site: Site;
  onDelete: (id: string) => void;
}

export default function SiteCard({ site, onDelete }: SiteCardProps) {
  const siteUrl = `https://${site.subdomain}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
        {/* Preview Thumbnail Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <Building className="h-16 w-16 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-500 font-medium">{site.title}</p>
          </div>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          {site.published && (
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="sm" variant="secondary">
                <Eye className="h-4 w-4 mr-2" />
                View Live
              </Button>
            </a>
          )}
          <Link href={`/builder/${site.id}`}>
            <Button size="sm" variant="secondary">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={site.published ? 'success' : 'secondary'}>
            {site.published ? 'Published' : 'Draft'}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{site.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {site.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Globe className="h-3.5 w-3.5" />
            <span className="truncate">{site.subdomain}</span>
            <span className="text-muted-foreground/50">•</span>
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {site.updatedAt instanceof Date
                ? formatDistanceToNow(site.updatedAt, { addSuffix: true })
                : 'Recently'
              }
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            {site.published && (
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit
                </Button>
              </a>
            )}
            <Link href={`/builder/${site.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(site.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Building({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}
