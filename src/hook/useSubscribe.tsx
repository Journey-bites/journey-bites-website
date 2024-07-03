'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { subscribeCreator } from '@/lib/authApi';
import { handleApiError, startNewebPayment } from '@/lib/utils';
import StatusCode from '@/types/StatusCode';
import { useMutation } from '@tanstack/react-query';
import type { NewebpayRequestData } from '@/types';

type useSubscribeProps = {
  creatorId: string;
  onSuccessCallback: () => void
}

export default function useSubscribe({ creatorId, onSuccessCallback }: useSubscribeProps) {
  const { mutate: subscribeCreatorMutate, isPending: subscribePending } = useMutation({ mutationFn: subscribeCreator });
  const [newebPaymentData, setNewebPaymentData] = useState<NewebpayRequestData>();
  const router = useRouter();

  const handleSubscribe = () => {
    subscribeCreatorMutate(creatorId, {
      onSuccess: async (data) => {
        onSuccessCallback();
        setNewebPaymentData(data);
      },
      onError: (error) => {
        handleApiError(error, {
          [StatusCode.DUPLICATE_SUBSCRIPTION]: () => {
            toast({ title: '已經訂閱過啦～', description: '請到訂單管理確認', variant: 'warning' });
          },
          [StatusCode.USER_NOT_FOUND]: () => {
            toast({ title: '查無此創作者', description: '請聯絡客服', variant: 'error' });
          },
          [StatusCode.USER_NOT_AUTHORIZED]: () => {
            toast({ title: '請重新登入', description: '將為您轉往登入頁面', variant: 'error' });
            setTimeout(() => {
              router.push('/login');
            }, 2000);
          },
          [StatusCode.ILLEGAL_PATH_PARAMETER]: () => {
            toast({ title: '不能訂閱自己哦！', variant: 'warning' });
          }
        }, '建立訂單失敗');
      }
    });
  };

  const navigateToNewebpay = () => {
    if (!newebPaymentData) {
      return toast({ title: '無訂單資料', description: '請聯絡客服', variant: 'error' });
    }
    startNewebPayment(newebPaymentData);
  };

  return {
    handleSubscribe,
    navigateToNewebpay,
    subscribePending
  };
}