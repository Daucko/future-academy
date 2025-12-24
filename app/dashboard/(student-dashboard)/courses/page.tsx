import StudentCoursesClient from "./client";
import { getStudentCourses } from "@/server/courses";

export default async function CoursesPage() {
    const response = await getStudentCourses();
    const courses = response.success ? response.data : [];

    return <StudentCoursesClient initialCourses={courses as any} />;
}
