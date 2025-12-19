import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { School, Menu } from 'lucide-react';

export function AdmissionsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-surface/80 backdrop-blur-md">
      <div className="px-4 md:px-10 py-3 flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary flex items-center justify-center">
            <School className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-text-main">
            Future Academy
          </h2>
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-9">
            <Link
              href="/admissions"
              className="text-sm font-bold text-primary transition-colors"
            >
              Admissions
            </Link>
            <Link
              href="/academics"
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              Academics
            </Link>
            <Link
              href="/campus"
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              Campus Life
            </Link>
            <Link
              href="/signin"
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              Portal Login
            </Link>
          </nav>
          <Link href="#application-form">
            <Button className="rounded-full px-6 hover:-translate-y-0.5 hover:shadow-glow transition-all">
              Apply Now
            </Button>
          </Link>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
