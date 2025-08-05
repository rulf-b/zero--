import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const QUOTES_PATH = path.join(process.cwd(), 'data', 'quotes.json');

function readQuotes() {
  try {
    const data = fs.readFileSync(QUOTES_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeQuotes(quotes: any[]) {
  fs.writeFileSync(QUOTES_PATH, JSON.stringify(quotes, null, 2), 'utf-8');
}

export async function GET(req: NextRequest) {
  const quotes = readQuotes();
  // Sort by createdAt descending
  quotes.sort((a, b) => (b.createdAt || 0).localeCompare(a.createdAt || 0));
  return NextResponse.json(quotes);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const quotes = readQuotes();
  const newQuote = {
    ...data,
    id: Date.now().toString(),
    read: false,
    createdAt: new Date().toISOString(),
  };
  quotes.unshift(newQuote);
  writeQuotes(quotes);
  return NextResponse.json({ success: true, quote: newQuote });
}

export async function PATCH(req: NextRequest) {
  const { id, read } = await req.json();
  const quotes = readQuotes();
  const idx = quotes.findIndex(q => q.id === id);
  if (idx !== -1) {
    quotes[idx].read = read;
    writeQuotes(quotes);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  let quotes = readQuotes();
  quotes = quotes.filter(q => q.id !== id);
  writeQuotes(quotes);
  return NextResponse.json({ success: true });
}
