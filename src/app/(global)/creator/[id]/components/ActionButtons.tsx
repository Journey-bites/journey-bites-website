'use client';

import { Button } from '@/components/ui/button';
import { useUserStore } from '@/providers/userProvider';
import { followCreator } from '@/lib/authApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

export default function ActionButtons({ creatorId }: { creatorId: string }) {
  const { isLogin } = useUserStore((state) => state);

  const { mutate: followCreatorMutate } = useMutation({ mutationFn: followCreator });

  const handleFollow = () => {
    followCreatorMutate(creatorId, {
      onSuccess: () => {
        // TODO: update button UI only, no need to show toast
        toast({ title: '追蹤成功', variant: 'success' });
      },
      onError: () => {
        toast({ title: '追蹤失敗', variant: 'error' });
      },
    });
  };

  if (!isLogin) return null;

  return (
    <div className='flex gap-3 md:self-start'>
      <Button variant='outline' className='flex-1 bg-transparent md:flex-initial' onClick={handleFollow}>追蹤</Button>
      <Button className='flex-1 md:flex-initial'>編輯</Button>
    </div>
  );
}
