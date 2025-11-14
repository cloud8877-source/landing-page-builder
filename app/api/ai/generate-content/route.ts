import { NextRequest, NextResponse } from 'next/server';
import geminiService from '@/lib/services/gemini-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentInfo } = body;

    if (!agentInfo) {
      return NextResponse.json(
        { error: 'Agent information is required' },
        { status: 400 }
      );
    }

    // Generate complete landing page content
    const generatedContent = await geminiService.generateLandingPageContent(agentInfo);

    return NextResponse.json({
      success: true,
      content: generatedContent
    });

  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}
