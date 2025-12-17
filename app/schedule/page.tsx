import { getSchedules } from "@/app/actions/schedules";
import { getClasses } from "@/app/actions/classes";
import ScheduleClient from "./client";

export default async function SchedulePage() {
    const { data: schedules } = await getSchedules();
    const { data: classes } = await getClasses();
    return <ScheduleClient initialSchedules={schedules || []} initialClasses={classes || []} />;
}
