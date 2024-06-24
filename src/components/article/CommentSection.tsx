'use client';

import Link from 'next/link';
import { SendIcon, FrownIcon } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { zhTW } from 'date-fns/locale/zh-TW';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/providers/userProvider';
import { Button } from '../ui/button';
import LikeButton from '../common/LikeButton';
import UserAvatar from '../common/UserAvatar';
import LoginLinkWithStorePathname from '../common/LoginLinkWithStorePathname';
import { FieldValues, useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import InputField from '../custom/InputField';
import { addCommentToArticle } from '@/lib/authApi';
import { getCommentsByArticleId } from '@/lib/nextApi';
import { QUERY_KEY } from '@/constants';
import { toast } from '../ui/use-toast';

export default function CommentSection({ articleId }: { articleId: string }) {
  const { isLogin, auth } = useUserStore((state) => state);
  const queryClient = useQueryClient();
  const { data: comments } = useQuery({
    queryKey: [QUERY_KEY.comments],
    queryFn: () => getCommentsByArticleId(articleId),
  });
  const { mutate: addCommentMutate } = useMutation({
    mutationFn: addCommentToArticle,
  });
  const form = useForm<FieldValues>({
    defaultValues: {
      commentText: ''
    }
  });
  const { control, handleSubmit, formState: { isValid } } = form;

  function onSubmit(data: FieldValues) {
    addCommentMutate({ articleId, content: data.commentText }, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments] });
      },
      onError: () => {
        toast({ title: '新增留言失敗', description: '請聯繫客服，或稍後再試', variant: 'error' });
      }
    });
  }

  if (!comments) return null;

  return (
    <section className='overflow-hidden border-2 border-x-0 border-grey-200 text-grey-500 md:rounded-lg md:border-x-2'>
      <div className='bg-grey bg-comment-texture bg-[length:40px] bg-repeat px-3 py-5 md:p-10'>
        <h3 className='mb-6'>
          回應
          <small className='pl-2 text-lg text-grey-300'>({comments?.length})</small>
        </h3>
        {
          comments.length === 0 && (
            <div className='flex min-h-[356px] flex-col items-center justify-center rounded-lg bg-white shadow-outlineCard'>
              <FrownIcon className='mb-2 stroke-grey-400' size={32} />
              <h4 className='mb-1 text-grey-400'>目前尚無回應</h4>
              <p className='text-base text-grey-300'>快成為第一個留言的人吧！</p>
            </div>
          )
        }
        {
          comments.length > 0 && (
            comments.map((comment) => (
              <div key={comment.id} className='mb-4 rounded-lg bg-white p-4 shadow-outlineCard md:mb-6 md:p-6'>
                <div className='flex gap-4'>
                  <UserAvatar userName={comment.user.profile.displayName || ''} avatarImgUrl={comment.user.profile.avatarImageUrl} />
                  <div>
                    <div className='mb-2 flex flex-col text-xl font-bold md:flex-row'>
                      {comment.user.profile.displayName}
                      <span className='text-base font-normal text-grey-300 md:pl-4'>{formatDistance(new Date(comment.updatedAt), new Date(), { addSuffix: true, locale: zhTW })}</span>
                    </div>
                    <p className='mb-4 hidden text-lg md:block'>{comment.content}</p>
                    <div className='hidden md:block'>
                      <LikeButton count={comment.likes} />
                    </div>
                  </div>
                </div>
                <div className='md:hidden'>
                  <p className='mb-4 text-base'>{comment.content}</p>
                  <LikeButton count={comment.likes} />
                </div>
              </div>
            ))
          )
        }
      </div>
      <div className='flex items-center gap-2 border-t-2 border-grey-200 px-[18px] py-5'>
        {
          isLogin ? (
            <>
              <UserAvatar userName={auth?.profile.displayName || ''} avatarImgUrl={auth?.profile.avatarImageUrl} />
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className='flex w-full gap-2'>
                  <div className='grow'>
                    <InputField
                      control={control}
                      name='commentText'
                      placeholder='留言...'
                    />
                  </div>
                  <Button disabled={!isValid} type='submit' variant='icon' className='group shrink-0'>
                    <SendIcon className='stroke-primary group-hover:stroke-primary-100' />
                  </Button>
                </form>
              </Form>
            </>
          ): (
              <p className='flex-1 text-center [&>a]:text-secondary'>如果需要留言，請先
                {' '}<LoginLinkWithStorePathname />
                {' '}
                或
                {' '}
                <Link href='/register'>註冊會員</Link>
              </p>
          )
        }
      </div>
    </section>
  );
}
