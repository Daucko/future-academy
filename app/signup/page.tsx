import { SignUpHeader } from '@/components/signup-header';
import { SignUpForm } from '@/components/signup-form';
import { SignUpSidebar } from '@/components/signup-sidebar';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SignUpHeader />
      <main className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 flex justify-center p-6 lg:p-12 xl:p-20 overflow-y-auto bg-surface">
          <SignUpForm />
        </div>
        <SignUpSidebar />
      </main>
    </div>
  );
}
