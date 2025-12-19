'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { User, Badge, Mail, ArrowRight } from 'lucide-react';

export function SignUpForm() {
  const [role, setRole] = useState('Parent');
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-text-main">
          Create Account
        </h1>
        <p className="text-text-muted text-base">
          Join our digital campus community today.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Step {step} of 3
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Identity Verification
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="ml-1">I am a...</Label>
        <div className="grid grid-cols-3 gap-1 p-1.5 bg-slate-50 border border-slate-100 rounded-2xl">
          {['Parent', 'Student', 'Staff'].map((r) => (
            <label key={r} className="cursor-pointer relative">
              <input
                className="peer sr-only"
                name="role"
                type="radio"
                value={r}
                checked={role === r}
                onChange={(e) => setRole(e.target.value)}
              />
              <div className="h-12 w-full flex items-center justify-center rounded-xl text-sm font-semibold text-muted-foreground transition-all peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm peer-checked:ring-1 peer-checked:ring-black/5">
                {r}
              </div>
            </label>
          ))}
        </div>
      </div>

      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-2">
          <Label htmlFor="fullname" className="ml-1">
            Full Name
          </Label>
          <div className="relative group">
            <User className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="fullname"
              placeholder="e.g. Jane Doe"
              className="pl-12 h-12 bg-slate-50 border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="id_number" className="ml-1">
            Student / Staff ID
          </Label>
          <div className="relative group">
            <Badge className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="id_number"
              placeholder="e.g. S-2023-001"
              className="pl-12 h-12 bg-slate-50 border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="ml-1">
            Email Address
          </Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="email"
              type="email"
              placeholder="name@school.edu"
              className="pl-12 h-12 bg-slate-50 border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <Button
          onClick={handleContinue}
          className="mt-4 h-12 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] group"
        >
          <span>Continue Registration</span>
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>

      <div className="relative flex py-6 items-center">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">
          Or sign up with
        </span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      <div className="flex justify-center gap-4">
        {/* Google */}
        <Button
          variant="outline"
          size="icon"
          className="size-12 rounded-full border-border hover:border-primary hover:text-primary hover:shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.2 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" />
          </svg>
        </Button>

        {/* Microsoft */}
        <Button
          variant="outline"
          size="icon"
          className="size-12 rounded-full border-border hover:border-primary hover:text-primary hover:shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.4 24H0V12.6H11.4V24ZM24 24H12.6V12.6H24V24ZM11.4 11.4H0V0H11.4V11.4ZM24 11.4H12.6V0H24V11.4Z" />
          </svg>
        </Button>

        {/* Email */}
        <Button
          variant="outline"
          size="icon"
          className="size-12 rounded-full border-border hover:border-primary hover:text-primary hover:shadow-md"
        >
          <Mail className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Protected by reCAPTCHA and subject to the School{' '}
        <Link href="#" className="underline hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
