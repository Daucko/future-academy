import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email().or(z.string()), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // Try to find by email or username
                    const user = await prisma.user.findFirst({
                        where: {
                            OR: [
                                { email: email },
                                { username: email }
                            ]
                        },
                    });

                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return {
                        id: user.id,
                        name: user.fullName,
                        email: user.email,
                        role: user.role,
                    };
                }

                return null;
            },
        }),
    ],
});
