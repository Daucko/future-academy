import { auth } from '@/auth';
import StudentExams from '../(student-dashboard)/_exams/page';
import TeacherExams from '../(teacher-dashboard)/_exams/page';
import StudentLayout from '../(student-dashboard)/layout';

export default async function ExamsDispatcher() {
  const session = await auth();
  const role = (session?.user as any)?.role?.toUpperCase();

  if (role === 'STUDENT') {
    return (
      <StudentLayout>
        <StudentExams />
      </StudentLayout>
    );
  }

  return <TeacherExams />;
}
