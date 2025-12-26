import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TeacherOverview from "./(teacher-dashboard)/teacher-dashboard";

export default async function DashboardPage() {
    const session = await auth(); \n    const role = (session?.user as any)?.role?.toUpperCase(); \n\n    if (role === \"STUDENT\") {\n        redirect(\"/dashboard\");\n    }return <TeacherOverview />;
