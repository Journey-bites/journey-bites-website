import { Skeleton } from '@/components/ui/skeleton';

const CommentSkeleton = () => {
  return (
    <div className='mb-4 rounded-lg bg-white p-4 shadow-outlineCard md:mb-6 md:p-6'>
      <div className='flex gap-4'>
        <Skeleton className='size-10 rounded-full bg-slate-300' />
        <div className='h-20'>
          <Skeleton className='mb-2 h-7 w-24 bg-slate-300' />
          <Skeleton className='h-7 w-40 bg-slate-300' />
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
