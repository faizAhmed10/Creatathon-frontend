import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value; // Get token from cookies
  const publicRoutes = ["/", "/auth/login", "/auth/register"]; // Define public routes

  if (!token && !publicRoutes.includes(request.nextUrl.pathname)) {
    // Redirect to login page if user is not authenticated
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next(); // Continue to the requested page
}

// Apply middleware to all routes except API and static files
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
