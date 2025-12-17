'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const studentSchema = z.object({
    studentId: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().optional(),
    classId: z.string().optional(),
    grade: z.coerce.number(),
    avatarUrl: z.string().optional(),
    dateOfBirth: z.string().optional().transform(str => str ? new Date(str).toISOString() : null), // Handle dates carefully
    parentName: z.string().optional(),
    parentPhone: z.string().optional(),
    address: z.string().optional(),
});

export async function getStudents(classId?: string) {
    try {
        const where = classId ? { classId } : {};
        const students = await prisma.student.findMany({
            where,
            include: { class: true },
            orderBy: { lastName: 'asc' }
        });
        return { success: true, data: students };
    } catch (error) {
        return { success: false, error: "Failed to fetch students" };
    }
}

export async function getStudent(id: string) {
    try {
        const student = await prisma.student.findUnique({
            where: { id },
            include: {
                class: true,
                attendance: true
            }
        });
        return { success: true, data: student };
    } catch (error) {
        return { success: false, error: "Failed to fetch student" };
    }
}

export async function createStudent(data: z.infer<typeof studentSchema>) {
    try {
        const validated = studentSchema.parse(data);

        // Convert date string to Date object if needed for Prisma
        const createData: any = { ...validated };
        if (validated.dateOfBirth) {
            createData.dateOfBirth = new Date(validated.dateOfBirth);
        }

        const newStudent = await prisma.student.create({
            data: createData
        });

        revalidatePath("/students");
        return { success: true, data: newStudent };
    } catch (error) {
        return { success: false, error: "Failed to create student" };
    }
}

export async function updateStudent(id: string, data: Partial<z.infer<typeof studentSchema>>) {
    try {
        const updateData: any = { ...data };
        if (data.dateOfBirth) {
            updateData.dateOfBirth = new Date(data.dateOfBirth);
        }

        const updated = await prisma.student.update({
            where: { id },
            data: updateData
        });
        revalidatePath("/students");
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to update student" };
    }
}

export async function deleteStudent(id: string) {
    try {
        await prisma.student.delete({
            where: { id }
        });
        revalidatePath("/students");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete student" };
    }
}
