import Image from 'next/image';
import BannerImg from '@/images/banner.webp';
import CreatorList from '@/components/CreatorList';
import PopularAreas from '@/components/PopularAreas';
import Content from './@content/page';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Image src={BannerImg} alt='journey bites' />
      <div className='mx-auto max-w-1320'>
        <div className='grid'>
          <div className='grid grid-cols-12 md:px-3 lg:px-3 xl:px-3 2xl:px-3'>
            <div className='2xl:col-span-8xs:mt-9 xs::mt-9 sm:col-span-12 sm:mt-9 md:col-span-12 md:mt-9 lg:col-span-8 lg:mt-20 xl:col-span-8 xl:mt-20 2xl:mt-20 xs:col-span-12'>
              <Content />
            </div>
            <div className='mt-20 sm:col-span-12 sm:px-3 md:col-span-12 md:ml-6 md:px-3 lg:col-span-4 lg:ml-6 xl:col-span-4 xl:ml-6 2xl:col-span-4 2xl:ml-6 xs:col-span-12 xs:px-3'>
              <CreatorList />
              <PopularAreas />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
