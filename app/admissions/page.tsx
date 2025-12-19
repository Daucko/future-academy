import { AdmissionsHeader } from '@/components/admissions-header';
import { AdmissionsHero } from '@/components/admissions-hero';
import { AdmissionsProcess } from '@/components/admissions-process';
import { AdmissionsDocuments } from '@/components/admissions-documents';
import { AdmissionsForm } from '@/components/admissions-form';
import { Footer } from '@/components/footer';
import { FloatingChatButton } from '@/components/floating-chat-button';

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
