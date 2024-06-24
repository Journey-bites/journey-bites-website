import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Image from 'next/image';
import { Creator } from '@/types';

import CurveImg from '@/images/long-curve.svg';
import DefaultUserImg from '@/images/default-user.webp';

export default function CreatorList({ creatorList }: { creatorList: Creator[] }) {
  return (
    <div className='mb-9 rounded-lg border-2 p-9 shadow-outlineCard'>
      <div className='mb-7 flex justify-between'>
        <div>
          <h3 className='mb-3 text-3xl font-medium'>創作者列表</h3>
          <Image src={CurveImg} alt='creator list' />
        </div>
        {/* TODO: add it back when search page is ready */}
        {/* <Button variant='outline' className='self-start'>查看更多</Button> */}
      </div>
      {creatorList.map((item) => {
        return (
          <Link href={`/creator/${item.userId}`} key={item.userId} className='block after:block after:border-b-2 after:border-dotted after:border-grey-100 after:content-[""] after:last-of-type:border-b-0'>
            <div className='flex py-4'>
              <Avatar>
                <AvatarImage asChild src={item.avatarImageUrl || undefined}>
                  <Image src={item.avatarImageUrl || DefaultUserImg} alt={item.displayName || 'creator'} width={40} height={40} priority />
                </AvatarImage>
                <AvatarFallback>
                  <Image src={DefaultUserImg} alt={item.displayName || 'creator'} />
                </AvatarFallback>
              </Avatar>
              <div className='pl-4'>
                <h4 className='mb-1 text-xl font-bold'>{item.displayName}</h4>
                {item.bio && <p className='line-clamp-2 text-grey-400'>{item.bio}</p>}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
