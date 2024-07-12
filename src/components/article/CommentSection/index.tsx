'use client';

import { useQuery } from '@tanstack/react-query';
import { FrownIcon } from 'lucide-react';
import { QUERY_KEY } from '@/constants';
import { getCommentsByArticleId } from '@/lib/nextApi';
import CommentList from './CommentList';
import AddCommentForm from './AddCommentForm';

type Props = {
  articleId: string;
};

const CommentSection = ({ articleId }: Props) => {
  const { data: comments } = useQuery({
    queryKey: [QUERY_KEY.comments, articleId],
    queryFn: () => getCommentsByArticleId(articleId),
    initialData: [],
  });

  const commentCount = comments?.length ?? 0;

  return (
    <section className='overflow-hidden border-2 border-x-0 border-grey-200 text-grey-500 md:rounded-lg md:border-x-2'>
      <div className='bg-grey bg-comment-texture bg-[length:40px] bg-repeat px-3 py-5 md:p-10'>
        <h3 className='mb-6'>
          回應
          <small className='pl-2 text-lg text-grey-300'>({commentCount})</small>
        </h3>
        {commentCount === 0 ?
          <div className='flex min-h-[356px] flex-col items-center justify-center rounded-lg bg-white shadow-outlineCard'>
            <FrownIcon
              className='mb-2 stroke-grey-400'
              size={32}
            />
            <h4 className='mb-1 text-grey-400'>目前尚無回應</h4>
            <p className='text-base text-grey-300'>快成為第一個留言的人吧！</p>
          </div>
        : <CommentList data={comments} />}
      </div>
      <div className='flex gap-2 border-t-2 border-grey-200 px-[18px] py-5'>
        <AddCommentForm articleId={articleId} />
      </div>
    </section>
  );
};

export default CommentSection;
