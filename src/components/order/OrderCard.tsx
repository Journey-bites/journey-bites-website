'use client';

import type { ReactElement } from 'react';
import { type LucideIcon, SmileIcon, AlertTriangleIcon, Undo2Icon, CircleHelpIcon } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { OrderStatus } from '@/types/enum';
import { cn } from '@/lib/utils';

type OrderCardProps = {
  status: OrderStatus
}

type OrderStatusData = Record<OrderStatus,
  {
    label: string,
    icon: ReactElement<LucideIcon> | ReactElement,
    actionBtnText?: string
  }
>

const ORDER_STATUS_DATA_MAPPING: OrderStatusData = {
  [OrderStatus.COMPLETED]: {
    label: '已完成',
    icon: <SmileIcon />,
    actionBtnText: '發票詳情'
  },
  [OrderStatus.PENDING]: {
    label: '未付款',
    icon: (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger>
            <CircleHelpIcon />
          </TooltipTrigger>
          <TooltipContent side='bottom' align='start' className='rounded-xl rounded-tl-none border-2 border-grey-200 px-5 py-3 shadow-outlineCard'>
            <p className='text-grey-400'>請於 7 天內付款，以免影響權益</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    actionBtnText: '前往付款'
  },
  [OrderStatus.CANCELED]: {
    label: '已取消',
    icon: <Undo2Icon />,
  },
  [OrderStatus.INVALID]: {
    label: '付款失敗',
    icon: <AlertTriangleIcon />,
  },
};

export default function OrderCard({ status }: OrderCardProps) {
  return (
    <div
      className={cn('rounded-lg bg-secondary-100 lg:p-6 p-4', {
        'bg-grey-100': status === OrderStatus.CANCELED,
        'bg-warning-100': status === OrderStatus.PENDING,
        'bg-danger-100': status === OrderStatus.INVALID,
      })}
    >
      <div className='mb-4 flex flex-col gap-1 text-sm text-grey-400 md:mb-3 lg:flex-row lg:justify-between'>
        <h3 className='text-sm'>訂單編號：TW12312312</h3>
        <span>訂單日期：2022/01/01</span>
      </div>
      <div className='mb-1 rounded-lg rounded-b-none bg-white p-4 lg:p-6'>
        <h2 className='mb-1 text-lg font-bold lg:text-xl'>Render</h2>
        <div className='flex justify-between'>
          <p className='text-sm text-grey-400 lg:text-base'>Hi, 我是 Render，勵志每天發文給讀者最好的文章</p>
          <div className='font-bold text-grey-500' >NT$150/月</div>
        </div>
      </div>
      <div className='rounded-lg rounded-t-none bg-white p-4 md:p-6'>
        <div className='flex items-center justify-between gap-10 py-2 text-grey-300 lg:justify-start'>
          <div className='flex flex-col lg:flex-row lg:gap-10'>
            {status === OrderStatus.COMPLETED && (
              <>
                <div className='flex items-center gap-3'>
                  付款方式
                  <span className='text-sm lg:text-xl lg:font-bold'>ATM</span>
                </div>
                <Separator orientation='vertical' className='hidden h-11 w-[1px] bg-grey-200 lg:block' />
              </>
            )}
            <div className='flex items-center gap-3'>
              訂單狀態
              <span
                className={cn('flex items-center gap-1 lg:text-xl text-sm lg:font-bold text-secondary', {
                  'text-danger': status === OrderStatus.INVALID,
                  'text-warning': status === OrderStatus.PENDING,
                  'text-grey-400': status === OrderStatus.CANCELED,
                })}
              >
                {ORDER_STATUS_DATA_MAPPING[status].label}
                {ORDER_STATUS_DATA_MAPPING[status].icon}
              </span>
            </div>
          </div>
          {ORDER_STATUS_DATA_MAPPING[status].actionBtnText && (
            <>
              <Separator orientation='vertical' className='hidden h-11 w-[1px] bg-grey-200 lg:block' />
              <Button size='sm' variant='outline'>{ORDER_STATUS_DATA_MAPPING[status].actionBtnText}</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
