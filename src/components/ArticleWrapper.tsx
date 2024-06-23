'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type { Articles } from '@/types/article';
import ArticleContent from './ArticleContent';
import useGetPosts from '@/hook/useGetPosts';
import { ThumbsUp } from 'lucide-react';
import LoadingSkeleton from './LoadingSkeleton';

type Props = {
  posts: Articles[];
};

const PostsWrapper = ({ posts }: Props) => {
  const { ref, inView } = useInView({ threshold: 0, delay: 100 });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetPosts(posts);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
  <>
    <div className='relative mt-9 rounded-lg bg-primary-100'>
      <h1 className='flex w-[200px] justify-center gap-3 border-b-10 border-r-10 border-white bg-primary p-4 text-2xl text-white'>
          <ThumbsUp />
          推薦文章
        </h1>
      <div className='grid gap-x-4 gap-y-9 p-9 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'>
        {data?.pages.map((item, i) => (
          <React.Fragment key={i}>
            {item?.map((post) => (
              <ArticleContent post={post} key={post.id} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
    {isFetchingNextPage && hasNextPage ? (
        <LoadingSkeleton />
    ) : (
      <div className='h-10' ref={ref} />
    )}
  </>
  );
};

export default PostsWrapper;
