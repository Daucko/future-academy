import { getAttendance } from "@/server/attendance";
import { getStudents } from "@/server/students";
import AttendanceClient from "./client";

export default async function AttendancePage() {
    const { data: attendance } = await getAttendance(); // Gets all attendance? Might want to limit by date ideally, but let's fetch all for prototype
    const { data: students } = await getStudents();

    return <AttendanceClient initialAttendance={attendance || []} initialStudents={students || []} />;
}
