import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("myTokenName");

  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

}

export const config = {
  matcher: ["/"],
};
