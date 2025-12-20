'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Eye, EyeOff, User, Lock, HelpCircle, ArrowRight, Loader2 } from 'lucide-react';
import { login } from '@/server/auth';
import { useRouter } from 'next/navigation';

export function SignInForm() {
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await login({ email, password });
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-8 bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-white shadow-xl shadow-sky-100/50">
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          Sign In
        </h2>
        <p className="text-muted-foreground text-base">
          Access your portal to view grades, schedules, and tuition.
        </p>
      </div>

      <div className="w-full">
        <div className="flex p-1.5 bg-muted rounded-xl">
          {['parent', 'student', 'staff'].map((r) => (
            <label key={r} className="flex-1 cursor-pointer">
              <input
                className="peer sr-only"
                name="role"
                type="radio"
                value={r}
                checked={role === r}
                onChange={(e) => setRole(e.target.value)}
              />
              <div className="w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium text-muted-foreground transition-all peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm hover:text-foreground">
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </div>
            </label>
          ))}
        </div>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-xl">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email" className="ml-1">
            Email or Username
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              id="email"
              name="email"
              required
              placeholder="student@school.edu"
              className="pl-11 py-3.5 rounded-xl border-slate-200 focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              id="password"
              name="password"
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="pl-11 pr-12 py-3.5 rounded-xl border-slate-200 focus:ring-4 focus:ring-primary/10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-foreground transition-colors"
            >
              Remember me
            </Label>
          </div>
          <Link
            href="#"
            className="text-sm font-bold text-primary hover:text-primary-hover transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-2 py-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          New to the school?{' '}
          <Link
            href="/signup"
            className="font-bold text-primary hover:text-primary-hover transition-colors"
          >
            Create New Account
          </Link>
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <HelpCircle className="h-4 w-4" />
          Need help signing in?
        </Link>
      </div>
    </div>
  );
}
