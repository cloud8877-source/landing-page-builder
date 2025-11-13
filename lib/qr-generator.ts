// PropertyPage MY - QR Code Generation Utility

import QRCode from 'qrcode';

/**
 * Generate QR code as Data URL for a given URL
 * Returns base64 image string that can be used directly in <img> src
 */
export async function generateQRCode(url: string, size: number = 300): Promise<string> {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: size,
      margin: 2,
      color: {
        dark: '#1e3a8a', // Navy blue (matching PropertyPage MY brand)
        light: '#ffffff',
      },
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Download QR code as PNG file
 */
export function downloadQRCode(dataURL: string, filename: string = 'property-page-qr.png') {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generate and download QR code for a URL
 */
export async function generateAndDownloadQR(url: string, filename?: string) {
  const qrDataURL = await generateQRCode(url);
  downloadQRCode(qrDataURL, filename);
}
