'use client';

import { useUserStore } from '@/providers/userProvider';
import useFollowCreator from '@/hook/useFollowCreator';
import ProtectedComponent from '@/components/common/ProtectedComponent';

export default function FollowBtn({ creatorId }: { creatorId: string }) {
  const { isFollowed, followAction } = useFollowCreator({ creatorId });
  const { auth } = useUserStore((state) => state);

  return (
    auth?.id !== creatorId && (
      <ProtectedComponent onClick={followAction}>
        <button className='text-primary'>{isFollowed ? '取消追蹤' : '追蹤'}</button>
      </ProtectedComponent>
    )
  );
}