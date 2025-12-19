import { getLessonPlans } from "@/app/dashboard/actions/lesson-plans";
import ClassPreparationClient from "./client";

export default async function ClassPreparationPage() {
    const { data: plans } = await getLessonPlans();
    return <ClassPreparationClient initialPlans={plans || []} />;
}
