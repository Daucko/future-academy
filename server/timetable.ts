'use server'

import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function getTimetableData() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return null;
        }

        // Find the student record associated with the user's email
        const student = await prisma.student.findFirst({
            where: { email: session.user.email },
            select: { classId: true }
        });

        if (!student || !student.classId) {
            return [];
        }

        // Fetch schedules for the student's class
        const schedules = await prisma.schedule.findMany({
            where: { classId: student.classId },
            include: {
                teacher: {
                    select: {
                        fullName: true
                    }
                }
            },
            orderBy: { startTime: 'asc' }
        });

        // Map database schedules to the format expected by the frontend
        return schedules.map((s: any) => ({
            time: s.startTime,
            endTime: s.endTime,
            status: "upcoming", // This would ideally be calculated based on current time
            title: s.subject,
            teacher: s.teacher?.fullName || "TBA",
            room: s.room || "TBA",
            type: "class",
            icon: "dot"
        }));
    } catch (error) {
        console.error("Error fetching timetable:", error);
        return [];
    }
}
