export const EXTERNAL_RESOURCES = {
  // CSS resources with integrity hashes
  stylesheets: [
    {
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
      integrity: 'sha384-3B6NwesSXE7YJlcLI9RpRqGf2p/EgVH8BgoKTaUrmKNDkHPStTQ3EyoYjCGXaOTS',
      crossOrigin: 'anonymous' as const,
    },
    // Note: Tailwind CSS is loaded dynamically by GrapesJS, SRI is not supported there
    // It's covered by our CSP instead
  ],

  // JavaScript resources with integrity hashes
  scripts: [
    // Add any external scripts here with their integrity hashes
  ],

  // Allowed domains for CSP
  allowedDomains: [
    'self',
    'www.google.com',
    'www.gstatic.com',
    'apis.google.com',
    'firebase.googleapis.com',
    'firestore.googleapis.com',
    'identitytoolkit.googleapis.com',
    'securetoken.googleapis.com',
    'firebasestorage.googleapis.com',
    '*.googleapis.com',
    '*.googleusercontent.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdn.jsdelivr.net',
    'cdnjs.cloudflare.com',
    'js.stripe.com', // For payment processing
  ],
};

/**
 * Generate a CSP string for external resources
 */
export function generateCSP(): string {
  const domains = EXTERNAL_RESOURCES.allowedDomains.join(' ');

  return [
    `default-src 'self';`,
    `script-src 'self' 'unsafe-eval' 'unsafe-inline' ${domains.includes('www.google.com') ? 'https://www.google.com https://www.gstatic.com https://apis.google.com https://firebase.googleapis.com' : ''};`,
    `style-src 'self' 'unsafe-inline' ${domains.includes('fonts.googleapis.com') ? 'https://fonts.googleapis.com https://cdn.jsdelivr.net' : ''};`,
    `font-src 'self' ${domains.includes('fonts.gstatic.com') ? 'https://fonts.gstatic.com' : ''} data:;`,
    `img-src 'self' data: blob: ${domains.includes('firebasestorage.googleapis.com') ? 'https://firebasestorage.googleapis.com https://*.googleusercontent.com' : ''};`,
    `connect-src 'self' ${domains.includes('firebase.googleapis.com') ? 'https://firebase.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.googleapis.com' : ''};`,
    `frame-src 'self' ${domains.includes('js.stripe.com') ? 'https://js.stripe.com' : ''};`,
    `object-src 'none';`,
    `base-uri 'self';`,
    `form-action 'self';`,
    `frame-ancestors 'none';`,
    `upgrade-insecure-requests;`,
  ].join(' ');
}

/**
 * Validate external resource URL against allowed domains
 */
export function isAllowedResourceUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    // Check against allowed domains
    return EXTERNAL_RESOURCES.allowedDomains.some(allowedDomain => {
      if (allowedDomain === 'self') {
        return false; // self is handled separately
      }
      if (allowedDomain.startsWith('*.')) {
        const baseDomain = allowedDomain.substring(2);
        return hostname.endsWith(baseDomain);
      }
      return hostname === allowedDomain;
    });
  } catch (error) {
    return false;
  }
}

/**
 * Get resource metadata for a given URL
 */
export function getResourceMetadata(url: string) {
  return EXTERNAL_RESOURCES.stylesheets.find(resource => resource.href === url) ||
         null;
}