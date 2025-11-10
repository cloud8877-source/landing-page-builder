import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSubdomain(host: string): string | null {
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'localhost:3000';
  const parts = host.replace(baseDomain, '').split('.');

  if (parts.length > 1 && parts[0]) {
    return parts[0];
  }

  return null;
}

export function isValidSubdomain(subdomain: string): boolean {
  const reserved = ['www', 'app', 'admin', 'api', 'blog', 'mail', 'ftp'];
  const regex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

  return !reserved.includes(subdomain.toLowerCase()) && regex.test(subdomain);
}

export function formatWhatsAppNumber(number: string): string {
  // Remove all non-numeric characters
  const cleaned = number.replace(/\D/g, '');

  // Ensure it starts with 60 for Malaysia
  if (cleaned.startsWith('60')) {
    return cleaned;
  } else if (cleaned.startsWith('0')) {
    return '60' + cleaned.substring(1);
  } else {
    return '60' + cleaned;
  }
}

export function generateWhatsAppLink(number: string, message?: string): string {
  const formattedNumber = formatWhatsAppNumber(number);
  const encodedMessage = message ? encodeURIComponent(message) : '';

  return `https://wa.me/${formattedNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

export function formatCurrency(amount: number, currency: 'MYR' = 'MYR'): string {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
