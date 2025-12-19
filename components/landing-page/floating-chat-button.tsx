import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export function FloatingChatButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        size="icon"
        className="w-16 h-16 rounded-full shadow-glow hover:scale-110 transition-transform cursor-pointer"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
    </div>
  );
}
