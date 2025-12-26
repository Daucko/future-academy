'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';

// Minimal types for schedule rows returned by Prisma in this query
type ScheduleRow = {
  course?: { id: string; [key: string]: any } | null;
  teacher?: { fullName?: string | null; avatarUrl?: string | null } | null;
  startTime?: string | null;
};

type CourseMeta = {
  id: string;
  [key: string]: any;
  teacherName?: string;
  teacherAvatar?: string | undefined | null;
  progress?: number;
  attendance?: string;
  nextLesson?: string | null;
};

const courseSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  credits: z.coerce.number().default(3),
  color: z.string().optional().default('blue'),
});

export async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { name: 'asc' },
    });
    return { success: true, data: courses };
  } catch (error) {
    return { success: false, error: 'Failed to fetch courses' };
  }
}

export async function getStudentCourses() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: 'Not authenticated' };
    }

    const student = await prisma.student.findFirst({
      where: { email: session.user.email },
      select: { classId: true },
    });

    if (!student || !student.classId) {
      return { success: true, data: [] };
    }

    // Aggregate courses from the class schedule
    const schedules = await prisma.schedule.findMany({
      where: { classId: student.classId },
      include: {
        course: true,
        teacher: true,
      },
    });

    // Unique courses with teacher info and some mock stats
    const courseMap = new Map<string, CourseMeta>();
    schedules.forEach((s: ScheduleRow) => {
      if (s.course && !courseMap.has(s.course.id)) {
        courseMap.set(s.course.id, {
          ...s.course,
          teacherName: s.teacher?.fullName || 'TBA',
          teacherAvatar: s.teacher?.avatarUrl,
          progress: Math.floor(Math.random() * 40) + 60, // Mock progress for UI demo
          attendance: '95%',
          nextLesson: s.startTime,
        });
      }
    });

    return { success: true, data: Array.from(courseMap.values()) };
  } catch (error) {
    console.error('Error fetching student courses:', error);
    return { success: false, error: 'Failed to fetch courses' };
  }
}

export async function createCourse(data: z.infer<typeof courseSchema>) {
  try {
    const validated = courseSchema.parse(data);
    const course = await prisma.course.create({
      data: validated,
    });
    revalidatePath('/courses');
    return { success: true, data: course };
  } catch (error) {
    return { success: false, error: 'Failed to create course' };
  }
}

export async function updateCourse(
  id: string,
  data: Partial<z.infer<typeof courseSchema>>
) {
  try {
    const updated = await prisma.course.update({
      where: { id },
      data,
    });
    revalidatePath('/courses');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: 'Failed to update course' };
  }
}

export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({ where: { id } });
    revalidatePath('/courses');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete course' };
  }
}
