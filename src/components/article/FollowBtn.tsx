'use client';

import { useMutation } from '@tanstack/react-query';
import { followCreator } from '@/lib/authApi';
import ProtectedComponent from '@/components/common/ProtectedComponent';
import { toast } from '@/components/ui/use-toast';
import { handleApiError } from '@/lib/utils';
import StatusCode from '@/types/StatusCode';

export default function FollowBtn({ creatorId }: { creatorId: string }) {
  const { mutate: followCreatorMutate } = useMutation({ mutationFn: followCreator });

  function handleFollow() {
    followCreatorMutate(creatorId, {
      onSuccess: () => {
        toast({ title: '追蹤成功', variant: 'success' });
      },
      onError: (error) => {
        handleApiError(error, {
          [StatusCode.DUPLICATE_FOLLOW]: () => {
            toast({ title: '已經追蹤過囉！', variant: 'warning' });
          },
          [StatusCode.ILLEGAL_PATH_PARAMETER]: () => {
            toast({ title: '不能追蹤自己哦！', variant: 'warning' });
          }
        }, '追蹤');
      }
    });
  }

  return (
    <ProtectedComponent onClick={(handleFollow)}>
      <button className='text-primary'>追蹤</button>
    </ProtectedComponent>
  );
}