import { getExams } from "@/app/actions/exams";
import ExamsClient from "./client";

export default async function ExamsPage() {
    const { data: exams } = await getExams();
    return <ExamsClient initialExams={exams || []} />;
}
