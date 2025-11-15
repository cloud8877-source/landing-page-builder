import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AgentInfo, GeneratedContent } from '../store/builder-store';
import { envConfig } from '../config/environment';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private cache: Map<string, any> = new Map();
  private isInitialized: boolean = false;

  constructor() {
    this.initializeGemini();
  }

  private initializeGemini() {
    try {
      // Get API key from centralized environment configuration
      const apiKey = envConfig.apis.gemini;

      if (!apiKey) {
        console.warn('Gemini API key not found. AI features will be disabled.');
        console.warn('To enable AI features, set GEMINI_API_KEY environment variable.');
        this.isInitialized = false;
        return;
      }

      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      this.isInitialized = true;
      console.log('Gemini AI service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Gemini service:', error);
      this.isInitialized = false;
    }
  }

  private getCacheKey(type: string, data: any): string {
    return `${type}-${JSON.stringify(data)}`;
  }

  async generateLandingPageContent(
    agentInfo: Partial<AgentInfo>
  ): Promise<GeneratedContent> {
    // Check if Gemini is initialized
    if (!this.isInitialized || !this.model) {
      console.warn('Gemini service not initialized, returning default content');
      console.warn('To enable AI generation, set GEMINI_API_KEY in your environment variables');
      return this.getDefaultContent(agentInfo);
    }

    const cacheKey = this.getCacheKey('landing-page', agentInfo);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const prompt = `You are creating a professional property agent website for the Malaysian market.

Agent Details:
- Name: ${agentInfo.fullName || 'Property Agent'}
- Agency: ${agentInfo.agencyName || 'Real Estate Agency'}
- Experience: ${agentInfo.yearsOfExperience || 0} years
- Specialization: ${agentInfo.specialization || 'properties'}
- Areas: ${agentInfo.areasOfCoverage?.join(', ') || 'Malaysia'}
- Languages: ${agentInfo.languages?.join(', ') || 'English, Malay'}
- REN: ${agentInfo.renNumber || 'RENXXXXX'}

Generate the following in JSON format:

{
  "hero": {
    "headline": "Compelling headline (max 10 words) that emphasizes trust and local expertise",
    "subheadline": "Supporting text (max 20 words) highlighting unique value proposition",
    "ctaText": "Clear call to action"
  },
  "about": {
    "bio": "Professional bio (150 words) that builds trust and showcases experience in Malaysian property market",
    "achievements": ["Achievement 1", "Achievement 2", "Achievement 3"],
    "whyChooseMe": ["Reason 1", "Reason 2", "Reason 3"]
  },
  "services": [
    {
      "title": "Service name",
      "description": "Service description (30 words)",
      "icon": "icon-name"
    }
  ],
  "testimonials": [
    {
      "name": "Malaysian name",
      "text": "Realistic testimonial text",
      "rating": 5,
      "propertyType": "Condo/Landed/etc"
    }
  ],
  "seo": {
    "title": "SEO optimized title with location and specialization",
    "description": "Meta description (150 chars)",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  }
}

Make it professional, trustworthy, and culturally appropriate for Malaysian market. Include local property terminology like "freehold", "leasehold", "built-up", "land area". Use Malaysian locations and context. Generate 6 services and 3 testimonials. Return ONLY valid JSON.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;

      const content = JSON.parse(jsonStr);

      // Validate and set defaults
      const generatedContent: GeneratedContent = {
        hero: content.hero || {
          headline: 'Your Trusted Property Agent',
          subheadline: 'Finding Your Dream Home in Malaysia',
          ctaText: 'Contact Me Today',
        },
        about: content.about || {
          bio: agentInfo.bio || 'Professional property agent serving the Malaysian market.',
          achievements: ['Licensed Property Agent', 'Years of Experience', 'Satisfied Clients'],
          whyChooseMe: ['Local Expertise', 'Personalized Service', 'Results Driven'],
        },
        services: content.services || [
          { title: 'Property Sales', description: 'Expert assistance in buying and selling properties', icon: 'home' },
          { title: 'Property Rental', description: 'Find the perfect rental property for you', icon: 'key' },
          { title: 'Property Investment', description: 'Investment advice for property buyers', icon: 'trending-up' },
          { title: 'Property Valuation', description: 'Accurate market valuations', icon: 'calculator' },
          { title: 'Legal Assistance', description: 'Guidance through legal processes', icon: 'file-text' },
          { title: 'Market Analysis', description: 'Comprehensive market insights', icon: 'bar-chart' },
        ],
        testimonials: content.testimonials || [
          {
            name: 'Ahmad Ibrahim',
            text: 'Excellent service and very professional. Helped me find my dream condo.',
            rating: 5,
            propertyType: 'Condo',
          },
          {
            name: 'Sarah Tan',
            text: 'Very knowledgeable about the market. Made the process smooth and easy.',
            rating: 5,
            propertyType: 'Landed',
          },
          {
            name: 'Raj Kumar',
            text: 'Highly recommended! Found us the perfect family home.',
            rating: 5,
            propertyType: 'Terrace House',
          },
        ],
        seo: content.seo || {
          title: `${agentInfo.fullName || 'Property Agent'} - ${agentInfo.areasOfCoverage?.join(', ') || 'Malaysia'}`,
          description: `Professional property agent specializing in ${agentInfo.specialization || 'residential and commercial'} properties`,
          keywords: ['property agent', 'real estate', 'Malaysia', ...(agentInfo.areasOfCoverage || [])],
        },
      };

      this.cache.set(cacheKey, generatedContent);
      return generatedContent;
      } catch (error) {
      console.error('Error generating content:', error);
      return this.getDefaultContent(agentInfo);
    }
  }

  private getDefaultContent(agentInfo: Partial<AgentInfo>): GeneratedContent {
    return {
      hero: {
        headline: 'Your Trusted Property Agent',
        subheadline: 'Finding Your Dream Home in Malaysia',
        ctaText: 'Contact Me Today',
      },
      about: {
        bio: agentInfo.bio || 'Professional property agent serving the Malaysian market with expertise in residential and commercial properties.',
        achievements: ['Licensed Property Agent', `${agentInfo.yearsOfExperience || 0}+ Years Experience`, 'Satisfied Clients'],
        whyChooseMe: ['Local Market Expertise', 'Personalized Service', 'Results Driven'],
      },
      services: [
        { title: 'Property Sales', description: 'Expert assistance in buying and selling properties', icon: 'home' },
        { title: 'Property Rental', description: 'Find the perfect rental property for you', icon: 'key' },
        { title: 'Property Investment', description: 'Investment advice for property buyers', icon: 'trending-up' },
        { title: 'Property Valuation', description: 'Accurate market valuations', icon: 'calculator' },
        { title: 'Legal Assistance', description: 'Guidance through legal processes', icon: 'file-text' },
        { title: 'Market Analysis', description: 'Comprehensive market insights', icon: 'bar-chart' },
      ],
      testimonials: [
        {
          name: 'Ahmad Ibrahim',
          text: 'Excellent service and very professional. Helped me find my dream condo.',
          rating: 5,
          propertyType: 'Condo',
        },
        {
          name: 'Sarah Tan',
          text: 'Very knowledgeable about the market. Made the process smooth and easy.',
          rating: 5,
          propertyType: 'Landed',
        },
        {
          name: 'Raj Kumar',
          text: 'Highly recommended! Found us the perfect family home.',
          rating: 5,
          propertyType: 'Terrace House',
        },
      ],
      seo: {
        title: `${agentInfo.fullName || 'Property Agent'} - ${agentInfo.areasOfCoverage?.join(', ') || 'Malaysia'}`,
        description: `Professional property agent specializing in ${agentInfo.specialization || 'residential and commercial'} properties`,
        keywords: ['property agent', 'real estate', 'Malaysia', ...(agentInfo.areasOfCoverage || [])],
      },
    };
  }

  async generateBio(agentInfo: Partial<AgentInfo>): Promise<string> {
    const cacheKey = this.getCacheKey('bio', agentInfo);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const prompt = `Write a professional bio (150 words) for a Malaysian property agent with these details:

Name: ${agentInfo.fullName || 'Property Agent'}
Agency: ${agentInfo.agencyName || 'Real Estate Agency'}
Experience: ${agentInfo.yearsOfExperience || 0} years
Specialization: ${agentInfo.specialization || 'residential and commercial properties'}
Areas: ${agentInfo.areasOfCoverage?.join(', ') || 'various areas in Malaysia'}
Languages: ${agentInfo.languages?.join(', ') || 'English and Malay'}

Make it professional, trustworthy, and culturally appropriate for Malaysian market. Focus on expertise, commitment to clients, and local market knowledge. Return only the bio text, no additional formatting.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const bio = response.text().trim();

      this.cache.set(cacheKey, bio);
      return bio;
    } catch (error) {
      console.error('Error generating bio:', error);
      throw new Error('Failed to generate bio. Please try again.');
    }
  }

  async generateTagline(agentInfo: Partial<AgentInfo>): Promise<string> {
    const cacheKey = this.getCacheKey('tagline', agentInfo);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const prompt = `Create a catchy, professional tagline (max 10 words) for a Malaysian property agent:

Name: ${agentInfo.fullName || 'Property Agent'}
Specialization: ${agentInfo.specialization || 'properties'}
Areas: ${agentInfo.areasOfCoverage?.join(', ') || 'Malaysia'}

The tagline should be memorable, professional, and emphasize trust and local expertise. Return only the tagline, no quotes or additional text.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const tagline = response.text().trim().replace(/['"]/g, '');

      this.cache.set(cacheKey, tagline);
      return tagline;
    } catch (error) {
      console.error('Error generating tagline:', error);
      throw new Error('Failed to generate tagline. Please try again.');
    }
  }

  async generatePropertyDescription(property: {
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    propertyType: string;
    features?: string[];
  }): Promise<string> {
    const prompt = `Write an engaging property description (100 words) for this Malaysian property:

Title: ${property.title}
Type: ${property.propertyType}
Location: ${property.location}
Price: RM ${property.price.toLocaleString()}
Size: ${property.sqft} sqft
Bedrooms: ${property.bedrooms}
Bathrooms: ${property.bathrooms}
Features: ${property.features?.join(', ') || 'Standard features'}

Write in a professional yet engaging style that highlights the property's best features and location benefits. Use Malaysian property terminology. Return only the description.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error generating property description:', error);
      throw new Error('Failed to generate description. Please try again.');
    }
  }

  async optimizeContent(content: string, purpose: string): Promise<string> {
    const prompt = `Optimize this content for ${purpose} in the Malaysian property market context:

${content}

Make it more engaging, professional, and SEO-friendly while maintaining authenticity. Keep the same length. Return only the optimized content.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error optimizing content:', error);
      throw new Error('Failed to optimize content. Please try again.');
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export default new GeminiService();
