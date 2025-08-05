import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const testUser = searchParams.get('user'); // admin1 or admin2
    const testPassword = searchParams.get('password');
    
    if (!testUser || !testPassword) {
      return NextResponse.json({ 
        error: 'Kullanım: /api/debug-login?user=admin1&password=1' 
      });
    }
    
    // Test admin1 or admin2
    const dataPath = testUser === 'admin1' 
      ? path.join(process.cwd(), 'data', 'admin1-user.json')
      : path.join(process.cwd(), 'data', 'admin2-user.json');
    
    // Check if file exists
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ 
        error: `${testUser} dosyası bulunamadı: ${dataPath}`,
        exists: false
      });
    }
    
    // Read user data
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    // Test password
    const isValidPassword = await bcrypt.compare(testPassword, data.password);
    
    // Check JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    
    return NextResponse.json({
      success: true,
      file: dataPath,
      fileExists: true,
      userData: {
        username: data.username,
        hasPassword: !!data.password,
        passwordHash: data.password.substring(0, 20) + '...'
      },
      passwordTest: {
        inputPassword: testPassword,
        isValid: isValidPassword
      },
      environment: {
        hasJwtSecret: !!jwtSecret,
        jwtSecretLength: jwtSecret ? jwtSecret.length : 0,
        nodeEnv: process.env.NODE_ENV
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Debug test hatası',
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : null
    }, { status: 500 });
  }
}
