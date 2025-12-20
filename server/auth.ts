"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

const signUpSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string().optional().default("student"),
});

export async function signUp(formData: z.infer<typeof signUpSchema>) {
    try {
        const validatedFields = signUpSchema.safeParse(formData);

        if (!validatedFields.success) {
            return { error: "Invalid fields!" };
        }

        const { email, password, fullName, username, role } = validatedFields.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            return { error: "Email or username already in use!" };
        }

        await prisma.user.create({
            data: {
                fullName,
                email,
                username,
                password: hashedPassword,
                role: role.toLowerCase(),
            },
        });

        return { success: "User created!" };
    } catch (error) {
        return { error: "Something went wrong!" };
    }
}

export async function login(values: any) {
    try {
        await signIn("credentials", {
            ...values,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }
}
