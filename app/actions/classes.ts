'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const classSchema = z.object({
    classNumber: z.string().min(1, "Class number is required"),
    className: z.string().min(1, "Class name is required"),
    grade: z.coerce.number().min(1, "Grade is required"),
    section: z.string().optional(),
    teacherId: z.string().optional(),
    colorTheme: z.string().optional(),
});

export async function getClasses() {
    try {
        const classes = await prisma.class.findMany({
            include: {
                teacher: true,
                _count: {
                    select: { students: true }
                }
            },
            orderBy: { className: 'asc' }
        });
        return { success: true, data: classes };
    } catch (error) {
        return { success: false, error: "Failed to fetch classes" };
    }
}

export async function getClass(id: string) {
    try {
        const cls = await prisma.class.findUnique({
            where: { id },
            include: {
                teacher: true,
                students: true,
                exams: true,
                presents: true, // Renamed from attendance potentially? No, relation is attendance
                attendance: true,
                assignments: true,
                schedules: true
            }
        });
        return { success: true, data: cls };
    } catch (error) {
        return { success: false, error: "Failed to fetch class" };
    }
}

export async function createClass(formData: FormData | z.infer<typeof classSchema>) {
    try {
        const data = formData instanceof FormData
            ? Object.fromEntries(formData)
            : formData;

        const validated = classSchema.parse(data);

        const newClass = await prisma.class.create({
            data: validated
        });

        revalidatePath("/classes");
        return { success: true, data: newClass };
    } catch (error) {
        return { success: false, error: "Failed to create class" };
    }
}

export async function updateClass(id: string, data: Partial<z.infer<typeof classSchema>>) {
    try {
        const updated = await prisma.class.update({
            where: { id },
            data
        });
        revalidatePath("/classes");
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to update class" };
    }
}

export async function deleteClass(id: string) {
    try {
        await prisma.class.delete({
            where: { id }
        });
        revalidatePath("/classes");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete class" };
    }
}
