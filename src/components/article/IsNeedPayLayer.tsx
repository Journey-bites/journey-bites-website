'use client';

import useSubscribe from '@/hook/useSubscribe';
import ProtectedComponent from '../common/ProtectedComponent';
import ConfirmDialog from '../custom/ConfirmDialog';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useUserStore } from '@/providers/userProvider';

export default function IsNeedPayLayer({ creatorId }: { creatorId: string }) {
  const { auth } = useUserStore((state) => state);
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const { handleSubscribe, subscribePending, navigateToNewebpay } = useSubscribe({ creatorId, onSuccessCallback: () => setSubscribeDialogOpen(true) });

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