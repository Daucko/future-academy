import { School, Users, Award } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: School,
      label: 'Acceptance',
      value: '100%',
      description: 'University placement rate for graduates',
    },
    {
      icon: Users,
      label: 'Ratio',
      value: '15:1',
      description: 'Student to teacher ratio for personal attention',
    },
    {
      icon: Award,
      label: 'Faculty',
      value: '50+',
      description: 'Highly qualified mentors and professors',
    },
  ];

  return (
    <section className="px-4 py-8 flex justify-center">
      <div className="w-full max-w-7xl bg-surface border border-slate-100 rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-2 p-4 md:pl-4">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <stat.icon className="text-primary text-3xl" />
                <p className="text-primary font-bold text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
              <p className="text-4xl md:text-5xl font-black text-text-main tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-text-muted">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
