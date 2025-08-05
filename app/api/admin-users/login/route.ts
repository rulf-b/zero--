import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginSchema } from '@/lib/validation';
import { logSecurity } from '@/lib/logger';
import { checkRateLimit, recordAttempt } from '@/lib/rate-limit';

const DATA_PATH = path.join(process.cwd(), 'data', 'admin2-user.json');
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Geçersiz veri formatı',
        details: validation.error.issues.map(issue => issue.message)
      }, { status: 400 });
    }
    
    const { username, password } = validation.data;
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Rate limiting check
    const attemptKey = `admin2_${clientIP}`;
    const rateLimitResult = checkRateLimit(attemptKey);
    
    if (!rateLimitResult.allowed) {
      logSecurity(`Rate limit exceeded for admin2 login`, req);
      return NextResponse.json({ 
        error: `Çok fazla başarısız deneme. ${rateLimitResult.timeUntilReset} saniye bekleyin.` 
      }, { status: 429 });
    }

    const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf-8'));
    
    // Username check
    if (data.username !== username) {
      recordAttempt(attemptKey, false);
      logSecurity(`Failed login attempt - invalid username: ${username}`, req);
      return NextResponse.json({ error: 'Kullanıcı adı veya şifre hatalı.' }, { status: 401 });
    }

    // Password check with bcrypt
    const isValidPassword = await bcrypt.compare(password, data.password);
    
    if (!isValidPassword) {
      recordAttempt(attemptKey, false);
      logSecurity(`Failed login attempt - invalid password for user: ${username}`, req);
      return NextResponse.json({ error: 'Kullanıcı adı veya şifre hatalı.' }, { status: 401 });
    }

    // Success - reset rate limit
    recordAttempt(attemptKey, true);
    logSecurity(`Successful admin2 login: ${username}`, req, username);

    // Generate JWT token
    if (!JWT_SECRET) {
      return NextResponse.json({ error: 'Sunucu yapılandırma hatası.' }, { status: 500 });
    }
    const token = jwt.sign({ username, type: 'admin2' }, JWT_SECRET, { expiresIn: '24h' });

    const response = NextResponse.json({ success: true, token });
    
    // Set secure HTTP-only cookie
    response.cookies.set('admin2_token', token, {
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
