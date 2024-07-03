'use client';

import Link from 'next/link';
import { useState } from 'react';
import { UsersIcon } from 'lucide-react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';
import { Button } from '@/components/ui/button';
import ProtectedComponent from '@/components/common/ProtectedComponent';
import { Creator, FollowData } from '@/types';
import { getCreatorFollowers } from '@/lib/nextApi';
import { followCreator, unFollowCreator } from '@/lib/authApi';

import DefaultUserImg from '@/images/default-user.webp';

export default function CreatorCard({ creator, hasFollowed }: { creator: Creator | FollowData, hasFollowed: boolean }) {
  const [followed, setFollowed] = useState(hasFollowed);
  const queryClient = useQueryClient();
  const { data: creatorFollowers, error } = useQuery({
    queryKey: [creator.userId],
    queryFn: () => getCreatorFollowers(creator.userId),
  });

  const { mutate: followCreatorMutate } = useMutation({
    mutationFn: followCreator,
    onMutate: () => setFollowed(true),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.following] }),
    onError: () => setFollowed(false),
  });

  const { mutate: unFollowCreatorMutate } = useMutation({
    mutationFn: unFollowCreator,
    onMutate: () => setFollowed(false),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.following] }),
    onError: () => setFollowed(true),
  });

  function handleFollow() {
    if (followed) {
      unFollowCreatorMutate(creator.userId);
    } else {
      followCreatorMutate(creator.userId);
    }
  }

  return (
    <Link href={`/creator/${creator.userId}`} className='flex flex-col justify-between rounded-lg border border-primary-100 bg-white p-5 text-grey-500 shadow-outlineCard'>
      <div className='mb-5 flex gap-5'>
        <Image src={creator.avatarImageUrl || DefaultUserImg} width={100} height={100} className='rounded-lg' alt={creator.displayName || 'creator'} />
        <div>
          <h3 className='mb-3 text-xl font-bold'>{creator.displayName}</h3>
          <div className='flex items-center gap-2'>
            <UsersIcon className='stroke-grey-400' />
            <span className='text-grey-400'>{error ? '0' : creatorFollowers?.length}</span>
          </div>
        </div>
      </div>
      {creator.bio && <p className='mb-5 rounded-lg bg-primary-100 p-4'>{creator.bio}</p>}
      <ProtectedComponent onClick={handleFollow}>
        <Button variant={followed ? 'outline' : 'default'} className='w-full'>{followed ? '追蹤中' : '追蹤'}</Button>
      </ProtectedComponent>
    </Link>
  );
}