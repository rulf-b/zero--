import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireAuth } from '@/lib/auth-middleware';
import { quoteSchema, idSchema } from '@/lib/validation';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone?: string;
  brand: string;
  model?: string;
  problem: string;
  read: boolean;
  createdAt: string;
}

const QUOTES_PATH = path.join(process.cwd(), 'data', 'quotes.json');

function readQuotes(): Quote[] {
  try {
    const data = fs.readFileSync(QUOTES_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeQuotes(quotes: Quote[]) {
  fs.writeFileSync(QUOTES_PATH, JSON.stringify(quotes, null, 2), 'utf-8');
}

export const GET = requireAuth(async (req) => {
  const quotes = readQuotes();
  // Sort by createdAt descending
  quotes.sort((a: Quote, b: Quote) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  return NextResponse.json(quotes);
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validation = quoteSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Geçersiz veri formatı',
        details: validation.error.issues.map(issue => issue.message)
      }, { status: 400 });
    }
    
    const quotes = readQuotes();
    const newQuote: Quote = {
      ...validation.data,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    quotes.unshift(newQuote);
    writeQuotes(quotes);
    return NextResponse.json({ success: true, quote: newQuote });
  } catch (e) {
    return NextResponse.json({ error: 'Teklif kaydedilemedi.' }, { status: 500 });
  }
}

export const PATCH = requireAuth(async (req) => {
  try {
    const body = await req.json();
    const { id, read } = body;
    
    if (!id || typeof read !== 'boolean') {
      return NextResponse.json({ error: 'Geçersiz parametreler.' }, { status: 400 });
    }
    
    const quotes = readQuotes();
    const idx = quotes.findIndex((q: Quote) => q.id === id);
    if (idx !== -1) {
      quotes[idx].read = read;
      writeQuotes(quotes);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: 404 });
  } catch (e) {
    return NextResponse.json({ error: 'Teklif güncellenemedi.' }, { status: 500 });
  }
});

export const DELETE = requireAuth(async (req) => {
  try {
    const body = await req.json();
    
    const validation = idSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Geçersiz ID formatı.' }, { status: 400 });
    }
    
    const { id } = validation.data;
    let quotes = readQuotes();
    quotes = quotes.filter((q: Quote) => q.id !== id);
    writeQuotes(quotes);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Teklif silinemedi.' }, { status: 500 });
  }
});
