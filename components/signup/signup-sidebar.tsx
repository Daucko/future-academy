'use client';

import { School, CalendarCheck, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SignUpSidebar() {
  return (
    <div className="hidden lg:flex w-[480px] xl:w-[600px] bg-gradient-to-br from-purple-600 to-purple-800 relative overflow-hidden flex-col justify-center p-12 text-white">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md w-fit shadow-sm">
            <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wide uppercase">
              Admissions Open 2024
            </span>
          </div>
          <h2 className="text-4xl font-black leading-tight tracking-tight">
            Your gateway to academic excellence.
          </h2>
          <p className="text-purple-100 text-lg leading-relaxed">
            Everything you need to manage your education journey in one secure,
            modern platform.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-default">
            <div className="size-12 rounded-xl bg-white text-purple-600 flex items-center justify-center shrink-0 shadow-lg">
              <School className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-white">Smart Tracking</h3>
              <p className="text-sm text-purple-100">
                Attendance, grades, and assignments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-default">
            <div className="size-12 rounded-xl bg-white text-purple-600 flex items-center justify-center shrink-0 shadow-lg">
              <CalendarCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-white">Events & News</h3>
              <p className="text-sm text-purple-100">
                Stay updated with school activities.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl overflow-hidden h-40 relative group border border-white/20 shadow-2xl">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <p className="text-xs font-medium text-purple-200 uppercase tracking-wider mb-1">
                Campus Life
              </p>
              <p className="text-white font-bold">Explore our Facilities</p>
            </div>
            <Button
              size="icon"
              className="size-8 rounded-full bg-white/20 backdrop-blur hover:bg-white hover:text-purple-600 transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
