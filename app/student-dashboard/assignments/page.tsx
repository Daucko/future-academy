import StudentAssignmentsClient from "./client";
import { getStudentAssignments } from "@/server/assignments";

export default async function AssignmentsPage() {
    const response = await getStudentAssignments();
    const assignments = response.success ? response.data : [];

    return <StudentAssignmentsClient initialAssignments={assignments as any} />;
}
