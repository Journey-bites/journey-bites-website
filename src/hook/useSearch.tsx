'use client';

import type { KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function useSearch({ keywords }: { keywords: string }) {
  const router = useRouter();

  function handleSearch(e: KeyboardEvent<HTMLInputElement>, callback?: () => void) {
    if (e.key === 'Enter' || e.code === 'Enter') {
      e.preventDefault();
      const searchParams = new URLSearchParams();
      searchParams.set('q', keywords);
      router.push(`/search/article?${searchParams.toString()}`);

      if (typeof callback === 'function') {
        callback();
      }
    }
  }
  return {
    handleSearch
  };
}