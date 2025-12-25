import { getAssignments } from "@/server/assignments";
import AssignmentsClient from "./client";

export default async function AssignmentsPage() {
    const { data: assignments } = await getAssignments();
    return <AssignmentsClient initialAssignments={assignments || []} />;
}
