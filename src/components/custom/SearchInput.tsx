'use client';

import type { ChangeEvent, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export default function SearchInput({ value, onChange, onKeyDown }: { value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void }) {
  return (
   <div className='relative w-full'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <SearchIcon className='z-10 size-4' />
      </div>
      <Input value={value} onChange={onChange} onKeyDown={onKeyDown} type='search' placeholder='搜尋' className='w-full pl-10' />
    </div>
  );
}
