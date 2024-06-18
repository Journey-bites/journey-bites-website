import Image from 'next/image';
import { Creator } from '@/types';
import ActionButtons from '@/components/creator/ActionButtons';
import { cn } from '@/lib/utils';

import DefaultUserImg from '@/images/default-user.webp';

export default function CreatorInfo({ creatorInfo, bioClassName }: { creatorInfo: Creator, bioClassName?: string }) {
  return (
    <>
      <div className='flex flex-col justify-between gap-5 md:flex-row md:gap-0'>
      <div className='flex items-center gap-6'>
        <Image className='size-20 rounded-full md:size-30' src={creatorInfo.avatarImageUrl || DefaultUserImg} alt={creatorInfo.displayName || 'creator'} width={120} height={120} priority />
          <div>
          <h2 className='mb-2 text-3xl font-black'>{creatorInfo.displayName}</h2>
          {/* <span className='pr-4 text-xl text-grey-400'>12 文章</span> */}
          <span className='text-xl text-grey-400'>{creatorInfo.followersCount} 追蹤</span>
        </div>
      </div>
      <ActionButtons creatorId={creatorInfo.userId} userAlreadyFollowed={creatorInfo.userAlreadyFollowed} />
      </div>
      {creatorInfo.bio && <p className={cn('mt-6 text-base font-medium text-grey-500 md:mt-9 md:text-xl', bioClassName)}>{creatorInfo.bio}</p>}
    </>
  );
}
