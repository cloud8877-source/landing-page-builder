'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Copy, Download, Share2 } from 'lucide-react';
import { generateQRCode, downloadQRCode } from '@/lib/qr-generator';
import Link from 'next/link';

interface SuccessPageProps {
  slug: string;
  pageTitle: string;
}

export default function SuccessPage({ slug, pageTitle }: SuccessPageProps) {
  const [qrCode, setQrCode] = useState('');
  const [copied, setCopied] = useState(false);

  const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const pageURL = `${baseURL}/p/${slug}`;

  useEffect(() => {
    async function loadQRCode() {
      const qr = await generateQRCode(pageURL);
      setQrCode(qr);
    }
    loadQRCode();
  }, [pageURL]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (qrCode) {
      downloadQRCode(qrCode, `${slug}-qr-code.png`);
    }
  };

  const shareViaWhatsApp = () => {
    const message = `Check out this property: ${pageTitle}\n${pageURL}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out: ${pageTitle}`);
    const body = encodeURIComponent(
      `I wanted to share this property listing with you:\n\n${pageTitle}\n\n${pageURL}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-4xl font-bold mb-2">Your Landing Page is Live!</h2>
        <p className="text-muted-foreground text-lg">
          Share your property listing with the world
        </p>
      </div>

      {/* URL Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Your Page URL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input value={pageURL} readOnly className="font-mono text-sm" />
            <Button onClick={copyToClipboard} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && <p className="text-sm text-green-600">Copied to clipboard!</p>}

          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <Link href={`/p/${slug}`} target="_blank">
                View Page
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">QR Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {qrCode ? (
            <div className="text-center">
              <div className="inline-block p-4 bg-white rounded-lg border">
                <img src={qrCode} alt="QR Code" className="w-64 h-64" />
              </div>
              <p className="text-sm text-muted-foreground mt-3 mb-4">
                Scan this QR code to view the landing page
              </p>
              <Button onClick={handleDownloadQR} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Generating QR code...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Share Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Share Your Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={shareViaWhatsApp} variant="outline" className="w-full justify-start">
            <Share2 className="mr-2 h-4 w-4" />
            Share via WhatsApp
          </Button>
          <Button onClick={shareViaEmail} variant="outline" className="w-full justify-start">
            <Share2 className="mr-2 h-4 w-4" />
            Share via Email
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Link href="/builder/create">
          <Button size="lg" variant="default">
            Create Another Page
          </Button>
        </Link>
      </div>
    </div>
  );
}
