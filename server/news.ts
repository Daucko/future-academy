'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const newsSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    category: z.string().optional(),
    authorId: z.string().optional(),
    isPublished: z.boolean().default(true),
});

export async function getSchoolNews() {
    try {
        const news = await prisma.schoolNews.findMany({
            orderBy: { publishedAt: 'desc' },
            include: { author: true }
        });
        return { success: true, data: news };
    } catch (error) {
        return { success: false, error: "Failed to fetch news" };
    }
}

export async function createSchoolNews(data: z.infer<typeof newsSchema>) {
    try {
        const validated = newsSchema.parse(data);
        const news = await prisma.schoolNews.create({
            data: {
                ...validated,
                publishedAt: new Date(),
            }
        });
        revalidatePath("/news");
        return { success: true, data: news };
    } catch (error) {
        return { success: false, error: "Failed to create news" };
    }
}

export async function updateSchoolNews(id: string, data: Partial<z.infer<typeof newsSchema>>) {
    try {
        const updated = await prisma.schoolNews.update({
            where: { id },
            data
        });
        revalidatePath("/news");
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to update news" };
    }
}

export async function deleteSchoolNews(id: string) {
    try {
        await prisma.schoolNews.delete({ where: { id } });
        revalidatePath("/news");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete news" };
    }
}
