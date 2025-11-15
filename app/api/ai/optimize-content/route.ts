import { NextRequest, NextResponse } from 'next/server';
import geminiService from '@/lib/services/gemini-service';
import { validateInput, contentOptimizationSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Map the API interface to our schema
    const validationData = {
      content: body.content,
      targetKeywords: body.targetKeywords || [],
      goal: body.goal || 'engagement'
    };

    // Validate input using Zod schema
    const validatedData = validateInput(contentOptimizationSchema, validationData);

    // Optimize content
    const optimizedContent = await geminiService.optimizeContent(
      validatedData.content,
      body.purpose || 'general'
    );

    return NextResponse.json({
      success: true,
      optimizedContent
    });

  } catch (error) {
    console.error('Error optimizing content:', error);

    // Handle validation errors separately
    if (error instanceof Error && error.message.includes('Validation failed')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to optimize content. Please try again.' },
      { status: 500 }
    );
  }
}
