import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const DATA_PATH = path.join(process.cwd(), 'data', 'admin1-user.json');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

// Rate limiting simple implementation
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const BLOCK_TIME = 15 * 60 * 1000; // 15 minutes

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Rate limiting check
    const attemptKey = `admin1_${clientIP}`;
    const attempts = loginAttempts.get(attemptKey) || { count: 0, lastAttempt: 0 };
    
    if (attempts.count >= MAX_ATTEMPTS && Date.now() - attempts.lastAttempt < BLOCK_TIME) {
      return NextResponse.json({ error: 'Çok fazla başarısız deneme. 15 dakika bekleyin.' }, { status: 429 });
    }

    if (!username || !password) {
      return NextResponse.json({ error: 'Kullanıcı adı ve şifre zorunlu.' }, { status: 400 });
    }

    const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf-8'));
    
    // Username check
    if (data.username !== username) {
      // Increment failed attempts
      loginAttempts.set(attemptKey, { count: attempts.count + 1, lastAttempt: Date.now() });
      return NextResponse.json({ error: 'Kullanıcı adı veya şifre hatalı.' }, { status: 401 });
    }

    // Password check with bcrypt
    const isValidPassword = await bcrypt.compare(password, data.password);
    
    if (!isValidPassword) {
      // Increment failed attempts
      loginAttempts.set(attemptKey, { count: attempts.count + 1, lastAttempt: Date.now() });
      return NextResponse.json({ error: 'Kullanıcı adı veya şifre hatalı.' }, { status: 401 });
    }

    // Reset failed attempts on successful login
    loginAttempts.delete(attemptKey);

    // Generate JWT token
    const token = jwt.sign({ username, type: 'admin1' }, JWT_SECRET, { expiresIn: '24h' });

    const response = NextResponse.json({ success: true, token });
    
    // Set secure HTTP-only cookie
    response.cookies.set('admin1_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return response;
  } catch (e) {
    return NextResponse.json({ error: 'Giriş sırasında hata oluştu.' }, { status: 500 });
  }
}
