'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { FrownIcon } from 'lucide-react';
import { getArticles } from '@/lib/nextApi';
import LargeArticleCard from '@/components/article/LargeArticleCard';
import Loader from '@/components/custom/Loader';
import useSearch from '@/hook/useSearch';
import NoResults from '@/components/dashboard/NoResults';
import SearchSection from '@/components/searchPage/SearchSection';
import SearchTabs from '@/components/searchPage/SearchTabs';
import { QUERY_KEY } from '@/constants';

export default function ArticleSearchPage() {
  const searchParams = useSearchParams();
  const keywords = searchParams.get('q') || '';
  const [value, setValue] = useState(keywords);
  const { handleSearch } = useSearch({ keywords: value, type: 'article' });

  const { data: articles, isFetched, isLoading } = useQuery({
    queryKey: [QUERY_KEY.searchArticles],
    queryFn: () => getArticles({ q: value }),
  });

  if (isLoading) {
    return (
      <div className='flex min-h-[300px] items-center justify-center'>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <SearchSection value={value} setValue={setValue} handleSearch={handleSearch} results={articles} resultText='篇文章' queryKey={QUERY_KEY.searchArticles} />
      <div className='mx-auto mt-[58px] flex w-full flex-col gap-6 px-6 md:w-container'>
        <SearchTabs defaultValue='article' />
        {(isFetched && !articles?.length) ? (
          <NoResults title='目前沒有搜尋結果' icon={FrownIcon} />
        ) : (
          articles?.map((article) => (
            <LargeArticleCard key={article.id} article={article} />
          ))
        )}
      </div>
    </>
  );
}