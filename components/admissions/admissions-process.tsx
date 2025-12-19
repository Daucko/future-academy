import { FileEdit, Map, FileCheck, CheckCircle } from 'lucide-react';

export function AdmissionsProcess() {
  const steps = [
    {
      icon: FileEdit,
      title: 'Submit Inquiry',
      description:
        'Fill out the online inquiry form to schedule a tour and receive our prospectus.',
    },
    {
      icon: Map,
      title: 'Campus Tour',
      description:
        'Visit our facilities, meet our faculty, and see our students in action.',
    },
    {
      icon: FileCheck,
      title: 'Assessment',
      description:
        'Students complete an age-appropriate assessment to determine placement.',
    },
    {
      icon: CheckCircle,
      title: 'Enrollment',
      description:
        'Upon acceptance, complete the final registration and secure your seat.',
    },
  ];

  return (
    <section className="px-4 py-16 flex justify-center bg-white">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-text-main">
            How to Apply
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Our four-step admission process is designed to be transparent and
            simple for families.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-purple-100">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="w-8 h-1 bg-slate-100 rounded-full group-hover:bg-primary transition-colors duration-300"></div>
              <h3 className="text-xl font-bold text-text-main">{step.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
