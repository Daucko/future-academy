import { auth } from "@/auth";
import StudentLayout from "./(student-dashboard)/layout";
import TeacherLayout from "./(teacher-dashboard)/layout";

export default async function UnifiedDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const role = (session?.user as any)?.role?.toUpperCase();

    if (role === "STUDENT") {
        return <StudentLayout>{children}</StudentLayout>;
    }

    return <TeacherLayout>{children}</TeacherLayout>;
}
