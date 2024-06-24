'use client';

import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { FrownIcon } from 'lucide-react';
import { getArticles } from '@/lib/nextApi';
import LargeArticleCard from '@/components/article/LargeArticleCard';
import SearchInput from '@/components/custom/SearchInput';
import Loader from '@/components/custom/Loader';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState(searchParams.get('q') || '');
  const keywords = searchParams.get('q') || '';

  const { data: articles, isFetched, isLoading } = useQuery({
    queryKey: ['search', keywords],
    queryFn: () => getArticles({ q: keywords }),
  });

  useLayoutEffect(() => {
    setValue(keywords);
  }, [keywords]);

  if (!keywords || (isFetched && !articles?.length)) {
    return (
      <div className='flex flex-col items-center justify-center gap-2'>
        <FrownIcon className='size-10 stroke-grey-500' />
        <p className='text-grey-500'>目前沒有搜尋結果</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex min-h-[300px] items-center justify-center'>
        <Loader />
      </div>
    );
  }

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const searchParams = new URLSearchParams();
      searchParams.set('q', value);
      router.push(`/search/article?${searchParams.toString()}`);
    }
  }

  return (
     <div>
      <div className='flex justify-center bg-primary-100 pb-10 pt-15'>
        <div className='w-full px-6 md:w-container'>
          <SearchInput value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleSearch} />
          <p className='mt-4 text-grey-300'>{`一共搜尋到 ${articles?.length} 篇文章`}</p>
        </div>
      </div>
      <div className='mx-auto mt-[58px] flex w-full flex-col gap-6 px-6 md:w-container'>
        {articles?.map((article) => (
          <LargeArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}