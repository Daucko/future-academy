import { auth } from "@/auth";
import StudentOverview from "./(student-dashboard)/page";
import TeacherOverview from "./(teacher-dashboard)/page";

export default async function DashboardPage() {
    const session = await auth();
    const role = (session?.user as any)?.role;

    if (role === "STUDENT") {
        return <StudentOverview />;
    }

    return <TeacherOverview />;
}
