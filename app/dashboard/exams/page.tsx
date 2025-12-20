import { getExams } from "@/server/exams";
import ExamsClient from "./client";

export default async function ExamsPage() {
    const { data: exams } = await getExams();
    return <ExamsClient initialExams={exams || []} />;
}
