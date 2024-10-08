import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('posinnove-token');

  // if (!token) {
  //   const loginUrl = new URL('/login', req.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
	matcher: "/:path*", // Match all routes
};
