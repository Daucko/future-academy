import { AdmissionsHeader } from '@/components/admissions/admissions-header';
import { AdmissionsHero } from '@/components/admissions/admissions-hero';
import { AdmissionsProcess } from '@/components/admissions/admissions-process';
import { AdmissionsDocuments } from '@/components/admissions/admissions-documents';
import { AdmissionsForm } from '@/components/admissions/admissions-form';
import { Footer } from '@/components/landing-page/footer';
import { FloatingChatButton } from '@/components/landing-page/floating-chat-button';

export default function AdmissionsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <AdmissionsHeader />
      <main>
        <AdmissionsHero />
        <AdmissionsProcess />
        <AdmissionsDocuments />
        <AdmissionsForm />
      </main>
      <Footer />
      <FloatingChatButton />
    </div>
  );
}
