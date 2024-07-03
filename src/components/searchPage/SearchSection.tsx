'use client';

import type { KeyboardEvent } from 'react';
import { Article } from '@/types/article';
import { Category, Creator } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

type SearchSectionProps = {
  value: string;
  resultText: string;
  queryKey?: string;
  results?: Article[] | Category[] | Creator[];
  setValue: (value: string) => void;
  handleSearch: (e: KeyboardEvent<HTMLInputElement>, callback?: (() => void) | undefined) => void
}

export default function SearchSection({ value, setValue, handleSearch, results, resultText, queryKey }: SearchSectionProps) {
  const queryClient = useQueryClient();
  function search(e: KeyboardEvent<HTMLInputElement>) {
    handleSearch(e, () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  }
  return (
    <div className='flex justify-center bg-primary-100 pb-10 pt-15'>
      <div className='w-full px-6 md:w-container'>
        <div className='relative w-full'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <SearchIcon className='z-10 size-4' />
          </div>
          <Input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={search} type='search' placeholder='搜尋' className='w-full pl-10' />
        </div>
        <p className='mt-4 text-grey-300'>{`一共搜尋到 ${results?.length || 0} ${resultText}`}</p>
      </div>
    </div>
  );
}
