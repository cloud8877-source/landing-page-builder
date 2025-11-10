import { NextRequest, NextResponse } from 'next/server';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { generateWhatsAppLink } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { siteId, name, email, phone, message, propertyInterest } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create lead document
    const leadData = {
      siteId: siteId || 'unknown',
      name,
      email,
      phone,
      message: message || '',
      propertyInterest: propertyInterest || '',
      source: 'landing_page',
      status: 'new',
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'leads'), leadData);

    // Generate WhatsApp notification link (optional)
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_NUMBER;
    const whatsappMessage = `New lead from ${name}!\nEmail: ${email}\nPhone: ${phone}\nInterest: ${propertyInterest}\nMessage: ${message}`;
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
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
