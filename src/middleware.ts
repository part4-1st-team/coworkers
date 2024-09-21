// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');

  const { pathname } = request.nextUrl;

  if (!token) {
    if (
      pathname.startsWith('/group') ||
      pathname.startsWith('/user') ||
      pathname === '/board/add-post'
    ) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  } else {
    if (pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/groups', request.url));
    }
  }

  // 기본적으로 요청을 그대로 반환
  return NextResponse.next();
}
