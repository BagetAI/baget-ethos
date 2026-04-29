import { NextRequest, NextResponse } from 'next/server';
import { vetProduct } from '../../../lib/vetting-engine';

/**
 * API Endpoint for Product Vetting
 * POST /api/vet { "url": "..." }
 */
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !url.startsWith('http')) {
      return NextResponse.json({ error: 'Valid URL is required' }, { status: 400 });
    }

    const report = await vetProduct(url);

    return NextResponse.json(report);
  } catch (error) {
    console.error('Vetting API Error:', error);
    return NextResponse.json({ error: 'Failed to process vetting request' }, { status: 500 });
  }
}

/**
 * GET support for quick testing in browser
 * /api/vet?url=...
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const report = await vetProduct(url);
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process vetting request' }, { status: 500 });
  }
}
