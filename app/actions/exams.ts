'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const examSchema = z.object({
    classId: z.string().min(1),
    examType: z.string().min(1),
    subject: z.string().min(1),
    examDate: z.string().min(1),
    startTime: z.string().min(1),
    endTime: z.string().optional(),
    confirmed: z.boolean().optional(),
    studentCount: z.coerce.number().optional(),
    room: z.string().optional(),
    notes: z.string().optional(),
});

export async function getExams(classId?: string) {
    try {
        const where = classId ? { classId } : {};
        const exams = await prisma.exam.findMany({
            where,
            include: { class: true },
            orderBy: { examDate: 'desc' }
        });
        return { success: true, data: exams };
    } catch (error) {
        return { success: false, error: "Failed to fetch exams" };
    }
}

export async function createExam(data: z.infer<typeof examSchema>) {
    try {
        const validated = examSchema.parse(data);

        // Parse Date
        const createData: any = { ...validated };
        createData.examDate = new Date(validated.examDate);

        const newExam = await prisma.exam.create({
            data: createData
        });

        revalidatePath("/exams");
        return { success: true, data: newExam };
    } catch (error) {
        return { success: false, error: "Failed to create exam" };
    }
}

export async function updateExam(id: string, data: Partial<z.infer<typeof examSchema>>) {
    try {
        const updateData: any = { ...data };
        if (data.examDate) {
            updateData.examDate = new Date(data.examDate);
        }

        const updated = await prisma.exam.update({
            where: { id },
            data: updateData
        });
        revalidatePath("/exams");
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to update exam" };
    }
}

export async function deleteExam(id: string) {
    try {
        await prisma.exam.delete({ where: { id } });
        revalidatePath("/exams");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete exam" };
    }
}
