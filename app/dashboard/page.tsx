import { auth } from "@/auth";
import StudentDashboard from "./(student-dashboard)/student-dashboard";
import TeacherDashboard from "./(teacher-dashboard)/teacher-dashboard";

export default async function DashboardPage() {
    const session = await auth();
    const role = (session?.user as any)?.role?.toUpperCase();

    if (role === "STUDENT") {
        return <StudentDashboard />;
    }

    return <TeacherDashboard />;
}
