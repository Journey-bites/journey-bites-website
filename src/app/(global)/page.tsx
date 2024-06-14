import Image from 'next/image';
import Link from 'next/link';
import CreatorList from '@/components/CreatorList';
import PopularAreas from '@/components/PopularAreas';
import Content from './@content/page';
import { Button } from '@/components/ui/button';

import BannerImg from '@/images/banner.webp';
import BannerSmImg from '@/images/banner-sm.webp';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <section className='relative md:max-w-[94%] md:self-end 2xl:max-w-[1800px]'>
        <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-white md:left-[11.7%] md:top-[38%] md:translate-y-0 md:text-left'>
          <h1 className='mb-3 md:mb-5'>探索無限創意的樂園</h1>
          <p className='mb-7 text-xl font-bold md:mb-9 md:text-3xl'>和我們一起發現、分享和創造</p>
          <Button asChild>
            <Link href=''>開始創作</Link>
          </Button>
        </div>
        <Image src={BannerImg} className='hidden md:block' alt='Journey Bites' />
        <Image src={BannerSmImg} className='md:hidden' alt='Journey Bites' />
      </section>
      <div className='mx-auto mt-20 grid max-w-[90%] grid-cols-12 gap-6 2xl:max-w-[1296px]'>
        <div className='col-span-12 xl:col-span-8'>
          <Content />
        </div>
        <div className='col-span-12 xl:col-span-4'>
          <CreatorList />
          <PopularAreas />
        </div>
      </div>
    </main>
  );
}
