import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const targetUrl = searchParams.get('url');

  if (!id || !targetUrl) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const userAgent = request.headers.get('user-agent') || '';
  const referrer = request.headers.get('referer') || 'direct';
  
  // LLM Bot check
  const llmBots = ['OAI-SearchBot', 'PerplexityBot', 'ChatGPT-User', 'ClaudeBot', 'Googlebot'];
  const isLLM = llmBots.some(bot => userAgent.includes(bot));

  try {
    // Log to ClickTracking database
    await fetch('https://app.baget.ai/api/public/databases/42504779-a0dc-48d7-b2cb-e7b030669885/rows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          product_id: id,
          timestamp: new Date().toISOString(),
          referral_source: referrer,
          is_llm_referral: isLLM,
          user_agent: userAgent
        }
      })
    });
  } catch (error) {
    console.error('Tracking failed:', error);
  }

  // Redirect to affiliate URL
  return NextResponse.redirect(targetUrl);
}
