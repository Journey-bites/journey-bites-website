'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProtectedComponent from '../common/ProtectedComponent';
import { useUserStore } from '@/providers/userProvider';
import { followCreator, subscribeCreator, unFollowCreator } from '@/lib/authApi';
import { useMutation } from '@tanstack/react-query';
import { startNewebPayment } from '@/lib/utils';
import ConfirmDialog from '../custom/ConfirmDialog';
import { NewebpayRequestData } from '@/types';
import { toast } from '../ui/use-toast';

export default function ActionButtons({ creatorId, userAlreadyFollowed }: { creatorId: string, userAlreadyFollowed?: boolean }) {
  const { auth } = useUserStore((state) => state);
  const { mutate: followCreatorMutate } = useMutation({ mutationFn: followCreator, onMutate: () => setIsFollowed(true) });
  const { mutate: unFollowCreatorMutate } = useMutation({ mutationFn: unFollowCreator, onMutate: () => setIsFollowed(false) });
  const [isFollowed, setIsFollowed] = useState(userAlreadyFollowed);
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const [newebPaymentData, setNewebPaymentData] = useState<NewebpayRequestData>();

  const { mutate: subscribeCreatorMutate, isPending: subscribePending } = useMutation({ mutationFn: subscribeCreator });

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

  const handleSubscribe = () => {
    subscribeCreatorMutate(creatorId, {
      onSuccess: async (data) => {
        setSubscribeDialogOpen(true);
        setNewebPaymentData(data);
      },
      onError: () => {
        toast({ title: '建立訂單失敗', description: '請聯絡客服或稍後再試', variant: 'error' });
      }
    });
  };

  const navigateToNewebpay = () => {
    if (!newebPaymentData) {
      return toast({ title: '無訂單資料', description: '請聯絡客服', variant: 'error' });
    }
    startNewebPayment(newebPaymentData);
  };

  const isUsersPage = auth?.id === creatorId;

  return (
    <>
      <div className='flex gap-3 md:self-start'>
        {isUsersPage ? (
          <Button asChild className='flex-1 md:flex-initial'>
              <Link href={'/manage/user'}>編輯</Link>
            </Button>
        ) : (
          <>
            <ProtectedComponent onClick={handleFollow}>
              <Button variant='outline' className='flex-1 bg-transparent md:flex-initial'>
                {isFollowed ? '追蹤中' : '追蹤'}
              </Button>
            </ProtectedComponent>
            <ProtectedComponent onClick={handleSubscribe}>
              <Button className='flex-1 md:flex-initial' isLoading={subscribePending} disabled={subscribePending}>
                訂閱
              </Button>
            </ProtectedComponent>
          </>
        )}
      </div>
      <ConfirmDialog
        isOpen={subscribeDialogOpen}
        onClose={() => setSubscribeDialogOpen(false)}
        title={`嘿，${auth?.profile.displayName}，感謝訂閱！`}
        description='點擊確認後將轉往藍新金流付款'
        onConfirm={navigateToNewebpay}
      />
    </>
  );
}
