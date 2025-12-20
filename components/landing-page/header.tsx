import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { School, Menu, CircleUser, LayoutDashboard } from 'lucide-react';
import { auth } from '@/auth';

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[1280px] px-4 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-purple-50 rounded-xl text-primary flex items-center justify-center">
              <School className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-text-main">
              Future Academy
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
              >
                Academics
              </Link>
              <Link
                href="/admissions"
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
              >
                Admissions
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
              >
                Campus Life
              </Link>
            </nav>
            <div className="h-6 w-px bg-slate-200"></div>
            {session ? (
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors flex items-center gap-2"
              >
                <LayoutDashboard className="h-5 w-5" />
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/signin"
                className="text-sm font-semibold text-text-main hover:text-primary transition-colors flex items-center gap-2"
              >
                <CircleUser className="h-5 w-5" />
                Portal Login
              </Link>
            )}
            <Button className="bg-primary hover:bg-primary-hover text-white h-11 px-7 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-primary/20">
              Apply Now
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
