import { luxuryCondoTemplate } from './luxury-condo';
import { affordableHousingTemplate } from './affordable-housing';

export const templates = {
  'luxury-condo': luxuryCondoTemplate,
  'affordable-housing': affordableHousingTemplate,
  'commercial': {
    html: '<section class="bg-gray-900 text-white py-20"><div class="container mx-auto px-4 text-center"><h1 class="text-5xl font-bold mb-4">Premium Commercial Space</h1><p class="text-xl mb-8">Strategic location for your business</p></div></section>',
    css: '* { margin: 0; padding: 0; box-sizing: border-box; }',
  },
  'landed': {
    html: '<section class="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-20"><div class="container mx-auto px-4 text-center"><h1 class="text-5xl font-bold mb-4">Landed Property Paradise</h1><p class="text-xl mb-8">Your dream terrace or bungalow awaits</p></div></section>',
    css: '* { margin: 0; padding: 0; box-sizing: border-box; }',
  },
  'serviced-apartment': {
    html: '<section class="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20"><div class="container mx-auto px-4 text-center"><h1 class="text-5xl font-bold mb-4">Fully Serviced Apartments</h1><p class="text-xl mb-8">Move in ready, hassle-free living</p></div></section>',
    css: '* { margin: 0; padding: 0; box-sizing: border-box; }',
  },
};

export function getTemplate(templateId: string) {
  return templates[templateId as keyof typeof templates] || templates['luxury-condo'];
}
