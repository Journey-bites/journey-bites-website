import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className='w-full m-auto my-20'>
      <h1 className='text-2xl font-semibold mb-2 text-center'>Loading...</h1>
      <div className='grid grid-cols-2 gap-8'>
        {Array.from({ length: 4 }, (_, i) => i).map((item) => {
          return (
            <Card key={item}>
              <CardContent>
                <div className='flex'>
                  <div className='w-2/3 mr-2'>
                    <Skeleton className='w-1/2 h-5 mb-4' />
                    <Skeleton className='w-full h-5 mb-2' />
                    <Skeleton className='w-full h-5 mb-2' />
                  </div>
                  <div className='w-1/3'>
                    <Skeleton className='w-full h-[100px]' />
                  </div>
                </div>
              </CardContent>
              <CardFooter className='mt-2'>
                <Skeleton className='w-10 h-10 rounded-full' />
                <Skeleton className='w-[100px] h-5 ml-2' />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
