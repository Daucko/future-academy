import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.role) {
                session.user.role = token.role as string;
            }
            if (token?.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig;
