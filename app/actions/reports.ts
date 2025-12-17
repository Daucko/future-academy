'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const reportSchema = z.object({
    title: z.string().min(1),
    type: z.string().min(1),
    data: z.any().optional(), // Json
    generatedBy: z.string().optional(),
});

export async function getReports() {
    try {
        const reports = await prisma.report.findMany({
            orderBy: { createdAt: 'desc' },
            include: { generator: true }
        });
        return { success: true, data: reports };
    } catch (error) {
        return { success: false, error: "Failed to fetch reports" };
    }
}

export async function createReport(data: z.infer<typeof reportSchema>) {
    try {
        const validated = reportSchema.parse(data);
        const report = await prisma.report.create({
            data: validated
        });
        revalidatePath("/reports");
        return { success: true, data: report };
    } catch (error) {
        return { success: false, error: "Failed to create report" };
    }
}

export async function deleteReport(id: string) {
    try {
        await prisma.report.delete({ where: { id } });
        revalidatePath("/reports");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete report" };
    }
}
