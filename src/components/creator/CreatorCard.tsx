'use client';

import Link from 'next/link';
import { UsersIcon } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';
import { Button } from '@/components/ui/button';
import ProtectedComponent from '@/components/common/ProtectedComponent';
import UserAvatar from '@/components/common/UserAvatar';
import { Creator, FollowData } from '@/types';
import { getCreatorFollowers } from '@/lib/nextApi';
import useFollowCreator from '@/hook/useFollowCreator';
import { useUserStore } from '@/providers/userProvider';

export default function CreatorCard({ creator }: { creator: Creator | FollowData }) {
  const { auth }= useUserStore((state) => state);
  const queryClient = useQueryClient();
  const { isFollowed, followAction } = useFollowCreator({
    creatorId: creator.userId,
    successCallback: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.following] }),
  });
  const { data: creatorFollowers, error } = useQuery({
    queryKey: [creator.userId],
    queryFn: () => getCreatorFollowers(creator.userId),
  });

  const isUser = auth?.id === creator.userId;

  return (
    <div className='flex flex-col justify-between rounded-lg border border-primary-100 bg-white p-5 text-grey-500 shadow-outlineCard'>
      <Link href={`/creator/${creator.userId}`} className='mb-5 flex gap-5'>
        <UserAvatar avatarImgUrl={creator.avatarImageUrl} userName={creator.displayName || ''} className='size-10 md:size-[100px]' />
        <div>
          <h3 className='mb-3 text-xl font-bold'>{creator.displayName}</h3>
          <div className='flex items-center gap-2'>
            <UsersIcon className='stroke-grey-400' />
            <span className='text-grey-400'>{error ? '0' : creatorFollowers?.length}</span>
          </div>
        </div>
      </Link>
      {creator.bio && <p className='mb-5 rounded-lg bg-primary-100 p-4'>{creator.bio}</p>}
      <ProtectedComponent onClick={followAction}>
        <Button disabled={isUser} variant={isFollowed ? 'outline' : 'default'} className='w-full'>{isFollowed ? '追蹤中' : '追蹤'}</Button>
      </ProtectedComponent>
    </div>
  );
}