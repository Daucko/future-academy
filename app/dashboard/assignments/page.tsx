import { auth } from "@/auth";
import StudentAssignments from "../(student-dashboard)/_assignments/page";
import TeacherAssignments from "../(teacher-dashboard)/_assignments/page";

export default async function AssignmentsDispatcher() {
    const session = await auth();
    const role = (session?.user as any)?.role?.toUpperCase();

    if (role === "STUDENT") {
        return <StudentAssignments />;
    }

    return <TeacherAssignments />;
}
