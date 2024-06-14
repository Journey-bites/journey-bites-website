import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Image from 'next/image';
import { Button } from './ui/button';

import CurveImg from '@/images/long-curve.svg';

export default function CreatorList() {
  return (
    <div className='mb-9 rounded-lg border-2 p-9 shadow-outlineCard'>
      <div className='mb-7 flex justify-between'>
        <div>
          <h3 className='mb-3 text-3xl font-medium'>創作者列表</h3>
          <Image src={CurveImg} alt='creator list' />
        </div>
        <Button variant='outline' className='self-start'>查看更多</Button>
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
              <div className='pl-4'>
                <h4 className='mb-1 text-xl font-bold'>馬亞弗朗西斯</h4>
                <p className='line-clamp-2 text-grey-400'>瑪雅是一位對冒險充滿熱情的旅行者。她喜歡挑戰自己,瑪雅是一位對冒險充滿熱情的旅行者。她喜歡挑戰自己,探索世...</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
