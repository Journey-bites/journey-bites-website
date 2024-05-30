import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className='m-auto my-20 w-full'>
      <h1 className='mb-2 text-2xl font-semibold'>Loading...</h1>
      <div className='grid grid-cols-2 gap-8'>
        {Array.from({ length: 6 }, (_, i) => i).map((item) => {
          return (
            <Card key={item}>
              <CardContent>
                <div className='flex'>
                  <div className='mr-2 w-2/3'>
                    <Skeleton className='mb-4 h-5 w-1/2' />
                    <Skeleton className='mb-2 h-5 w-full' />
                    <Skeleton className='mb-2 h-5 w-full' />
                  </div>
                  <div className='w-1/3'>
                    <Skeleton className='h-[100px] w-full' />
                  </div>
                </div>
              </CardContent>
              <CardFooter className='mt-2'>
                <Skeleton className='size-10 rounded-full' />
                <Skeleton className='ml-2 h-5 w-[100px]' />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
