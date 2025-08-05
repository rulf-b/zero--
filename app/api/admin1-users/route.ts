import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const DATA_PATH = path.join(process.cwd(), 'data', 'admin1-user.json');
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// Helper function to verify admin1 token
function verifyAdmin1Token(req: NextRequest) {
  const token = req.cookies.get('admin1_token')?.value;
  if (!token || !JWT_SECRET) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = verifyAdmin1Token(req);
    if (!user || user.type !== 'admin1') {
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
    const user = verifyAdmin1Token(req);
    if (!user || user.type !== 'admin1') {
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
