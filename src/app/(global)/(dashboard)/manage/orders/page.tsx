'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ClipboardListIcon, TentTreeIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import TabsWithContent from '@/components/dashboard/TabsWithContent';
import TitleWithIcon from '@/components/dashboard/TitleWithIcon';
import OrderCard from '@/components/order/OrderCard';
import { getOrderByOrderNo, getOrders } from '@/lib/authApi';
import { QUERY_KEY } from '@/constants';
import { OrderStatus } from '@/types/enum';
import Loader from '@/components/custom/Loader';
import NoResults from '@/components/dashboard/NoResults';

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const orderNo = searchParams.get('orderNo') || '';
  const isSuccess = searchParams.get('success') === 'true' ? true : false;
  // ass string for TabWithContent props type check
  const [orderStatus, setOrderStatus] = useState(OrderStatus.SUCCESS as string);

  const { data: orders, isPending, error } = useQuery({
    queryKey: [QUERY_KEY.orders],
    queryFn: getOrders,
    select: (order) => {
      if (!order) return order;
      if (orderNo && isSuccess) {
        return order.filter((order) => order.orderNo === orderNo && order.isSuccess);
      }
      const successOrders = order.filter((order) => order.isSuccess);
      const failedOrders = order.filter((order) => !order.isSuccess);
      return orderStatus === OrderStatus.SUCCESS ? successOrders : failedOrders;
    }
  });

  const { data: order, isPending: getOrderPending, error: getOrderError, isFetched } = useQuery({
    queryKey: [QUERY_KEY.order],
    queryFn: () => getOrderByOrderNo(orderNo),
    enabled: !!orderNo
  });

  if (orderNo) {
    return (
      <>
        {getOrderPending && <Loader />}
        {getOrderError && <p>無此訂單</p>}
        {order && (
          <div className='flex flex-col gap-3'>
            {isSuccess && <h3 className='text-center text-grey-500'>訂單付款成功！以下為本次訂單資訊</h3>}
            <Link replace href='/manage/orders' className='text-center text-primary underline'>回到訂單管理</Link>
            <OrderCard order={order} />
          </div>
        )}
        {isFetched && !order && <NoResults title='無此訂單' icon={TentTreeIcon} />}
      </>
    );
  }

  if (isPending) return <Loader />;

  if (error) return <div>{error.message}</div>;

  function Orders() {
    return (
      orders?.length ? (
        <div className='flex flex-col gap-3 md:gap-6'>
          {orders?.map((order) => (
            <OrderCard key={order.orderNo} order={order} />
          ))}
        </div>
      ): (
          <NoResults title='目前尚無訂單' icon={TentTreeIcon} />
      )
    );
  }

  return (
    <section>
      <TitleWithIcon title='訂單記錄' icon={ClipboardListIcon} />
      <TabsWithContent
        onValueChange={setOrderStatus}
        defaultValue={orderStatus}
        tabs={[
          {
            value: OrderStatus.SUCCESS,
            label: '已付款',
            content: <Orders />
          },
          {
            value: OrderStatus.FAILED,
            label: '付款失敗',
            content: <Orders />
          }]
        }
      />
    </section>
  );
}
