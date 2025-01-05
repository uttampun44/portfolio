import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token");

 
  if (pathname.startsWith("/dashboard") && !token) {
    console.log('Redirecting to login');
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  if (pathname.startsWith("/dashboard") && token) {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

export default middleware;
