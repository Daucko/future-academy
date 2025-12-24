import StudentExamsClient from "./client";
import { getStudentExams } from "@/server/exams";

export default async function ExamsPage() {
    const response = await getStudentExams();
    const exams = response.success ? response.data : [];

    return <StudentExamsClient initialExams={exams as any} />;
}
