import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingEditorSkeleton() {
  return (
    <div className='mt-10 w-full text-center'>
      <div className='mx-auto size-full min-h-[500px] w-full max-w-screen-lg pb-10 text-center'>
        <Loader2 className='mx-auto size-6 animate-spin' />
        <Skeleton className='mx-auto mt-10 h-4 min-h-[500px] rounded' />
      </div>
    </div>
  );
}
