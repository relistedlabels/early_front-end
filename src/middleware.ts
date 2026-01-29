import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_PREFIXES = [
  "/auth",
  "/listers",
];

const STATIC_PATHS = [
  "/_next",
  "/api",
  "/images",
  "/favicon.ico",
  "/__nextjs",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (STATIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const isAllowed = ALLOWED_PREFIXES.some(prefix =>
    pathname.startsWith(prefix)
  );

  // if (!isAllowed) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/auth/create-account";
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
