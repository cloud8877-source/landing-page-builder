import { NextRequest, NextResponse } from 'next/server';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { generateWhatsAppLink } from '@/lib/utils';
import { validateInput, contactFormSchema } from '@/lib/validation/schemas';
import { withRateLimitMiddleware, RATE_LIMIT_CONFIGS } from '@/lib/middleware/rate-limit';

export async function POST(request: NextRequest) {
  return withRateLimitMiddleware(async (req: NextRequest) => {
    try {
      const body = await req.json();

    // Map the API interface to our schema
    const validationData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message || 'No message provided',
      pageId: body.pageId || body.siteId || 'unknown'
    };

    // Validate input using Zod schema
    const validatedData = validateInput(contactFormSchema, validationData);

    // Create lead document with validated data
    const leadData = {
      siteId: validatedData.pageId,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
      propertyInterest: body.propertyInterest || '',
      source: 'landing_page',
      status: 'new',
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'leads'), leadData);

    // Generate WhatsApp notification link (optional)
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_NUMBER;
    const whatsappMessage = `New lead from ${validatedData.name}!\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone}\nInterest: ${body.propertyInterest}\nMessage: ${validatedData.message}`;
    const whatsappLink = whatsappNumber
      ? generateWhatsAppLink(whatsappNumber, whatsappMessage)
      : null;

    return NextResponse.json({
      success: true,
      leadId: docRef.id,
      whatsappLink,
    });
  } catch (error) {
    console.error('Error creating lead:', error);

    // Handle validation errors separately
    if (error instanceof Error && error.message.includes('Validation failed')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

      return NextResponse.json(
      { error: 'Failed to create lead. Please try again.' },
      { status: 500 }
    );
  }
}, RATE_LIMIT_CONFIGS.CONTACT_FORM)(request);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const siteId = searchParams.get('siteId');

    if (!siteId) {
      return NextResponse.json(
        { error: 'Site ID is required' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Verify the user is authenticated
    // 2. Check if the user owns the site
    // 3. Query leads for that site

    return NextResponse.json({
      leads: [],
      message: 'Implement authentication and query logic',
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
