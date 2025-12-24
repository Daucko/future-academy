import StudentGradesClient from "./client";
import { getStudentGrades } from "@/server/grades";

export default async function GradesPage() {
    const response = await getStudentGrades();
    const data = response.success ? response.data : { examResults: [], assignmentSubmissions: [] };

    return <StudentGradesClient data={data as any} />;
}
