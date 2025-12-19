import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      title: 'Global Curriculum',
      description: 'International standards meeting local values.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC4y8ltgNINOzBiT5ql36axHDgZUD3gC_U_WP3r2DIjqlIY9WlVWMiLSiIBLLjP3nridihsXdKCFanzwN_GxGtzXz1H97Vq4AGdTuiJkivYsDxjvmcgvAS41Oc1qw3INclWc0_IMgRYupTBgDftYp5Ydo_5kVDNUHRSd-e7gCU43IZH4qHlWK6IINIlZbSJNjQMNH5oMV5ki5lPCWLFPa_b7FnXdcbG95r16637jgvL319Cx4-4ESMhXdSVBL2nDG3kG-8a6HX4lIQ',
      alt: 'Students collaborating around a laptop in a modern classroom',
    },
    {
      title: 'Modern Facilities',
      description: 'State-of-the-art labs and sports complexes.',
      image:
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
      alt: 'Modern science laboratory with microscopes and equipment',
    },
    {
      title: 'Character Building',
      description: 'Fostering leadership and empathy.',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      alt: 'Student smiling while holding books in a library setting',
    },
  ];

  return (
    <section className="px-4 py-20 flex justify-center bg-white">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-text-main">
                Why Choose Us
              </h2>
              <p className="text-text-muted text-lg">
                Experience an environment built for modern learning.
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-primary font-bold p-0 h-auto hover:bg-transparent hover:underline group"
            >
              Explore Facilities
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative flex flex-col gap-4 p-4 rounded-3xl bg-surface border border-slate-100 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/50"
              >
                <div className="w-full aspect-video rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${feature.image})` }}
                  ></div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-xl font-bold text-text-main mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
