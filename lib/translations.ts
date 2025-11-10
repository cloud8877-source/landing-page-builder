import { Translation } from './types';

export const translations: Record<string, Translation> = {
  // Navigation
  'nav.home': {
    en: 'Home',
    ms: 'Laman Utama',
    zh: '首页',
  },
  'nav.properties': {
    en: 'Properties',
    ms: 'Hartanah',
    zh: '房产',
  },
  'nav.about': {
    en: 'About',
    ms: 'Tentang',
    zh: '关于',
  },
  'nav.contact': {
    en: 'Contact',
    ms: 'Hubungi',
    zh: '联系',
  },

  // Hero Section
  'hero.title': {
    en: 'Find Your Dream Property in Malaysia',
    ms: 'Cari Hartanah Impian Anda di Malaysia',
    zh: '在马来西亚寻找您的梦想房产',
  },
  'hero.subtitle': {
    en: 'Professional property agent helping you find the perfect home',
    ms: 'Ejen hartanah profesional membantu anda mencari rumah yang sempurna',
    zh: '专业房产经纪人帮您找到完美的家',
  },
  'hero.cta': {
    en: 'View Properties',
    ms: 'Lihat Hartanah',
    zh: '查看房产',
  },

  // Contact Form
  'form.name': {
    en: 'Full Name',
    ms: 'Nama Penuh',
    zh: '全名',
  },
  'form.email': {
    en: 'Email Address',
    ms: 'Alamat E-mel',
    zh: '电子邮件',
  },
  'form.phone': {
    en: 'Phone Number',
    ms: 'Nombor Telefon',
    zh: '电话号码',
  },
  'form.message': {
    en: 'Message',
    ms: 'Mesej',
    zh: '留言',
  },
  'form.submit': {
    en: 'Submit',
    ms: 'Hantar',
    zh: '提交',
  },
  'form.whatsapp': {
    en: 'Contact via WhatsApp',
    ms: 'Hubungi melalui WhatsApp',
    zh: '通过WhatsApp联系',
  },

  // Property Details
  'property.bedrooms': {
    en: 'Bedrooms',
    ms: 'Bilik Tidur',
    zh: '卧室',
  },
  'property.bathrooms': {
    en: 'Bathrooms',
    ms: 'Bilik Air',
    zh: '浴室',
  },
  'property.sqft': {
    en: 'Square Feet',
    ms: 'Kaki Persegi',
    zh: '平方英尺',
  },
  'property.price': {
    en: 'Price',
    ms: 'Harga',
    zh: '价格',
  },
  'property.location': {
    en: 'Location',
    ms: 'Lokasi',
    zh: '位置',
  },

  // Dashboard
  'dashboard.title': {
    en: 'Dashboard',
    ms: 'Papan Pemuka',
    zh: '仪表板',
  },
  'dashboard.sites': {
    en: 'My Sites',
    ms: 'Laman Saya',
    zh: '我的网站',
  },
  'dashboard.leads': {
    en: 'Leads',
    ms: 'Petunjuk',
    zh: '潜在客户',
  },
  'dashboard.analytics': {
    en: 'Analytics',
    ms: 'Analitik',
    zh: '分析',
  },
  'dashboard.settings': {
    en: 'Settings',
    ms: 'Tetapan',
    zh: '设置',
  },

  // Actions
  'action.edit': {
    en: 'Edit',
    ms: 'Edit',
    zh: '编辑',
  },
  'action.delete': {
    en: 'Delete',
    ms: 'Padam',
    zh: '删除',
  },
  'action.publish': {
    en: 'Publish',
    ms: 'Terbitkan',
    zh: '发布',
  },
  'action.unpublish': {
    en: 'Unpublish',
    ms: 'Batal Terbit',
    zh: '取消发布',
  },
  'action.create': {
    en: 'Create New',
    ms: 'Cipta Baru',
    zh: '创建新',
  },
};

export function getTranslation(key: string, lang: 'en' | 'ms' | 'zh'): string {
  return translations[key]?.[lang] || key;
}
