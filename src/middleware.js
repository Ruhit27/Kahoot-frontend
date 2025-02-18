import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl; // Use nextUrl for better handling
  const hasAccessCookie = request.cookies.get("hasAccess");
  const isAuthenticatedCookie = request.cookies.get("isAuthenticated");

  const hasAccess = hasAccessCookie ? hasAccessCookie.value : null;
  const isAuthenticated = isAuthenticatedCookie
    ? isAuthenticatedCookie.value
    : null;

  console.log("Requested URL:", url.pathname);
  console.log("Has access:", hasAccess);
  console.log("Is authenticated:", isAuthenticated);

  // Restrict access to "/admin" unless authenticated
  if (!isAuthenticated && url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Restrict access to "/quizz" unless "hasAccess" is set to "true"
  if (url.pathname.startsWith("/quizz") && hasAccess !== "true") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/quizz", "/admin"],
};
