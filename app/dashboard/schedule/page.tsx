import { getSchedules } from "@/app/dashboard/actions/schedules";
import { getClasses } from "@/app/dashboard/actions/classes";
import ScheduleClient from "./client";

export default async function SchedulePage() {
    const { data: schedules } = await getSchedules();
    const { data: classes } = await getClasses();
    return <ScheduleClient initialSchedules={schedules || []} initialClasses={classes || []} />;
}
