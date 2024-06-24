'use client';

import { useMutation } from '@tanstack/react-query';
import { followCreator } from '@/lib/authApi';
import ProtectedComponent from '../common/ProtectedComponent';
import { toast } from '../ui/use-toast';

export default function FollowBtn({ creatorId }: { creatorId: string }) {
  const { mutate: followCreatorMutate } = useMutation({ mutationFn: followCreator });

  function handleFollow() {
    followCreatorMutate(creatorId, {
      onSuccess: () => {
        toast({ title: '追蹤成功', variant: 'success' });
      },
      onError:  () => {
        toast({ title: '已追蹤過囉！', variant: 'error' });
      }
    });
  }

  return (
    <ProtectedComponent onClick={(handleFollow)}>
      <button className='text-primary'>追蹤</button>
    </ProtectedComponent>
  );
}