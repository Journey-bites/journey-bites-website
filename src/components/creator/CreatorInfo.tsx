import { cn } from '@/lib/utils';
import { InstagramIcon, FacebookIcon, EarthIcon } from 'lucide-react';
import { Creator } from '@/types';
import ActionButtons from '@/components/creator/ActionButtons';
import UserAvatar from '../common/UserAvatar';

type CreatorInfoProps = {
  creatorInfo: Partial<Creator>;
  articleCount?: number;
  bioClassName?: string;
}

export default function CreatorInfo({ creatorInfo, articleCount, bioClassName }: CreatorInfoProps) {
  return (
    <>
      <div className='flex flex-col justify-between gap-5 md:flex-row md:gap-0'>
        <div className='flex items-center gap-6'>
          <UserAvatar userName={creatorInfo.displayName || ''} avatarImgUrl={creatorInfo.avatarImageUrl} className='size-20' />
          <div>
          <h2 className='mb-2 text-3xl font-black'>{creatorInfo.displayName}</h2>
          {typeof articleCount === 'number' && <span className='pr-4 text-xl text-grey-400'>{articleCount} 文章</span>}
          <span className='text-xl text-grey-400'>{creatorInfo.followersCount} 追蹤</span>
          <div className='my-2 flex gap-2'>
            {creatorInfo.socialLinks?.instagram && (
              <a target='_blank' href={creatorInfo.socialLinks?.instagram} rel='noreferrer'>
                <InstagramIcon className='stroke-primary' />
              </a>
            )}
            {creatorInfo.socialLinks?.facebook && (
              <a target='_blank' href={creatorInfo.socialLinks?.facebook} rel='noreferrer'>
                <FacebookIcon className='stroke-primary' />
              </a>
            )}
            {creatorInfo.socialLinks?.website && (
              <a target='_blank' href={creatorInfo.socialLinks?.website} rel='noreferrer'>
                <EarthIcon className='stroke-primary' />
              </a>
            )}
          </div>
        </div>
      </div>
      {creatorInfo.userId && <ActionButtons creatorId={creatorInfo.userId} />}
      </div>
      {creatorInfo.bio && <p className={cn('mt-6 text-base font-medium text-grey-500 md:mt-9 md:text-xl', bioClassName)}>{creatorInfo.bio}</p>}
    </>
  );
}
