'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/providers/userProvider';
import { followCreator, unFollowCreator } from '@/lib/authApi';
import { useMutation } from '@tanstack/react-query';

export default function ActionButtons({ creatorId, userAlreadyFollowed }: { creatorId: string, userAlreadyFollowed?: boolean }) {
  const { isLogin } = useUserStore((state) => state);
  const { mutate: followCreatorMutate } = useMutation({ mutationFn: followCreator, onMutate: () => setIsFollowd(true) });
  const { mutate: unFollowCreatorMutate } = useMutation({ mutationFn: unFollowCreator, onMutate: () => setIsFollowd(false) });
  const [isFollowed, setIsFollowd] = useState(userAlreadyFollowed);

  const handleFollow = () => {
    if (isFollowed) {
      unFollowCreatorMutate(creatorId, {
        onError: () => {
          setIsFollowd(false);
        },
      });
    } else {
      followCreatorMutate(creatorId, {
        onError: () => {
          setIsFollowd(true);
        },
      });
    }
  };

  if (!isLogin) return null;

  return (
    <div className='flex gap-3 md:self-start'>
      <Button variant='outline' className='flex-1 bg-transparent md:flex-initial' onClick={handleFollow}>
        {isFollowed ? '追蹤中' : '追蹤'}
      </Button>
      {/* TODO: show edit button only if user is creator */}
      <Button className='flex-1 md:flex-initial'>編輯</Button>
    </div>
  );
}
