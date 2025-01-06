import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
 
  
  const token = request.cookies.get("token");

 
  if (!token) {
    console.log('Redirecting to login');
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*"], 
};

export default middleware;
