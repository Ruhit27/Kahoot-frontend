import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuthenticated = false; // Hardcoded: false means not logged in
  const url = request.url;
  if (!isAuthenticated && url.includes("/admin")) {
    return NextResponse.redirect("http://172.17.128.1:3000/login");
  }

  return NextResponse.next();
}
