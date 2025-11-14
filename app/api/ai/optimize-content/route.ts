import { NextRequest, NextResponse } from 'next/server';
import geminiService from '@/lib/services/gemini-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, purpose } = body;

    if (!content || !purpose) {
      return NextResponse.json(
        { error: 'Content and purpose are required' },
        { status: 400 }
      );
    }

    // Optimize content
    const optimizedContent = await geminiService.optimizeContent(content, purpose);

    return NextResponse.json({
      success: true,
      optimizedContent
    });

  } catch (error) {
    console.error('Error optimizing content:', error);
    return NextResponse.json(
      { error: 'Failed to optimize content. Please try again.' },
      { status: 500 }
    );
  }
}
