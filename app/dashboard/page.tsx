import { auth } from "@/auth";
import StudentOverview from "./(student-dashboard)/student-dashboard";
import TeacherOverview from "./(teacher-dashboard)/teacher-dashboard";

export default async function DashboardPage() {
    const session = await auth();
    const role = (session?.user as any)?.role?.toUpperCase();

    if (role === "STUDENT") {
        return <StudentOverview />;
    }

    return <TeacherOverview />;
}
