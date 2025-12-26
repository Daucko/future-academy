import TimetableClient from './client';
import { getTimetableData } from '../../../../server/timetable';

export default async function TimetablePage() {
  const timetableData = await getTimetableData();
  return <TimetableClient initialData={timetableData} />;
}
