import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SignUpHeader() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-border px-6 lg:px-10 py-4 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="size-9 text-primary">
          {/* Custom diamond/hexagon logo */}
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-lg transform rotate-45"></div>
            <div className="absolute inset-2 bg-white rounded-sm"></div>
          </div>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-text-main">
          School Portal
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm font-medium text-text-muted">
          Already a member?
        </span>
        <Link href="/signin">
          <Button
            variant="outline"
            className="rounded-full h-10 px-6 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
          >
            Log In
          </Button>
        </Link>
      </div>
    </header>
  );
}
