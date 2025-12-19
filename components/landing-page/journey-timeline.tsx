import { Baby, Palette, BookOpen, GraduationCap } from 'lucide-react';

export function JourneyTimeline() {
  const stages = [
    {
      icon: Baby,
      title: 'Nursery',
      description:
        'A nurturing environment where curiosity is sparked through play-based learning and sensory activities.',
    },
    {
      icon: Palette,
      title: 'Kindergarten',
      description:
        'Building social skills and foundational literacy in a creative, collaborative setting.',
    },
    {
      icon: BookOpen,
      title: 'Primary School',
      description:
        'Rigorous academics blended with character development to prepare students for the wider world.',
    },
    {
      icon: GraduationCap,
      title: 'College',
      description:
        'Specialized streams and leadership programs designed to launch students into top-tier universities.',
    },
  ];

  return (
    <section className="px-4 py-20 flex justify-center bg-gradient-to-b from-transparent to-sky-50">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-text-main">
            Your Child's Journey
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            From their first steps to their graduation cap, we provide a
            continuous path of excellence.
          </p>
        </div>
        <div className="w-full grid grid-cols-[60px_1fr] gap-x-6 md:gap-x-10 relative">
          <div className="absolute left-[29px] top-4 bottom-10 w-[2px] bg-gradient-to-b from-primary via-sky-200 to-transparent"></div>
          {stages.map((stage, index) => (
            <>
              <div
                key={`icon-${index}`}
                className="flex flex-col items-center relative z-10 pb-12"
              >
                <div
                  className={`w-14 h-14 rounded-full ${
                    index === 3
                      ? 'bg-primary text-white shadow-lg shadow-sky-200'
                      : 'bg-white border-4 border-sky-100 shadow-md'
                  } flex items-center justify-center`}
                >
                  <stage.icon
                    className={`h-6 w-6 ${
                      index === 3 ? 'text-white' : 'text-primary'
                    }`}
                  />
                </div>
              </div>
              <div
                key={`content-${index}`}
                className="flex flex-col pb-12 pt-2 group"
              >
                <h3
                  className={`text-xl font-bold mb-2 group-hover:text-primary transition-colors ${
                    index === 3 ? 'text-primary' : 'text-text-main'
                  }`}
                >
                  {stage.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
