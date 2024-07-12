'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants';
import { getCommentsByArticleId } from '@/lib/nextApi';
import CommentList from './CommentList';
import AddCommentForm from './AddCommentForm';
import CommentSkeleton from './CommentSkeleton';

type Props = {
  articleId: string;
};

const CommentSection = ({ articleId }: Props) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: [QUERY_KEY.comments, articleId],
    queryFn: () => getCommentsByArticleId(articleId),
  });

  return (
    <section className='overflow-hidden border-2 border-x-0 border-grey-200 text-grey-500 md:rounded-lg md:border-x-2'>
      <div className='bg-grey bg-comment-texture bg-[length:40px] bg-repeat px-3 py-5 md:p-10'>
        <h3 className='mb-6'>
          回應
          {comments && (
            <small className='pl-2 text-lg text-grey-300'>({comments.length})</small>
          )}
        </h3>
        {isLoading && (
          <div className='pb-6'>
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        )}
        {comments && <CommentList data={comments} />}
      </div>
      <div className='flex gap-2 border-t-2 border-grey-200 px-[18px] py-5'>
        <AddCommentForm articleId={articleId} />
      </div>
    </section>
  );
};

export default CommentSection;
