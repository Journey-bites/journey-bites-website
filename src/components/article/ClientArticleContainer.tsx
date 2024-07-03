'use client';

import useGetPosts from '@/hook/useGetPosts';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SmallArticleCard from './SmallArticleCard';
import LoadingSkeleton from '../LoadingSkeleton';

export default function ClientArticleContainer() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading, error } = useGetPosts();
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (error || !data) return null;

  return (
    <div className='hidden grid-cols-1 gap-4 rounded-lg rounded-t-none bg-primary-100 px-3 pb-2 md:-mt-2 md:grid-cols-2 md:p-9 md:pt-2 lg:grid'>
      {isLoading && <LoadingSkeleton cardNum={2} />}
      {data.pages.map((item, i) => (
        <Fragment key={i}>
          {item.map((post) => (
            <SmallArticleCard key={post.id} article={post} />
          ))}
          {!item.length && <p className='col-span-2 mt-3 text-center text-xl text-grey-400'>已經到底拉～</p>}
        </Fragment>
      ))}
      {isFetchingNextPage && hasNextPage && <LoadingSkeleton cardNum={2} />}
      <div ref={ref}></div>
    </div>
  );
}
