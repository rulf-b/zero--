import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireAuth } from '@/lib/auth-middleware';

const brandsFile = path.join(process.cwd(), 'data', 'brands.json');

export async function GET(req: NextRequest) {
  try {
    const data = fs.readFileSync(brandsFile, 'utf-8');
    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Markalar okunamadı.' }), { status: 500 });
  }
}

export const POST = requireAuth(async (req) => {
  try {
    const body = await req.json();
    
    // Basic validation
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Geçersiz veri formatı.' }, { status: 400 });
    }
    
    fs.writeFileSync(brandsFile, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Markalar kaydedilemedi.' }, { status: 500 });
  }
}); 