import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAMES } from "./lib/constants/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/public") ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const sessionId = req.cookies.get(COOKIE_NAMES.SESSION_ID);
  const publicPaths = ["/login"];

  if(sessionId && pathname === '/login') { 
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!sessionId && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
