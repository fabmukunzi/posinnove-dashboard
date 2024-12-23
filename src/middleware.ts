import routes from '@utils/routes';
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  if (token) {
    if (['/login', '/signup', '/forgot-password', '/reset-password'].includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (!['/login', '/signup', '/forgot-password', '/reset-password'].includes(pathname)) {
      return NextResponse.redirect(new URL(routes.login.url, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
