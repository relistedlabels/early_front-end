import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_PATHS = [
  '/auth/create-account',
  '/auth/sign-in',
  '/auth/OTP',
  '/auth/profile-setup',
  '/listers/inventory',
  '/listers/dashboard',
];

const STATIC_PATHS = [
  '/_next',
  '/api',
  '/images',
  '/favicon.ico',
  '/__nextjs',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (STATIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const isAllowed = ALLOWED_PATHS.some(
    path => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!isAllowed) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/create-account';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
