import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AdmissionsHero() {
  return (
    <section className="relative px-4 py-12 md:px-10 md:py-16 lg:py-24 flex justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-background to-background">
      <div className="w-full max-w-7xl">
        <div className="@container">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-6 lg:w-1/2 items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Admissions Open 2024-2025
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl text-text-main">
                Begin Your Journey at <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                  Future Academy
                </span>
              </h1>
              <h2 className="text-base font-normal leading-relaxed text-text-muted md:text-lg max-w-lg">
                We are delighted that you are considering Future Academy for
                your child's education. Explore our simplified admission process
                designed to help you join our vibrant community.
              </h2>
              <div className="flex gap-4 pt-4">
                <Link href="#application-form">
                  <Button
                    size="lg"
                    className="rounded-full px-8 hover:scale-105 hover:shadow-glow"
                  >
                    Start Application
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-slate-200"
                >
                  Download Brochure
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -right-4 -bottom-4 w-full h-full rounded-[2rem] border-2 border-primary/10 bg-purple-50 -z-10"></div>
              <div className="w-full aspect-[16/10] rounded-[2rem] overflow-hidden bg-slate-100 shadow-2xl shadow-purple-900/10 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent z-10"></div>
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80')]"></div>
              </div>
              <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-md border border-white/40 p-4 rounded-xl shadow-lg max-w-[200px]">
                <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">
                  Upcoming Deadline
                </p>
                <p className="text-sm font-bold text-text-main">
                  Early Action: Nov 15
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
