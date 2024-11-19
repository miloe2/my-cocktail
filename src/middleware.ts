import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const setCookieIfMissing = (key: string, value: string) => {
    if (!request.cookies.get(key)) {
      response.cookies.set(key, value, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 90, // 90일 동안 유지
      });
    }
  };

  setCookieIfMissing("user_uuid", crypto.randomUUID());
  setCookieIfMissing("hasVisited", "true");

  return response;
}

// 적용할 경로 설정 (모든 페이지에 적용)
export const config = {
  matcher: "/:path*", // 모든 페이지에 적용
};
