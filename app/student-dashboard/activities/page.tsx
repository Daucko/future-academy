import StudentActivitiesClient from "./client";
import { getSchoolActivities } from "@/server/activities";

export default async function ActivitiesPage() {
    const response = await getSchoolActivities();
    const activities = response.success ? response.data : [];

    return <StudentActivitiesClient initialActivities={activities as any} />;
}
