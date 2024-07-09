'use client';

import { SmileIcon, AlertTriangleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Separator } from '@radix-ui/react-separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import UserAvatar from '../common/UserAvatar';
import { cn } from '@/lib/utils';
import { Order } from '@/types';
import { toast } from '../ui/use-toast';

export default function OrderCard({ order }: { order: Order }) {
  const router = useRouter();

  function navigateToCreatorPage() {
    if (!order.seller) {
      return toast({ title: '查無此創作者', variant: 'error' });
    };
    router.push(`/creator/${order.seller.id}`);
  }

  return (
    <div
      className={cn('rounded-lg bg-secondary-100 lg:p-6 p-4', {
        'bg-danger-100': !order.isSuccess,
      })}
    >
      <div className='mb-4 flex flex-col gap-1 text-sm text-grey-400 md:mb-3 lg:flex-row lg:justify-between'>
        <h3 className='text-sm'>訂單編號：{order.orderNo}</h3>
        {order.payment && <span>訂單日期：{new Date(order.payment.createdAt).toLocaleDateString()}</span>}
      </div>
      <div className='mb-1 rounded-lg rounded-b-none bg-white p-4 lg:p-6'>
        {
          order.seller ? (
            <button className='w-full' onClick={navigateToCreatorPage}>
              <div className='flex items-center gap-2'>
                <UserAvatar avatarImgUrl={order.seller.profile.avatarImageUrl} userName={order.seller.profile.displayName || ''} />
                <h2 className='mb-1 text-lg font-bold lg:text-xl'>{order.seller.profile.displayName}</h2>
              </div>
              <p className='mt-2 break-words text-start text-sm text-grey-400 lg:text-base'>{order.seller.profile.bio}</p>
            </button>
          ): (
            <p>此筆訂單付款失敗，如需更多資訊，請洽客服</p>
          )
        }
        <div className='flex justify-end'>
          {order.payment && <div className='font-bold text-grey-500' >訂單金額：NT${order.payment.amount}</div>}
        </div>
      </div>
      <div className='rounded-lg rounded-t-none bg-white p-4 md:p-6'>
        <div className='flex items-center justify-between gap-10 py-2 text-grey-300 lg:justify-start'>
          <div className='flex flex-col gap-1 lg:flex-row lg:gap-10'>
            {order.isSuccess && (
              <>
                <div className='flex items-center gap-3'>
                  付款方式
                  <span className='text-sm text-grey-500 lg:text-lg lg:font-bold'>{order.payment?.paymentType}</span>
                </div>
                <Separator orientation='vertical' className='hidden h-11 w-[1px] bg-grey-200 lg:block' />
              </>
            )}
            {order.payment && (
              <>
                <div className='flex items-center'>
                  付款資訊
                  <span className='px-2 text-sm text-grey-500 lg:text-lg lg:font-bold'>
                    {`(${order.payment.payBankCode}) - ***** - ${order.payment.account5Code}`}
                  </span>
                </div>
                <Separator orientation='vertical' className='hidden h-11 w-[1px] bg-grey-200 lg:block' />
              </>
            )}
            <div className='flex items-center gap-3'>
              訂單狀態
              <span
                className={cn('flex items-center gap-1 lg:text-lg text-sm lg:font-bold text-secondary', {
                  'text-grey-400': !order.isSuccess,
                })}
              >
                {order.isSuccess ? '已完成' : '付款失敗'}
                {order.isSuccess ? <SmileIcon /> : (
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangleIcon />
                      </TooltipTrigger>
                      <TooltipContent side='bottom' align='start' className='rounded-xl rounded-tl-none border-2 border-grey-200 px-5 py-3 shadow-outlineCard'>
                        <p className='text-grey-400'>請於 7 天內聯繫客服付款，以免影響權益</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
