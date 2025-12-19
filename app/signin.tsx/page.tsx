import { SignInForm } from '@/components/signin/signin-form';
import { SignInSidebar } from '@/components/signin/signin-sidebar';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full">
      <SignInSidebar />
      <div className="w-full lg:w-7/12 flex flex-col relative overflow-y-auto">
        <div className="lg:hidden p-6 flex items-center gap-2">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]">
              school
            </span>
          </div>
          <span className="font-bold text-lg text-foreground">
            Future Academy
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
