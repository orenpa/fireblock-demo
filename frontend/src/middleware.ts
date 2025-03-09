import { NextRequest, NextResponse } from "next/server";
import { Login } from "./enums";
import { tokenKey } from "./constants";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(tokenKey)?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = Login;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
