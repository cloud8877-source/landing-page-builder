/**
 * Demo Mode Utilities
 * Allows users to try the landing page builder without authentication
 */

import { LandingPageFormData } from './types';

const DEMO_MODE_KEY = 'demo_mode_active';
const DEMO_DATA_KEY = 'demo_landing_page_data';

/**
 * Check if user is in demo mode
 */
export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEMO_MODE_KEY) === 'true';
}

/**
 * Enable demo mode
 */
export function enableDemoMode(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEMO_MODE_KEY, 'true');
}

/**
 * Disable demo mode
 */
export function disableDemoMode(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(DEMO_MODE_KEY);
  localStorage.removeItem(DEMO_DATA_KEY);
}

/**
 * Save demo landing page data to localStorage
 */
export function saveDemoData(data: LandingPageFormData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEMO_DATA_KEY, JSON.stringify(data));
}

/**
 * Load demo landing page data from localStorage
 */
export function loadDemoData(): LandingPageFormData | null {
  if (typeof window === 'undefined') return null;

  const data = localStorage.getItem(DEMO_DATA_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing demo data:', error);
    return null;
  }
}

/**
 * Clear demo data
 */
export function clearDemoData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(DEMO_DATA_KEY);
}

/**
 * Get demo user object
 */
export function getDemoUser() {
  return {
    id: 'demo-user',
    email: 'demo@example.com',
    name: 'Demo User',
    displayName: 'Demo User',
    subscription: 'free' as const,
    createdAt: new Date(),
  };
}

/**
 * Check if this is a demo session that needs conversion
 */
export function hasDemoDataToConvert(): boolean {
  return isDemoMode() && loadDemoData() !== null;
}

/**
 * Generate demo landing page preview URL
 */
export function getDemoPreviewUrl(data: LandingPageFormData): string {
  // Store data and return preview route
  saveDemoData(data);
  return '/demo/preview';
}
