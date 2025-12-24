import { getSchedules } from "@/server/schedules";
import { getClasses } from "@/server/classes";
import ScheduleClient from "./client";

export default async function SchedulePage() {
    const { data: schedules } = await getSchedules();
    const { data: classes } = await getClasses();
    return <ScheduleClient initialSchedules={schedules || []} initialClasses={classes || []} />;
}
