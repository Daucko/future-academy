import { School } from 'lucide-react';
import Image from 'next/image';

export function SignInSidebar() {
  return (
    <div className="hidden lg:flex lg:w-5/12 relative flex-col justify-between p-12 bg-cover bg-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80')]">
      <div className="absolute inset-0 bg-background-dark/85 backdrop-blur-[2px] z-0 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark/90 z-0"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 text-white mb-8">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <School className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Future Academy</h2>
        </div>
      </div>
      <div className="relative z-10 mb-12">
        <h1 className="text-5xl font-bold leading-tight tracking-tight mb-6 text-white">
          Empowering <br />
          <span className="text-sky-300">Future Leaders</span>
        </h1>
        <p className="text-sky-100 text-lg max-w-md leading-relaxed">
          Join a community dedicated to academic excellence, innovation, and
          character development.
        </p>
        <div className="mt-12 flex gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-300"
              ></div>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold text-white">
              2,000+ Students
            </span>
            <span className="text-xs text-sky-300">Trust our platform</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 text-xs text-sky-200/60 font-medium">
        © 2024 Future Academy. All rights reserved.
      </div>
    </div>
  );
}
