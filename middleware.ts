import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isAuthPage = req.nextUrl.pathname.startsWith("/signin") || req.nextUrl.pathname.startsWith("/signup");
    const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
    const isPublicRoute = req.nextUrl.pathname === "/"; // Add other public routes if needed

    if (isApiAuthRoute) return NextResponse.next();

    if (isAuthPage) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
