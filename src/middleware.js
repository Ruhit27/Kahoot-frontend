import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.url; // Get the current URL
  const hasAccess = request.cookies.get("hasAccess"); // Get the 'hasAccess' cookie
  const cookies = request.cookies;
  const isAuthenticated = cookies.get("isAuthenticated"); // Get the 'isAuthenticated' cookie

  console.log("Requested URL:", url);
  console.log("Has access cookie:", hasAccess);

  if (!isAuthenticated && url.includes("/admin")) {
    const redirectUrl = new URL("/login", request.url); // Redirect to homepage
    console.log("Redirecting to homepage (no access):", redirectUrl); // Log the redirect
    return NextResponse.redirect(redirectUrl); // Perform the redirect
  }

  // if (url.includes("/quizz") && hasAccess !== "true") {
  //   const redirectUrl = new URL("/", request.url); // Redirect to homepage
  //   console.log("Redirecting to homepage (no access):", redirectUrl); // Log the redirect
  //   return NextResponse.redirect(redirectUrl); // Perform the redirect
  // }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/quizz", "/admin"],
};
