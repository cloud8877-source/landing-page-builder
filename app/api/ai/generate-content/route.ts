import { NextRequest, NextResponse } from 'next/server';
import geminiService from '@/lib/services/gemini-service';
import { validateInput, contentGenerationSchema } from '@/lib/validation/schemas';
import { withRateLimitMiddleware, RATE_LIMIT_CONFIGS } from '@/lib/middleware/rate-limit';

export async function POST(request: NextRequest) {
  return withRateLimitMiddleware(async (req: NextRequest) => {
    try {
      const body = await req.json();

      // Validate input using Zod schema
      const validatedData = validateInput(contentGenerationSchema, body);

      // Generate complete landing page content
      const generatedContent = await geminiService.generateLandingPageContent(validatedData.agentInfo);

      return NextResponse.json({
        success: true,
        content: generatedContent
      });

    } catch (error) {
      console.error('Error generating content:', error);

      // Handle validation errors separately
      if (error instanceof Error && error.message.includes('Validation failed')) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to generate content. Please try again.' },
        { status: 500 }
      );
    }
  }, RATE_LIMIT_CONFIGS.AI_GENERATE)(request);
}
