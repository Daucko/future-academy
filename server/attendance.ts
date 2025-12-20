'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const attendanceSchema = z.object({
    studentId: z.string().min(1),
    classId: z.string().min(1),
    date: z.string().min(1),
    status: z.string().default("present"),
    checkInTime: z.string().optional(),
    checkOutTime: z.string().optional(),
    notes: z.string().optional(),
});

export async function getAttendance(params?: { classId?: string; date?: string; studentId?: string }) {
    try {
        const where: any = {};
        if (params?.studentId) where.studentId = params.studentId;
        if (params?.classId) where.classId = params.classId;
        if (params?.date) where.date = new Date(params.date);

        const records = await prisma.attendance.findMany({
            where,
            include: { student: true, class: true }
        });
        return { success: true, data: records };
    } catch (error) {
        return { success: false, error: "Failed to fetch attendance" };
    }
}

export async function createAttendance(data: z.infer<typeof attendanceSchema>) {
    try {
        const validated = attendanceSchema.parse(data);
        const createData: any = { ...validated };
        createData.date = new Date(validated.date);

        const newRecord = await prisma.attendance.create({
            data: createData
        });
        revalidatePath("/attendance");
        return { success: true, data: newRecord };
    } catch (error) {
        return { success: false, error: "Failed to record attendance" };
    }
}

export async function updateAttendance(id: string, data: Partial<z.infer<typeof attendanceSchema>>) {
    try {
        const updateData: any = { ...data };
        if (data.date) updateData.date = new Date(data.date);

        const updated = await prisma.attendance.update({
            where: { id },
            data: updateData
        });
        revalidatePath("/attendance");
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to update attendance" };
    }
}
