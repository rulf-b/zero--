import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const DATA_PATH = path.join(process.cwd(), 'data', 'admin2-user.json');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

// Helper function to verify admin token (both admin1 and admin2 can access this)
function verifyAdminToken(req: NextRequest) {
  const admin1Token = req.cookies.get('admin1_token')?.value;
  const admin2Token = req.cookies.get('admin2_token')?.value;
  
  if (admin1Token) {
    try {
      return jwt.verify(admin1Token, JWT_SECRET) as any;
    } catch {}
  }
  
  if (admin2Token) {
    try {
      return jwt.verify(admin2Token, JWT_SECRET) as any;
    } catch {}
  }
  
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const user = verifyAdminToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf-8'));
    // Şifreyi asla döndürme
    return NextResponse.json({ username: data.username });
  } catch (e) {
    return NextResponse.json({ error: 'Kullanıcı bilgisi bulunamadı.' }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = verifyAdminToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const { username, password } = await req.json();
    if (!username) {
      return NextResponse.json({ error: 'Kullanıcı adı zorunlu.' }, { status: 400 });
    }

    let newData: any = { username };
    try {
      const oldData = JSON.parse(await fs.readFile(DATA_PATH, 'utf-8'));
      newData = { ...oldData, username };
    } catch {}

    if (password) {
      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      newData.password = hashedPassword;
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Kayıt sırasında hata oluştu.' }, { status: 500 });
  }
}