import { NextRequest } from 'next/server';
import type { NextApiRequest } from 'next';
import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'data', 'admin2-log.json');

export async function GET(req: NextRequest) {
  try {
    const logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    return new Response(JSON.stringify(logs), { status: 200 });
  } catch (e) {
    return new Response('[]', { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  let logs = [];
  try {
    logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
  } catch {}
  // Get IP address
  let ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
  if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();
  // Prepend new log with IP
  logs.unshift({ ...body, ip });
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2), 'utf8');
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { timestamp } = await req.json();
  let logs = [];
  try {
    logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
  } catch {}
  const filtered = logs.filter((log: any) => log.timestamp !== timestamp);
  fs.writeFileSync(logFile, JSON.stringify(filtered, null, 2), 'utf8');
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 