import { NextRequest, NextResponse } from 'next/server';
import geminiService from '@/lib/services/gemini-service';
import { validateInput, bioSuggestionSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Map the API interface to our schema
    const validationData = {
      agentInfo: body.agentInfo,
      focus: body.focus || 'professional',
      length: body.length || 'medium'
    };

    // Validate input using Zod schema
    const validatedData = validateInput(bioSuggestionSchema, validationData);

    // Generate bio
    const bio = await geminiService.generateBio(validatedData.agentInfo);

    return NextResponse.json({
      success: true,
      bio
    });

  } catch (error) {
    console.error('Error generating bio:', error);

    // Handle validation errors separately
    if (error instanceof Error && error.message.includes('Validation failed')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate bio. Please try again.' },
      { status: 500 }
    );
  }
}
