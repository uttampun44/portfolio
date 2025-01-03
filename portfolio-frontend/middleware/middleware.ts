import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const isLoggedIn = request.cookies.get("authToken");

  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/portfolio-frontend", request.url));
  }

  if (pathname.startsWith("/dashboard") && isLoggedIn) {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

export default middleware;
