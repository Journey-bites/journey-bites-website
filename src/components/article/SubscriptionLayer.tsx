'use client';

import { useState } from 'react';
import { useUserStore } from '@/providers/userProvider';
import useSubscribe from '@/hook/useSubscribe';
import ProtectedComponent from '@/components/common/ProtectedComponent';
import ConfirmDialog from '@/components/custom/ConfirmDialog';
import { Button } from '@/components/ui/button';

export default function SubscriptionLayer({ creatorId }: { creatorId: string }) {
  const { auth } = useUserStore((state) => state);
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const { handleSubscribe, subscribePending, navigateToNewebpay } = useSubscribe({ creatorId, onSuccessCallback: () => setSubscribeDialogOpen(true) });

  const hasSubscribed = !!auth?.subscriptions.includes(creatorId);

  if (hasSubscribed || auth?.id === creatorId) return null;

  return (
    <>
      <div className='flex justify-center bg-gradient-to-t from-primary-100 to-white py-9'>
        <ProtectedComponent onClick={handleSubscribe}>
          <Button size='sm' isLoading={subscribePending}>訂閱即可解鎖閱讀</Button>
        </ProtectedComponent>
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