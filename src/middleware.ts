import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;
  if (token) {
    if (pathname === '/login') {
      return Response.redirect(new URL('/', request.url));
    }
    if (!pathname.startsWith('/') && pathname !== '/') {
      return Response.redirect(new URL('/', request.url));
    }
  } else {
    if (pathname !== '/login') {
      return Response.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
