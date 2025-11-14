'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBuilderStore } from '@/lib/store/builder-store';
import { toast } from 'sonner';
import QRCode from 'qrcode';

export default function PublishPage() {
  const router = useRouter();
  const { agentInfo, properties, siteDesign, generatedContent } = useBuilderStore();

  const [subdomain, setSubdomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Pre-fill subdomain with agent name
  useEffect(() => {
    if (agentInfo.fullName && !subdomain) {
      const suggested = agentInfo.fullName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20);
      setSubdomain(suggested);
    }
  }, [agentInfo.fullName]);

  // Check subdomain availability
  const checkAvailability = async () => {
    if (!subdomain || subdomain.length < 3) {
      toast.error('Subdomain must be at least 3 characters');
      return;
    }

    if (!/^[a-z0-9-]+$/.test(subdomain)) {
      toast.error('Subdomain can only contain letters, numbers, and hyphens');
      return;
    }

    setIsChecking(true);
    try {
      // Simulate checking (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For now, assume all subdomains are available
      setIsAvailable(true);
      toast.success('Subdomain is available!');
    } catch (error) {
      toast.error('Error checking availability');
    } finally {
      setIsChecking(false);
    }
  };

  const handlePublish = async () => {
    if (!isAvailable) {
      toast.error('Please check subdomain availability first');
      return;
    }

    setIsPublishing(true);
    try {
      const url = `https://${subdomain}.propsite.my`;

      // Generate QR code
      const qrCode = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
      });
      setQrCodeUrl(qrCode);

      // Simulate publishing (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      setPublishedUrl(url);
      setShowSuccess(true);
      toast.success('Website published successfully!');
    } catch (error) {
      toast.error('Failed to publish website');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(publishedUrl);
    toast.success('URL copied to clipboard!');
  };

  const handleDownloadQR = () => {
    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.download = `${subdomain}-qr-code.png`;
    a.click();
  };

  const handleShareWhatsApp = () => {
    const text = `Check out my professional property website: ${publishedUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Checklist items
  const checklistItems = [
    {
      label: 'Agent information complete',
      checked: agentInfo.fullName && agentInfo.email && agentInfo.phoneNumber && agentInfo.renNumber,
    },
    {
      label: 'Professional bio added',
      checked: agentInfo.bio && agentInfo.bio.length > 50,
    },
    {
      label: 'At least one property added',
      checked: properties.length > 0,
    },
    {
      label: 'Contact details verified',
      checked: agentInfo.whatsapp && agentInfo.email,
    },
  ];

  const allChecksPassed = checklistItems.every(item => item.checked);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white dark:bg-black border border-border-light dark:border-border-dark p-8 md:p-12 text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <span className="material-symbols-outlined text-white text-5xl">check_circle</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-4">
              Your Website is Live!
            </h1>
            <p className="text-lg text-muted-light dark:text-muted-dark mb-8">
              Congratulations! Your professional property website is now published and ready to share.
            </p>
          </div>

          {/* Published URL */}
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded mb-8">
            <label className="block text-sm font-medium text-muted-light dark:text-muted-dark uppercase mb-2">
              Your Website URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={publishedUrl}
                readOnly
                className="flex-1 h-12 px-4 bg-white dark:bg-black border border-border-light dark:border-border-dark rounded"
              />
              <button
                onClick={handleCopyUrl}
                className="px-6 py-3 bg-primary text-white rounded hover:bg-opacity-90 transition-colors"
              >
                <span className="material-symbols-outlined">content_copy</span>
              </button>
            </div>
          </div>

          {/* QR Code */}
          {qrCodeUrl && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-heading-light dark:text-heading-dark uppercase mb-4">
                QR Code
              </h3>
              <div className="bg-white p-6 rounded inline-block mb-4">
                <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
              </div>
              <p className="text-sm text-muted-light dark:text-muted-dark mb-4">
                Share this QR code on business cards, flyers, and social media
              </p>
              <button
                onClick={handleDownloadQR}
                className="px-6 py-3 border-2 border-border-light dark:border-border-dark hover:border-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">download</span>
                  Download QR Code
                </span>
              </button>
            </div>
          )}

          {/* Share Options */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <a
              href={publishedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-6 bg-surface-light dark:bg-surface-dark rounded hover:bg-primary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">visibility</span>
              <span className="text-sm font-medium">View Live Site</span>
            </a>

            <button
              onClick={handleShareWhatsApp}
              className="flex flex-col items-center gap-2 p-6 bg-surface-light dark:bg-surface-dark rounded hover:bg-primary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">chat</span>
              <span className="text-sm font-medium">Share via WhatsApp</span>
            </button>

            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publishedUrl)}`, '_blank')}
              className="flex flex-col items-center gap-2 p-6 bg-surface-light dark:bg-surface-dark rounded hover:bg-primary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">share</span>
              <span className="text-sm font-medium">Share on Facebook</span>
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded mb-8 text-left">
            <h3 className="font-bold text-heading-light dark:text-heading-dark mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">lightbulb</span>
              Next Steps
            </h3>
            <ul className="space-y-2 text-sm text-body-light dark:text-body-dark">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-blue-600 text-base">check</span>
                <span>Add your website URL to your email signature</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-blue-600 text-base">check</span>
                <span>Share the QR code on your business cards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-blue-600 text-base">check</span>
                <span>Post about your new website on social media</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-blue-600 text-base">check</span>
                <span>Add more properties to attract more clients</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-4 btn-brutalist"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.push('/builder/preview')}
              className="px-8 py-4 border-2 border-border-light dark:border-border-dark hover:border-primary transition-colors"
            >
              Edit Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-white dark:bg-black border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/builder/preview')}
                className="flex items-center gap-2 px-4 py-2 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Preview
              </button>
              <div>
                <h1 className="text-2xl font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                  Publish Your Website
                </h1>
                <p className="text-sm text-muted-light dark:text-muted-dark">
                  Final step - Choose your subdomain and go live!
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Pre-publish Checklist */}
        <div className="mb-12">
          <h2 className="text-xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-6">
            Pre-Publish Checklist
          </h2>

          <div className="space-y-3">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded border ${
                  item.checked
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark'
                }`}
              >
                <span className={`material-symbols-outlined text-2xl ${
                  item.checked ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {item.checked ? 'check_circle' : 'cancel'}
                </span>
                <span className="flex-1 font-medium">{item.label}</span>
                {!item.checked && (
                  <button
                    onClick={() => router.push('/builder/create')}
                    className="text-sm text-primary hover:underline"
                  >
                    Fix
                  </button>
                )}
              </div>
            ))}
          </div>

          {!allChecksPassed && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-bold">Note:</span> Please complete all checklist items before publishing.
              </p>
            </div>
          )}
        </div>

        {/* Subdomain Selection */}
        <div className="mb-12">
          <h2 className="text-xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-6">
            Choose Your Website Address
          </h2>

          <div className="bg-white dark:bg-black border border-border-light dark:border-border-dark p-8 rounded">
            <div className="mb-6">
              <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-3">
                Your Subdomain
              </label>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={subdomain}
                    onChange={(e) => {
                      setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                      setIsAvailable(null);
                    }}
                    placeholder="yourname"
                    className="flex-1 h-12 px-4 border border-border-light dark:border-border-dark rounded-l"
                    disabled={isPublishing}
                  />
                  <div className="h-12 px-4 bg-surface-light dark:bg-surface-dark border border-l-0 border-border-light dark:border-border-dark rounded-r flex items-center text-sm text-muted-light dark:text-muted-dark">
                    .propsite.my
                  </div>
                </div>
                <button
                  onClick={checkAvailability}
                  disabled={isChecking || isPublishing || subdomain.length < 3}
                  className="px-6 py-3 bg-primary text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isChecking ? 'Checking...' : 'Check Availability'}
                </button>
              </div>

              {isAvailable === true && (
                <div className="mt-3 flex items-center gap-2 text-green-600">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="text-sm font-medium">Available! You can use this subdomain.</span>
                </div>
              )}

              {isAvailable === false && (
                <div className="mt-3 flex items-center gap-2 text-red-600">
                  <span className="material-symbols-outlined">cancel</span>
                  <span className="text-sm font-medium">Not available. Please try another subdomain.</span>
                </div>
              )}

              <p className="mt-3 text-xs text-muted-light dark:text-muted-dark">
                Your website will be available at: <strong>https://{subdomain || 'yourname'}.propsite.my</strong>
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded">
              <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-2">
                💡 Subdomain Tips
              </h4>
              <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Use your name or agency name for easy recall</li>
                <li>• Keep it short and simple (e.g., "johntan", "sarahlim")</li>
                <li>• Only letters, numbers, and hyphens allowed</li>
                <li>• Cannot start or end with a hyphen</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="mb-12">
          <h2 className="text-xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-6">
            SEO Settings
          </h2>

          <div className="bg-white dark:bg-black border border-border-light dark:border-border-dark p-8 rounded space-y-6">
            <div>
              <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={generatedContent?.seo.title || `${agentInfo.fullName} - Property Agent`}
                readOnly
                className="w-full h-12 px-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded"
              />
              <p className="mt-1 text-xs text-muted-light dark:text-muted-dark">
                This appears in search results and browser tabs
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                Meta Description
              </label>
              <textarea
                value={generatedContent?.seo.description || agentInfo.bio}
                readOnly
                rows={3}
                className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded"
              />
              <p className="mt-1 text-xs text-muted-light dark:text-muted-dark">
                This appears in search results below your page title
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading-light dark:text-heading-dark uppercase mb-2">
                Keywords
              </label>
              <div className="flex flex-wrap gap-2">
                {(generatedContent?.seo.keywords || []).map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePublish}
            disabled={!allChecksPassed || !isAvailable || isPublishing}
            className="px-12 py-4 btn-brutalist text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPublishing ? (
              <span className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Publishing Your Website...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined">rocket_launch</span>
                Publish Website Now
              </span>
            )}
          </button>
        </div>

        {!allChecksPassed && (
          <p className="text-center text-sm text-muted-light dark:text-muted-dark mt-4">
            Complete all checklist items to publish
          </p>
        )}
      </div>
    </div>
  );
}
