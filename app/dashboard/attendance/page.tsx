import { getAttendance } from "@/app/dashboard/actions/attendance";
import { getStudents } from "@/app/dashboard/actions/students";
import AttendanceClient from "./client";

export default async function AttendancePage() {
    const { data: attendance } = await getAttendance(); // Gets all attendance? Might want to limit by date ideally, but let's fetch all for prototype
    const { data: students } = await getStudents();

    return <AttendanceClient initialAttendance={attendance || []} initialStudents={students || []} />;
}
