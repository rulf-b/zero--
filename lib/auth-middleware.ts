import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    username: string;
    type: 'admin1' | 'admin2';
  };
}

export function requireAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    if (!JWT_SECRET) {
      return NextResponse.json({ error: 'Sunucu yapılandırma hatası.' }, { status: 500 });
    }

    const admin1Token = req.cookies.get('admin1_token')?.value;
    const admin2Token = req.cookies.get('admin2_token')?.value;
    
    let user = null;
    
    if (admin1Token) {
      try {
        const decoded = jwt.verify(admin1Token, JWT_SECRET) as any;
        user = { username: decoded.username, type: 'admin1' as const };
      } catch {}
    }
    
    if (!user && admin2Token) {
      try {
        const decoded = jwt.verify(admin2Token, JWT_SECRET) as any;
        user = { username: decoded.username, type: 'admin2' as const };
      } catch {}
    }
    
    if (!user) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }
    
    (req as AuthenticatedRequest).user = user;
    return handler(req as AuthenticatedRequest);
  };
}

export function requireAdminLevel(level: 'admin1' | 'admin2') {
  return function(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
      const authHandler = requireAuth(async (authReq) => {
        if (authReq.user?.type !== level) {
          return NextResponse.json({ error: 'Yetersiz yetki.' }, { status: 403 });
        }
        return handler(authReq);
      });
      
      return authHandler(req);
    };
  };
}
