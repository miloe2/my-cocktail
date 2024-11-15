import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 기존 쿠키 확인
  const hasVisited = request.cookies.get('hasVisited');
  const userUUID = request.cookies.get('user_uuid');
  if (!hasVisited) {
    const uuid = crypto.randomUUID();

    // 새로운 쿠키 설정
    response.cookies.set('hasVisited', 'true', { path: '/', sameSite: 'lax' });
    response.cookies.set('user_uuid', uuid, { path: '/', sameSite: 'lax' });
  }

  return response;
}
// 적용할 경로 설정 (모든 경로에 적용)
export const config = {
  matcher: '/:path*', // 모든 페이지에 적용
};
