import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const screenTypesFile = path.join(process.cwd(), 'data', 'screen-types.json');

export async function GET(req: NextRequest) {
  try {
    if (fs.existsSync(screenTypesFile)) {
      const data = fs.readFileSync(screenTypesFile, 'utf-8');
      return new Response(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Ekran tipleri okunamadı.' }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    fs.writeFileSync(screenTypesFile, JSON.stringify(body, null, 2), 'utf-8');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Ekran tipleri kaydedilemedi.' }), { status: 500 });
  }
} 