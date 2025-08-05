import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireAuth } from '@/lib/auth-middleware';
import { messageSchema, idSchema } from '@/lib/validation';

const messagesFile = path.join(process.cwd(), 'data', 'messages.json');

export const GET = requireAuth(async (req) => {
  try {
    const data = fs.readFileSync(messagesFile, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (e) {
    return NextResponse.json([]);
  }
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validation = messageSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Geçersiz veri formatı',
        details: validation.error.issues.map(issue => issue.message)
      }, { status: 400 });
    }
    
    const newMessage = {
      id: Date.now().toString(),
      ...validation.data,
      createdAt: new Date().toISOString(),
      read: false,
    };
    
    let messages = [];
    try {
      messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
    } catch (e) {
      messages = [];
    }
    
    messages.unshift(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Mesaj kaydedilemedi.' }, { status: 500 });
  }
}

export const PATCH = requireAuth(async (req) => {
  try {
    const body = await req.json();
    const { id, read } = body;
    
    if (!id || typeof read !== 'boolean') {
      return NextResponse.json({ error: 'Geçersiz parametreler.' }, { status: 400 });
    }
    
    let messages = [];
    try {
      messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
    } catch (e) {
      messages = [];
    }
    
    messages = messages.map((msg: any) => msg.id === id ? { ...msg, read } : msg);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Mesaj güncellenemedi.' }, { status: 500 });
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
    let messages = [];
    try {
      messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
    } catch (e) {
      messages = [];
    }
    
    messages = messages.filter((msg: any) => msg.id !== id);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Mesaj silinemedi.' }, { status: 500 });
  }
}); 