import { getStudents } from "@/app/dashboard/actions/students";
import StudentsClient from "./client";

export default async function StudentsPage() {
    const { data: students } = await getStudents();
    return <StudentsClient initialStudents={students || []} />;
}
