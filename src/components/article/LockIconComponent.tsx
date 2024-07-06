import { LockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LockIconComponent({ className }: { className?: string }) {
  return (
    <div className={cn('z-10 absolute -top-6 right-2 flex size-9 items-center justify-center rounded-full bg-secondary p-2 text-white', className)}>
      <LockIcon />
    </div>
  );
}
