'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import SearchIcon from '@/components/icons/SearchIcon';
import useSearch from '@/hook/useSearch';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [keywords, setKeywords] = useState('');
  const { handleSearch } = useSearch({ keywords });

  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex items-center'>
      {!isOpen && (
        <button
          className='group pl-3'
          onClick={toggleSearchBar}
        >
          <SearchIcon className='group-hover:stroke-primary' />
        </button>
      )}
      <div
        className={`relative flex items-center transition-all duration-300 ease-in-out ${isOpen ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}
      >
        {isOpen && (
          <>
            <button
              className='absolute inset-y-0 left-0 z-10 flex items-center pl-3'
              onClick={toggleSearchBar}
            >
              <SearchIcon className='*:stroke-primary' />
            </button>
            <Input
              onChange={(e) => setKeywords(e.target.value)}
              onKeyDown={handleSearch}
              type='text'
              className='rounded-md border-gray-200 py-2 pl-10 pr-4 placeholder:text-gray-300 focus:outline-none'
              placeholder='Search'
            />
          </>
        )}
      </div>
    </div>
  );
}
