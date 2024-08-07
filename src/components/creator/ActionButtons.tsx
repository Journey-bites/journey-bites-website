'use client';

import Link from 'next/link';
import { SmileIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProtectedComponent from '@/components/common/ProtectedComponent';
import { useUserStore } from '@/providers/userProvider';
import ConfirmDialog from '@/components/custom/ConfirmDialog';
import useSubscribe from '@/hook/useSubscribe';
import useFollowCreator from '@/hook/useFollowCreator';

export default function ActionButtons({ creatorId }: { creatorId: string }) {
  const { auth } = useUserStore((state) => state);
  const { isFollowed, followAction } = useFollowCreator({ creatorId });
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const { handleSubscribe, subscribePending, navigateToNewebpay } = useSubscribe({ creatorId, onSuccessCallback: () => setSubscribeDialogOpen(true) });

  const isUsersPage = auth?.id === creatorId;
  const hasSubscribed = !!auth?.subscriptions.includes(creatorId);

  return (
    <>
      <div className='flex gap-3 md:self-start'>
        {isUsersPage ? (
          <Button asChild className='flex-1 md:flex-initial'>
              <Link href={'/manage/user'}>編輯</Link>
            </Button>
        ) : (
          <>
            <ProtectedComponent onClick={followAction}>
              <Button variant='outline' className='flex-1 bg-transparent md:flex-initial'>
                {isFollowed ? '追蹤中' : '追蹤'}
              </Button>
              </ProtectedComponent>
              {hasSubscribed ? (
                <div className='flex items-center gap-1 text-secondary'>
                  已訂閱
                  <SmileIcon />
                </div>
                ) : (
                  <ProtectedComponent onClick={handleSubscribe}>
                    <Button className='flex-1 md:flex-initial' isLoading={subscribePending} disabled={subscribePending}>
                      訂閱支持
                    </Button>
                  </ProtectedComponent>
                )}
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
