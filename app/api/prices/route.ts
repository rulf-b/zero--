import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const pricesFile = path.join(process.cwd(), 'data', 'prices.json');

export async function GET(req: NextRequest) {
  try {
    const data = fs.readFileSync(pricesFile, 'utf-8');
    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Fiyatlar okunamadı.' }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    fs.writeFileSync(pricesFile, JSON.stringify(body, null, 2), 'utf-8');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Fiyatlar kaydedilemedi.' }), { status: 500 });
  }
} 