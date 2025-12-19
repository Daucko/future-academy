import { FolderOpen, Calendar, CheckCircle2 } from 'lucide-react';

export function AdmissionsDocuments() {
  const documents = [
    {
      title: 'Birth Certificate',
      description: 'Copy of original birth certificate.',
    },
    {
      title: 'Academic Records',
      description:
        'Report cards from the last 2 years (for Primary & College).',
    },
    {
      title: 'Passport Photos',
      description: 'Recent color passport-sized photographs of the student.',
    },
    {
      title: 'Immunization Records',
      description: 'Up-to-date health and vaccination records.',
    },
  ];

  const importantDates = [
    {
      month: 'Sep',
      day: '01',
      title: 'Applications Open',
      description: 'Online portal opens for all grades.',
    },
    {
      month: 'Nov',
      day: '15',
      title: 'Early Action Deadline',
      description: 'Priority consideration for scholarship applicants.',
    },
    {
      month: 'Jan',
      day: '30',
      title: 'Regular Decision Deadline',
      description: 'Final date for guaranteed assessment slots.',
    },
    {
      month: 'Mar',
      day: '15',
      title: 'Decision Notification',
      description: 'Admission results released to parents.',
    },
  ];

  return (
    <section className="px-4 py-16 flex justify-center bg-slate-50 border-y border-slate-100">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <FolderOpen className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-text-main">
              Required Documents
            </h3>
          </div>
          <p className="text-text-muted">
            Please have the following documents ready digitally when you start
            the online application process.
          </p>
          <ul className="flex flex-col gap-4 mt-2">
            {documents.map((doc, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm"
              >
                <CheckCircle2 className="text-primary shrink-0 h-6 w-6" />
                <div className="flex flex-col">
                  <span className="font-bold text-text-main">{doc.title}</span>
                  <span className="text-xs text-text-muted">
                    {doc.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-text-main">
              Important Dates
            </h3>
          </div>
          <p className="text-text-muted">
            Keep track of these key dates for the 2024-2025 academic session
            admissions cycle.
          </p>
          <div className="mt-2 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            {importantDates.map((date, index) => (
              <div
                key={index}
                className="grid grid-cols-[100px_1fr] border-b border-slate-100 group hover:bg-slate-50 transition-colors last:border-b-0"
              >
                <div className="p-6 flex flex-col items-center justify-center border-r border-slate-100 bg-slate-50 text-center">
                  <span className="text-xs font-bold uppercase text-text-muted">
                    {date.month}
                  </span>
                  <span className="text-2xl font-black text-primary">
                    {date.day}
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h4 className="font-bold text-text-main">{date.title}</h4>
                  <p className="text-sm text-text-muted">{date.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
