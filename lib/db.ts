import { PrismaClient } from "@/app/generated-prisma-client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as { prisma: any };

const databaseUrl = process.env.DATABASE_URL;
const isAccelerate = databaseUrl?.startsWith("prisma://") || databaseUrl?.startsWith("prisma+postgres://");

const createPrismaClient = () => {
    const client = new PrismaClient({
        log: ["query"],
    });

    if (isAccelerate) {
        return client.$extends(withAccelerate()) as any;
    }

    return client;
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
