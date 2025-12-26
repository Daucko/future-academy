import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();
    const role = (session?.user as any)?.role?.toUpperCase();

    if (role === "STUDENT") {
        redirect("/dashboard");
    }

    // For teachers, also redirect to their dashboard route group
    redirect("/dashboard");
}
