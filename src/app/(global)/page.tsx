import Image from 'next/image';
import BannerImg from '@/images/banner.webp';
import CreatorList from '@/components/CreatorList';
import PopularAreas from '@/components/PopularAreas';
import Content from './@content/page';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <Image src={BannerImg} alt='journey bites' />
      <div className='mx-auto mt-20 grid max-w-[90%] grid-cols-12 gap-6'>
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
