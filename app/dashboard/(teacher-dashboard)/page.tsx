import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
    const session = await auth();

    if (!session?.user) {
        redirect("/signin");
    }

    const role = (session.user as any).role;

    if (role === "STUDENT") {
        redirect("/student-dashboard");
    } else {
        // Default to teacher dashboard for teachers and admins
        redirect("/teacher-dashboard");
    }
}
