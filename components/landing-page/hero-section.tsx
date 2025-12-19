import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative px-4 py-12 md:px-10 md:py-20 lg:py-28 flex justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-background to-background">
      <div className="w-full max-w-7xl">
        <div className="@container">
          <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-6 lg:w-1/2 items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Admissions Open for 2024
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl text-text-main">
                Shaping the Future, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                  One Mind at a Time
                </span>
              </h1>
              <h2 className="text-base font-normal leading-relaxed text-text-muted md:text-lg max-w-lg">
                A holistic approach to education from Nursery to College,
                fostering growth, innovation, and leadership in every student.
              </h2>
              <div className="flex gap-4 pt-4">
                <Button
                  size="lg"
                  className="rounded-full px-8 hover:scale-105 hover:shadow-glow"
                >
                  Book a Tour
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-slate-200"
                >
                  View Programs
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4 text-sm text-text-muted">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400"></div>
                </div>
                <p>
                  Trusted by{' '}
                  <span className="font-bold text-text-main">2,000+</span> happy
                  parents
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -right-4 -bottom-4 w-full h-full rounded-[2rem] border-2 border-primary/10 bg-purple-50 -z-10"></div>
              <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 shadow-2xl shadow-purple-900/10 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10"></div>
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrA1Fq9jPegj_lE3Lw86pkIo17fMzUGNi34Z96tDXI-MM2eeFf4tQDWcYIjCzE_OkuiR8V7RXpndlVPbMcYC6wAlS-zTZ4fTXNJeW-BHayYQLJyIML0UduKyPpF0oUYeCyfj83HN7qmDuTyfN6hYoi1E1EVYtIyTQTU9pX66tbBJ2ujRGySGxPMwgrXD2mpft-OTjqp0MdfVKpjFpzO-LiOkWuaDe9YvbUBuFmjp5TY4zraimQJ5ALp9JisifsBb38noUpNl_0ves')]"></div>
              </div>
              <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md border border-white/40 p-4 rounded-xl flex items-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">
                    Excellence
                  </p>
                  <p className="text-sm font-bold text-text-main">
                    Award Winning Campus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
