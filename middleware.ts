import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

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

    // Define public routes clearly
    const isPublicPath =
        req.nextUrl.pathname === "/" ||
        req.nextUrl.pathname.startsWith("/admissions") ||
        req.nextUrl.pathname.startsWith("/about"); // Add more if needed

    if (!isLoggedIn && !isPublicPath) {
        return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
