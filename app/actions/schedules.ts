'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const scheduleSchema = z.object({
    classId: z.string().min(1),
    subject: z.string().min(1),
    dayOfWeek: z.coerce.number().min(0).max(6),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    room: z.string().optional(),
    teacherId: z.string().optional(),
});

export async function getSchedules(classId?: string) {
    try {
        const where = classId ? { classId } : {};
        const schedules = await prisma.schedule.findMany({
            where,
            include: { class: true, teacher: true },
            orderBy: { dayOfWeek: 'asc' }
        });
        return { success: true, data: schedules };
    } catch (error) {
        return { success: false, error: "Failed to fetch schedules" };
    }
}

export async function createSchedule(data: z.infer<typeof scheduleSchema>) {
    try {
        const validated = scheduleSchema.parse(data);
        const newSchedule = await prisma.schedule.create({
            data: validated
        });
        revalidatePath("/schedule");
        return { success: true, data: newSchedule };
    } catch (error) {
        return { success: false, error: "Failed to create schedule" };
    }
}

export async function updateSchedule(id: string, data: Partial<z.infer<typeof scheduleSchema>>) {
    try {
        const updated = await prisma.schedule.update({
            where: { id },
            data
        });
        revalidatePath("/schedule");
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to update schedule" };
    }
}

export async function deleteSchedule(id: string) {
    try {
        await prisma.schedule.delete({ where: { id } });
        revalidatePath("/schedule");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete schedule" };
    }
}
