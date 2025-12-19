import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="px-4 py-24 flex justify-center bg-background">
      <div className="w-full max-w-5xl relative rounded-[3rem] overflow-hidden bg-primary px-8 py-16 text-center md:px-20 md:py-24 shadow-2xl shadow-sky-200">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Ready to join our family?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl font-medium">
            Admissions are open for the upcoming academic year. Secure your
            child's future today.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full px-8 text-primary hover:scale-105 transform duration-200 shadow-lg hover:shadow-xl"
            >
              Start Application
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-white/20 text-white hover:bg-sky-700"
            >
              Contact Admissions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
