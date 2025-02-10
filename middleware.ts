"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "./src/utils/sessions";

export async function middleware(request: NextRequest) {
  const isAuthorized = await checkAuth();
  console.log(isAuthorized.status);

  if (
    request.nextUrl.pathname.startsWith("/account") &&
    isAuthorized.status >= 300
  ) {
    console.log("redirecting to login page");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
