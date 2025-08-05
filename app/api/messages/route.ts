import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const messagesFile = path.join(process.cwd(), 'data', 'messages.json');

export async function GET(req: NextRequest) {
  try {
    const data = fs.readFileSync(messagesFile, 'utf-8');
    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify([]), { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newMessage = {
      id: Date.now().toString(),
      ...body,
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
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Mesaj kaydedilemedi.' }), { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, read } = await req.json();
    let messages = [];
    try {
      messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
    } catch (e) {
      messages = [];
    }
    messages = messages.map((msg: any) => msg.id === id ? { ...msg, read } : msg);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Mesaj güncellenemedi.' }), { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    let messages = [];
    try {
      messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
    } catch (e) {
      messages = [];
    }
    messages = messages.filter((msg: any) => msg.id !== id);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Mesaj silinemedi.' }), { status: 500 });
  }
} 