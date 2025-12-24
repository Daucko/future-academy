'use server'

import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function getStudentGrades() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return { success: false, error: "Not authenticated" };
        }

        const student = await prisma.student.findFirst({
            where: { email: session.user.email },
            select: { id: true }
        });

        if (!student) {
            return { success: false, error: "Student not found" };
        }

        // Fetch Exam Results
        const examResults = await prisma.examResult.findMany({
            where: { studentId: student.id },
            include: {
                exam: {
                    select: {
                        subject: true,
                        examType: true,
                    }
                }
            },
            orderBy: { gradedAt: 'desc' }
        });

        // Fetch Assignment Submissions with grades
        const assignmentSubmissions = await prisma.assignmentSubmission.findMany({
            where: {
                studentId: student.id,
                grade: { not: null }
            },
            include: {
                assignment: {
                    select: {
                        subject: true,
                        title: true,
                        totalPoints: true,
                    }
                }
            },
            orderBy: { submissionDate: 'desc' }
        });

        return {
            success: true,
            data: {
                examResults,
                assignmentSubmissions
            }
        };
    } catch (error) {
        console.error("Error fetching student grades:", error);
        return { success: false, error: "Failed to fetch grades" };
    }
}
