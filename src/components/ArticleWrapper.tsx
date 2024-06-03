'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type { Article } from '@/types/article';
import ArticleContent from './ArticleContent';
import useGetPosts from '@/hook/useGetPosts';
import { ThumbsUp } from 'lucide-react';
import Loading from '@/components/loading';

type Props = {
  posts: Article[];
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
  console.log(data);
  return (
  <>
    <div className='relative rounded-lg bg-primary-100 mt-9'>
      <h1 className='flex justify-center border-b-10 border-r-10 w-[200px] border-white text-2xl text-white gap-3 p-4 bg-primary'>
          <ThumbsUp />
          推薦文章
        </h1>
      <div className='grid p-9 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-4 gap-y-9'>
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
      <>
        <Loading />
      </>
    ) : (
      <div className='h-10' ref={ref} />
    )}
  </>
  );
};

export default PostsWrapper;
