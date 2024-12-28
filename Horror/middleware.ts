import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if it's an admin route (except login page)
  if (path.startsWith('/admin') && path !== '/admin') {
    // Check for admin session
    const isAdmin = request.cookies.get('isAdmin')?.value;

    // If not admin, redirect to login
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 