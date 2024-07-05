'use client';

import { Fragment, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { PartyPopperIcon, ThumbsUpIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import LargeArticleCard from '@/components/article/LargeArticleCard';
import { getArticles } from '@/lib/nextApi';
import { QUERY_KEY } from '@/constants';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import useGetPosts from '@/hook/useGetPosts';

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const type = ['hot', 'new'].some((type) => type === searchParams.get('type')) ? searchParams.get('type') : '';
  const { data: articles, isPending, error } = useQuery({
    queryKey: [QUERY_KEY.typeArticles, type],
    queryFn: () => getArticles({ pageSize: 2, type: type || '' }),
  });
  const isHotType = type === 'hot';

  const { inView, ref } = useInView();

  const { data: moreArticles, fetchNextPage, isFetchingNextPage, hasNextPage, isPending: fetchNextPagePending } = useGetPosts(QUERY_KEY.typeArticles, 'hot');

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

  if (error) return <div>取得文章錯誤：{error.message}</div>;

  return (
    <div>
      <section className='bg-primary-100 py-12'>
        <div className='mx-auto flex w-container items-center gap-4 text-grey-400'>
          {isHotType ? <PartyPopperIcon className='stroke-primary' size={28} /> : <ThumbsUpIcon className='stroke-primary' size={28} />}
          <h2 className='font-semibold'>{isHotType ? '熱門文章' : '最新文章'}</h2>
        </div>
      </section>
      <section className='mx-auto mt-14 flex flex-col gap-6 px-6 lg:w-container'>
        {
          isPending ? <LoadingSkeleton cardNum={2} /> : (
            articles?.map((article) => (
              <LargeArticleCard key={article.id} article={article} showCreator showReadTime />
            ))
          )
        }
        {fetchNextPagePending && <LoadingSkeleton cardNum={2} />}
        {moreArticles?.pages.map((item, i) => (
          <Fragment key={i}>
            {item.map((post) => (
              <LargeArticleCard key={post.id} article={post} showCreator showReadTime />
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage && hasNextPage && <LoadingSkeleton cardNum={2} />}
        {!hasNextPage && <p className='col-span-2 mt-3 text-center text-xl text-grey-400'>已經到底拉～</p>}
        <div ref={ref}></div>
      </section>
    </div>
  );
}
