import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    fs.writeFileSync(brandsFile, JSON.stringify(body, null, 2), 'utf-8');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Markalar kaydedilemedi.' }), { status: 500 });
  }
} 