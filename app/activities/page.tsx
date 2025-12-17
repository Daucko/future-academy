import { getSchoolActivities } from "@/app/actions/activities";
import ActivitiesClient from "./client";

export default async function ActivitiesPage() {
    const { data: activities } = await getSchoolActivities();
    return <ActivitiesClient initialActivities={activities || []} />;
}
