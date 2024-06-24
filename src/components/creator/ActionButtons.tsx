'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/providers/userProvider';
import { followCreator, unFollowCreator } from '@/lib/authApi';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

export default function ActionButtons({ creatorId, userAlreadyFollowed }: { creatorId: string, userAlreadyFollowed?: boolean }) {
  const { isLogin, auth } = useUserStore((state) => state);
  const { mutate: followCreatorMutate } = useMutation({ mutationFn: followCreator, onMutate: () => setIsFollowed(true) });
  const { mutate: unFollowCreatorMutate } = useMutation({ mutationFn: unFollowCreator, onMutate: () => setIsFollowed(false) });
  const [isFollowed, setIsFollowed] = useState(userAlreadyFollowed);

  const handleFollow = () => {
    if (isFollowed) {
      unFollowCreatorMutate(creatorId, {
        onError: () => {
          setIsFollowed(false);
        },
      });
    } else {
      followCreatorMutate(creatorId, {
        onError: () => {
          setIsFollowed(true);
        },
      });
    }
  };

  if (!isLogin) return null;

  const isUsersPage = auth?.id === creatorId;

  return (
    <div className='flex gap-3 md:self-start'>
      {isUsersPage ? (
         <Button asChild className='flex-1 md:flex-initial'>
            <Link href={'/manage/user'}>編輯</Link>
          </Button>
      ) : (
         <Button variant='outline' className='flex-1 bg-transparent md:flex-initial' onClick={handleFollow}>
          {isFollowed ? '追蹤中' : '追蹤'}
        </Button>
      )}
    </div>
  );
}
