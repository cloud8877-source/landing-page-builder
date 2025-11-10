import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const BILLPLZ_API_KEY = process.env.BILLPLZ_API_KEY || '';
const BILLPLZ_COLLECTION_ID = process.env.BILLPLZ_COLLECTION_ID || '';
const BILLPLZ_X_SIGNATURE_KEY = process.env.BILLPLZ_X_SIGNATURE_KEY || '';
const BILLPLZ_API_URL = 'https://www.billplz-sandbox.com/api/v3'; // Use production URL in production

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, plan, amount, email, name } = body;

    // Validate required fields
    if (!userId || !plan || !amount || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Billplz bill
    const billData = {
      collection_id: BILLPLZ_COLLECTION_ID,
      email: email,
      name: name,
      amount: amount * 100, // Convert to cents
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`,
      description: `Property Builder MY - ${plan.toUpperCase()} Plan`,
      reference_1_label: 'User ID',
      reference_1: userId,
      reference_2_label: 'Plan',
      reference_2: plan,
    };

    const formBody = Object.entries(billData)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    const response = await fetch(`${BILLPLZ_API_URL}/bills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(BILLPLZ_API_KEY + ':').toString('base64')}`,
      },
      body: formBody,
    });

    const billResponse = await response.json();

    if (!response.ok) {
      throw new Error(billResponse.error || 'Billplz API error');
    }

    return NextResponse.json({
      success: true,
      billId: billResponse.id,
      paymentUrl: billResponse.url,
    });
  } catch (error: any) {
    console.error('Error creating Billplz bill:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Webhook callback handler
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const billplzId = searchParams.get('billplz[id]');
    const paid = searchParams.get('billplz[paid]');
    const signature = searchParams.get('billplz[x_signature]');

    if (!billplzId) {
      return NextResponse.json(
        { error: 'Invalid callback' },
        { status: 400 }
      );
    }

    // Verify signature
    const signatureString = `billplzid${billplzId}|billplzpaid${paid}`;
    const expectedSignature = crypto
      .createHmac('sha256', BILLPLZ_X_SIGNATURE_KEY)
      .update(signatureString)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Handle payment success
    if (paid === 'true') {
      // Update user subscription in Firestore
      // This is where you would activate the user's plan
      console.log('Payment successful for bill:', billplzId);
    }

    // Redirect to success/failure page
    const redirectUrl = paid === 'true'
      ? `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`
      : `${process.env.NEXT_PUBLIC_APP_URL}/payment/failed`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error handling payment callback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
