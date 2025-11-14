import { NextRequest, NextResponse } from 'next/server';
import geminiService from '@/lib/services/gemini-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentInfo } = body;

    if (!agentInfo || !agentInfo.fullName) {
      return NextResponse.json(
        { error: 'Agent name is required' },
        { status: 400 }
      );
    }

    // Generate bio
    const bio = await geminiService.generateBio(agentInfo);

    return NextResponse.json({
      success: true,
      bio
    });

  } catch (error) {
    console.error('Error generating bio:', error);
    return NextResponse.json(
      { error: 'Failed to generate bio. Please try again.' },
      { status: 500 }
    );
  }
}
