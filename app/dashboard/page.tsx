import { auth } from "@/auth";
import StudentDashboardWithLayout from "./student-dashboard-with-layout";
import TeacherDashboardWithLayout from "./teacher-dashboard-with-layout";

export default async function DashboardPage() {
    const session = await auth();
    const role = (session?.user as any)?.role?.toUpperCase();

    if (role === "STUDENT") {
        return <StudentDashboardWithLayout />;
    }

    return <TeacherDashboardWithLayout />;
}
