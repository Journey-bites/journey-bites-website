import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Image from 'next/image';

export default function CreatorList() {
  return (
    <div className='relative rounded-lg border-2 p-7'>
      <div className='mb-10'>
        <h3 className='text-3xl'>創作者列表</h3>
        <div className='absolute right-9 top-7 border-2 border-solid border-blue-600'>
          <a href='' className='block px-4 py-3 text-blue-500'>查看更多</a>
        </div>
      </div>
      {Array.from({ length: 5 }, (_, i) => i).map((item) => {
        return (
          <div key={item} className='after:block after:border-b-2 after:border-dotted after:border-grey-100 after:content-[""] after:last-of-type:border-b-0'>
            <div className='flex py-4'>
              <Avatar>
                <AvatarImage asChild src='https://picsum.photos/id//100/100'>
                  <Image src='https://picsum.photos/id/100/100' alt='logo' width={40} height={40} priority />
                </AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='flex flex-col pl-4'>
                <h4 className='text-xl font-bold'>馬亞弗朗西斯</h4>
                <p className='line-clamp-2 font-normal'>瑪雅是一位對冒險充滿熱情的旅行者。她喜歡挑戰自己,瑪雅是一位對冒險充滿熱情的旅行者。她喜歡挑戰自己,探索世...</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
