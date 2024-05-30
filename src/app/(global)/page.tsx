import Image from 'next/image';
import BannerImg from '@/images/banner.webp';
import CreatorList from '@/components/CreatorList';
import PopularAreas from '@/components/PopularAreas';
import Content from './@content/page';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Image
        src={BannerImg}
        alt='journey bites'
      />
      <div className='mx-auto md:max-w-1024 lg:max-w-1024 xl:max-w-1024 2xl:max-w-1280'>
        <div className='grid'>
          <div className='grid grid-cols-12'>
            <div className='sm:col-span-12 sm:px-3 md:col-span-12 md:px-3 lg:col-span-8 xl:col-span-8 2xl:col-span-8 xs:col-span-12 xs:px-3'>
              <Content />
            </div>
            <div className='sm:col-span-12 sm:px-3 md:col-span-12 md:ml-6 md:px-3 lg:col-span-4 lg:ml-6 xl:col-span-4 xl:ml-6 2xl:col-span-4 2xl:ml-6 xs:col-span-12 xs:px-3'>
              <CreatorList />
              <PopularAreas />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
