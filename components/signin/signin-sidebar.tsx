'use client';

import { School } from 'lucide-react';
import Image from 'next/image';

export function SignInSidebar() {
  const studentImages = [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80&auto=format&fit=crop', // Female student
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop', // Male student
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop', // Another female student
  ];

  return (
    <div className="hidden lg:flex lg:w-5/12 relative flex-col justify-between p-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80"
          alt="Modern university library"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/75 to-purple-900/85 z-0 backdrop-blur-[2px]"></div>

      {/* Content */}
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
          <span className="text-purple-300">Future Leaders</span>
        </h1>
        <p className="text-purple-100 text-lg max-w-md leading-relaxed">
          Join a community dedicated to academic excellence, innovation, and
          character development.
        </p>

        <div className="mt-12 flex gap-4">
          <div className="flex -space-x-3">
            {studentImages.map((src, index) => (
              <div key={index} className="relative w-10 h-10">
                <div
                  className="w-10 h-10 rounded-full border-2 border-white/20 bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold text-white">
              2,000+ Students
            </span>
            <span className="text-xs text-purple-300">Trust our platform</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-xs text-purple-200/60 font-medium">
        © 2024 Future Academy. All rights reserved.
      </div>
    </div>
  );
}
