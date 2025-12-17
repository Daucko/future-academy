'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const lessonPlanSchema = z.object({
    classId: z.string().min(1),
    teacherId: z.string().optional(),
    subject: z.string().min(1),
    topic: z.string().min(1),
    objectives: z.string().optional(),
    materials: z.string().optional(),
    lessonDate: z.string().min(1),
    duration: z.coerce.number().optional(),
    status: z.string().default("draft"),
});

export async function getLessonPlans(classId?: string) {
    try {
        const where = classId ? { classId } : {};
        const plans = await prisma.lessonPlan.findMany({
            where,
            include: { class: true, teacher: true },
            orderBy: { lessonDate: 'desc' }
        });
        return { success: true, data: plans };
    } catch (error) {
        return { success: false, error: "Failed to fetch lesson plans" };
    }
}

export async function createLessonPlan(data: z.infer<typeof lessonPlanSchema>) {
    try {
        const validated = lessonPlanSchema.parse(data);
        const createData: any = { ...validated };
        createData.lessonDate = new Date(validated.lessonDate);

        const plan = await prisma.lessonPlan.create({
            data: createData
        });
        revalidatePath("/lesson-plans"); // Or whatever the route is
        return { success: true, data: plan };
    } catch (error) {
        return { success: false, error: "Failed to create lesson plan" };
    }
}

export async function updateLessonPlan(id: string, data: Partial<z.infer<typeof lessonPlanSchema>>) {
    try {
        const updateData: any = { ...data };
        if (data.lessonDate) updateData.lessonDate = new Date(data.lessonDate);

        const updated = await prisma.lessonPlan.update({
            where: { id },
            data: updateData
        });
        revalidatePath("/lesson-plans");
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to update lesson plan" };
    }
}

export async function deleteLessonPlan(id: string) {
    try {
        await prisma.lessonPlan.delete({ where: { id } });
        revalidatePath("/lesson-plans");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete lesson plan" };
    }
}
