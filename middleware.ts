import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // İngilizce brand URL'lerini Türkçe'ye yönlendir
  if (pathname.startsWith('/brands/')) {
    const turkishPath = pathname.replace('/brands/', '/markalar/');
    const url = request.nextUrl.clone();
    url.pathname = turkishPath;
    return NextResponse.redirect(url, 301); // Permanent redirect for SEO
  }

  // Eski /brands ana sayfasını /markalar'a yönlendir
  if (pathname === '/brands') {
    const url = request.nextUrl.clone();
    url.pathname = '/markalar';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/brands/:path*',
    '/brands'
  ]
};
