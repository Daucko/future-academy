'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const initialCourses = [
    { code: "MATH101", name: "Mathematics", color: "blue", description: "Fundamental principles of algebra, geometry, and calculus." },
    { code: "SCI101", name: "Science", color: "emerald", description: "Exploring biology, chemistry, and physics." },
    { code: "ENG101", name: "English", color: "purple", description: "Literature, composition, and language arts." },
    { code: "HIST101", name: "History", color: "amber", description: "World history and social studies." },
    { code: "ARTS101", name: "Arts", color: "pink", description: "Visual and performing arts." },
    { code: "PE101", name: "Physical Education", color: "rose", description: "Health and physical fitness." },
    { code: "CS101", name: "Computer Science", color: "indigo", description: "Introduction to programming and technology." },
];

export async function seedCoursesAndLinkData() {
    try {
        console.log("Seeding courses...");

        // 1. Create Courses
        for (const courseData of initialCourses) {
            await prisma.course.upsert({
                where: { code: courseData.code },
                update: {},
                create: courseData
            });
        }

        const allCourses = await prisma.course.findMany();

        // 2. Link existing records based on subject string similarity
        // This is a simple exact match or case-insensitive match for the seed
        for (const course of allCourses) {
            const subjectName = course.name;

            // Update Exams
            await prisma.exam.updateMany({
                where: { subject: { contains: subjectName, mode: 'insensitive' } },
                data: { courseId: course.id }
            });

            // Update Assignments
            await prisma.assignment.updateMany({
                where: { subject: { contains: subjectName, mode: 'insensitive' } },
                data: { courseId: course.id }
            });

            // Update Schedules
            await prisma.schedule.updateMany({
                where: { subject: { contains: subjectName, mode: 'insensitive' } },
                data: { courseId: course.id }
            });

            // Update LessonPlans
            await prisma.lessonPlan.updateMany({
                where: { subject: { contains: subjectName, mode: 'insensitive' } },
                data: { courseId: course.id }
            });
        }

        console.log("Seeding and linking completed.");
        revalidatePath("/");
        return { success: true, message: "Courses seeded and linked successfully." };
    } catch (error) {
        console.error("Seeding error:", error);
        return { success: false, error: "Failed to seed courses." };
    }
}
