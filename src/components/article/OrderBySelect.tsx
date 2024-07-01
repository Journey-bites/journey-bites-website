'use client';

import { OrderBy } from '@/types/enum';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type OrderBySelectProps = {
  orderBy: OrderBy
  setOrderBy: (value: OrderBy) => void
}

export default function OrderBySelect({ orderBy, setOrderBy }: OrderBySelectProps) {
  return (
    <Select value={orderBy} onValueChange={(value: OrderBy) => setOrderBy(value)}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='文章排序' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={OrderBy.DESC}>由新到舊</SelectItem>
        <SelectItem value={OrderBy.ASC}>由舊到新</SelectItem>
      </SelectContent>
    </Select>
  );
}