import { z } from 'zod';

// Agent information schema for validation
export const agentInfoSchema = z.object({
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'\-.,]+$/, 'Full name can only contain letters, spaces, and common punctuation'),
  agencyName: z.string()
    .min(1, 'Agency name is required')
    .max(200, 'Agency name must be less than 200 characters')
    .regex(/^[a-zA-Z0-9\s&'\-.,()]+$/, 'Agency name contains invalid characters'),
  yearsOfExperience: z.number()
    .int('Years of experience must be a whole number')
    .min(0, 'Years of experience cannot be negative')
    .max(50, 'Years of experience must be realistic'),
  licenseNumber: z.string()
    .optional()
    .refine(val => !val || /^[A-Za-z0-9\-\/]+$/.test(val), 'License number can only contain letters, numbers, hyphens, and slashes'),
  specializations: z.array(z.string().max(50))
    .max(10, 'Cannot have more than 10 specializations')
    .optional(),
  languages: z.array(z.string().max(30))
    .max(10, 'Cannot have more than 10 languages')
    .optional(),
  about: z.string()
    .max(1000, 'About section must be less than 1000 characters')
    .optional(),
});

// Property information schema
export const propertyInfoSchema = z.object({
  propertyType: z.enum(['condominium', 'terrace', 'semi-detached', 'bungalow', 'apartment', 'townhouse', 'commercial']),
  title: z.string()
    .min(5, 'Property title must be at least 5 characters')
    .max(200, 'Property title must be less than 200 characters'),
  description: z.string()
    .min(20, 'Property description must be at least 20 characters')
    .max(2000, 'Property description must be less than 2000 characters'),
  price: z.number()
    .positive('Price must be positive')
    .max(100000000, 'Price seems unrealistic'),
  location: z.string()
    .min(3, 'Location is required')
    .max(200, 'Location name is too long'),
  bedrooms: z.number()
    .int('Bedrooms must be a whole number')
    .min(0, 'Bedrooms cannot be negative')
    .max(20, 'Number of bedrooms seems unrealistic'),
  bathrooms: z.number()
    .int('Bathrooms must be a whole number')
    .min(0, 'Bathrooms cannot be negative')
    .max(20, 'Number of bathrooms seems unrealistic'),
  builtUp: z.number()
    .positive('Built-up area must be positive')
    .max(10000, 'Built-up area seems unrealistic'),
  features: z.array(z.string().max(100))
    .max(50, 'Cannot have more than 50 features')
    .optional(),
});

// Content generation schema
export const contentGenerationSchema = z.object({
  type: z.enum(['about', 'services', 'testimonials', 'contact']),
  agentInfo: agentInfoSchema,
  tone: z.enum(['professional', 'friendly', 'formal', 'casual'])
    .default('professional'),
  targetAudience: z.enum(['buyers', 'sellers', 'investors', 'renters', 'all'])
    .default('all'),
  language: z.enum(['english', 'malay', 'both'])
    .default('english'),
});

// Content optimization schema
export const contentOptimizationSchema = z.object({
  content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content is too long for optimization'),
  targetKeywords: z.array(z.string().max(50))
    .max(10, 'Cannot have more than 10 target keywords')
    .optional(),
  goal: z.enum(['engagement', 'conversion', 'seo', 'readability'])
    .default('engagement'),
});

// Bio suggestion schema
export const bioSuggestionSchema = z.object({
  agentInfo: agentInfoSchema,
  focus: z.enum(['professional', 'personal', 'achievements', 'customer-service'])
    .default('professional'),
  length: z.enum(['short', 'medium', 'long'])
    .default('medium'),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z\s'\-.,]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email is too long'),
  phone: z.string()
    .regex(/^[+]?[\d\s\-\(\)]+$/, 'Invalid phone number format')
    .min(10, 'Phone number is too short')
    .max(20, 'Phone number is too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
  pageId: z.string()
    .min(1, 'Page ID is required')
    .max(100, 'Invalid page ID'),
});

// Generic validation function
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Validation failed: ${errorMessages.join(', ')}`);
    }
    throw new Error('Validation failed');
  }
}