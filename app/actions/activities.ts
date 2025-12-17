'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const activitySchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    activityDate: z.string().min(1),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    location: z.string().optional(),
    category: z.string().optional().default("event"),
});

export async function getSchoolActivities() {
    try {
        const activities = await prisma.schoolActivity.findMany({
            orderBy: { activityDate: 'desc' }
        });
        return { success: true, data: activities };
    } catch (error) {
        return { success: false, error: "Failed to fetch activities" };
    }
}

export async function createSchoolActivity(data: z.infer<typeof activitySchema>) {
    try {
        const validated = activitySchema.parse(data);
        const createData: any = { ...validated };
        createData.activityDate = new Date(validated.activityDate);

        const activity = await prisma.schoolActivity.create({
            data: createData
        });
        revalidatePath("/activities");
        return { success: true, data: activity };
    } catch (error) {
        return { success: false, error: "Failed to create activity" };
    }
}

export async function updateSchoolActivity(id: string, data: Partial<z.infer<typeof activitySchema>>) {
    try {
        const updateData: any = { ...data };
        if (data.activityDate) updateData.activityDate = new Date(data.activityDate);

        const updated = await prisma.schoolActivity.update({
            where: { id },
            data: updateData
        });
        revalidatePath("/activities");
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to update activity" };
    }
}

export async function deleteSchoolActivity(id: string) {
    try {
        await prisma.schoolActivity.delete({ where: { id } });
        revalidatePath("/activities");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete activity" };
    }
}
