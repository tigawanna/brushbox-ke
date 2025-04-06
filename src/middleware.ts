import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "pocketbase";

export function middleware(request: NextRequest) {
  // Protected routes
  const protectedPaths = ["/dashboard","/profile","/bookings"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Auth routes (login/register)
  const authPaths = ["/", "/register"];
  const isAuthPath = authPaths.some(
    (path) => request.nextUrl.pathname === path
  );

  const authCookie = request.cookies.get("pb_auth");
  const token = authCookie?.value ? JSON.parse(authCookie.value).token : null;
  const isAuthenticated = token && !isTokenExpired(token);

  // Redirect authenticated users away from auth pages
  if (isAuthPath && isAuthenticated) {
    // return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
