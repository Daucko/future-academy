'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

const assignmentSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    classId: z.string().min(1),
    subject: z.string().min(1),
    dueDate: z.string().min(1),
    totalPoints: z.coerce.number().default(100),
    status: z.string().default("active"),
});

export async function getAssignments(classId?: string) {
    try {
        const where = classId ? { classId } : {};
        const assignments = await prisma.assignment.findMany({
            where,
            include: { class: true, course: true },
            orderBy: { dueDate: 'desc' }
        });
        return { success: true, data: assignments };
    } catch (error) {
        return { success: false, error: "Failed to fetch assignments" };
    }
}

export async function getStudentAssignments() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return { success: false, error: "Not authenticated" };
        }

        const student = await prisma.student.findFirst({
            where: { email: session.user.email },
            select: { id: true, classId: true }
        });

        if (!student || !student.classId) {
            return { success: true, data: [] };
        }

        const assignments = await prisma.assignment.findMany({
            where: { classId: student.classId },
            include: {
                course: true,
                submissions: {
                    where: { studentId: student.id }
                }
            },
            orderBy: { dueDate: 'asc' }
        });

        return { success: true, data: assignments };
    } catch (error) {
        console.error("Error fetching student assignments:", error);
        return { success: false, error: "Failed to fetch assignments" };
    }
}

export async function createAssignment(data: z.infer<typeof assignmentSchema>) {
    try {
        const validated = assignmentSchema.parse(data);
        const createData: any = { ...validated };
        createData.dueDate = new Date(validated.dueDate);

        const newAssignment = await prisma.assignment.create({
            data: createData
        });
        revalidatePath("/assignments");
        return { success: true, data: newAssignment };
    } catch (error) {
        return { success: false, error: "Failed to create assignment" };
    }
}

export async function updateAssignment(id: string, data: Partial<z.infer<typeof assignmentSchema>>) {
    try {
        const updateData: any = { ...data };
        if (data.dueDate) updateData.dueDate = new Date(data.dueDate);

        const updated = await prisma.assignment.update({
            where: { id },
            data: updateData
        });
        revalidatePath("/assignments");
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to update assignment" };
    }
}

export async function deleteAssignment(id: string) {
    try {
        await prisma.assignment.delete({ where: { id } });
        revalidatePath("/assignments");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete assignment" };
    }
}
