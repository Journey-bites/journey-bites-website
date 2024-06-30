'use client';

import { ClipboardListIcon } from 'lucide-react';
import TabsWithContent from '@/components/dashboard/TabsWithContent';
import TitleWithIcon from '@/components/dashboard/TitleWithIcon';
import OrderCard from '@/components/order/OrderCard';
import { OrderStatus } from '@/types/enum';

export default function OrdersPage() {
  return (
    <section>
      <TitleWithIcon title='訂單記錄' icon={ClipboardListIcon} />
      <TabsWithContent
        defaultValue='completed'
        tabs={[
          {
            value: 'completed',
            label: '已付款',
            content: <OrderCard status={OrderStatus.COMPLETED} />
          },
          {
            value: 'pending',
            label: '未付款',
            content: <OrderCard status={OrderStatus.PENDING} />
          },
          {
            value: 'cancel',
            label: '退款',
            content: <OrderCard status={OrderStatus.CANCELED} />
          },
          {
            value: 'invalid',
            label: '付款失敗',
            content: <OrderCard status={OrderStatus.INVALID} />
          }]
        }
      />
    </section>
  );
}
