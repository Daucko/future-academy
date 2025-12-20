import { getReports } from "@/server/reports";
import { getStudents } from "@/server/students";
import ReportsClient from "./client";

export default async function ReportsPage() {
    const { data: reports } = await getReports();
    const { data: students } = await getStudents();
    return <ReportsClient initialReports={reports || []} initialStudents={students || []} />;
}
