'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export default function SearchInput() {
  return (
   <div className='relative w-full'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <SearchIcon className='z-10 size-4' />
      </div>
      <Input type='search' placeholder='搜尋' className='w-full pl-10' />
    </div>
  );
}
