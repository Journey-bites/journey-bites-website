'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SendIcon, FrownIcon } from 'lucide-react';
import { formatDistance } from 'date-fns';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { zhTW } from 'date-fns/locale/zh-TW';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/providers/userProvider';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/common/UserAvatar';
import LoginLinkWithStorePathname from '@/components/common/LoginLinkWithStorePathname';
import { Form } from '@/components/ui/form';
import InputField from '@/components/custom/InputField';
import { addCommentToArticle } from '@/lib/authApi';
import { getCommentsByArticleId } from '@/lib/nextApi';
import { QUERY_KEY } from '@/constants';
import { toast } from '@/components/ui/use-toast';
import { debounce } from '@/lib/utils';

const formSchema = z.object({
  commentText: z.string().min(1, { message: '請輸入內容' }).max(100, { message: '最多只能輸入 100 個字' }),
});

export default function CommentSection({ articleId }: { articleId: string }) {
  const [showAll, setShowAll] = useState(false);
  const [initialVisibleCount, setInitialVisibleCount] = useState(1);
  const latestCommentRef = useRef<HTMLDivElement>(null);
  const toggleShowAll = () => {
    setShowAll(prev => !prev);
  };

  const { isLogin, auth } = useUserStore((state) => state);
  const queryClient = useQueryClient();
  const { data: comments } = useQuery({
    queryKey: [QUERY_KEY.comments],
    queryFn: () => getCommentsByArticleId(articleId),
  });
  const { mutate: addCommentMutate } = useMutation({
    mutationFn: addCommentToArticle,
    onMutate: () => {
      setShowAll(true);
      if (comments) setInitialVisibleCount(prev => prev + comments.length);
    }
  });
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      commentText: ''
    }
  });
  const { control, handleSubmit, formState: { isValid }, reset } = form;

  function onSubmit(data: FieldValues) {
    addCommentMutate({ articleId, content: data.commentText }, {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments] });
        latestCommentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      },
      onError: () => {
        toast({ title: '新增留言失敗', description: '請聯繫客服，或稍後再試', variant: 'error' });
      }
    });
  }

  const debounceSubmit = debounce(handleSubmit(onSubmit), 500);

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

        {comments.slice(0, initialVisibleCount).map((comment, index) => (
          <div key={comment.id} className='mb-4 rounded-lg bg-white p-4 shadow-outlineCard md:mb-6 md:p-6' ref={index === comments.length - 1 ? latestCommentRef : null}>
            <div className='flex gap-4'>
              <UserAvatar userName={comment.user.profile.displayName || ''} avatarImgUrl={comment.user.profile.avatarImageUrl} />
              <div>
                <div className='mb-2 flex flex-col text-xl font-bold md:flex-row'>
                  {comment.user.profile.displayName}
                  <span className='text-base font-normal text-grey-300 md:pl-4'>
                    {formatDistance(new Date(comment.updatedAt), new Date(), { addSuffix: true, locale: zhTW })}
                  </span>
                </div>
                <p className='mb-4 hidden text-lg md:block'>{comment.content}</p>
              </div>
            </div>
            <div className='md:hidden'>
              <p className='mb-4 text-base'>{comment.content}</p>
            </div>
          </div>
        ))}

        {comments.length > initialVisibleCount && (
          <Collapsible>
            <CollapsibleContent>
              {comments.slice(initialVisibleCount).map((comment) => (
                <div key={comment.id} className='mb-4 rounded-lg bg-white p-4 shadow-outlineCard md:mb-6 md:p-6'>
                  <div className='flex gap-4'>
                    <UserAvatar userName={comment.user.profile.displayName || ''} avatarImgUrl={comment.user.profile.avatarImageUrl} />
                    <div>
                      <div className='mb-2 flex flex-col text-xl font-bold md:flex-row'>
                        {comment.user.profile.displayName}
                        <span className='text-base font-normal text-grey-300 md:pl-4'>
                          {formatDistance(new Date(comment.updatedAt), new Date(), { addSuffix: true, locale: zhTW })}
                        </span>
                      </div>
                      <p className='mb-4 hidden text-lg md:block'>{comment.content}</p>
                    </div>
                  </div>
                  <div className='md:hidden'>
                    <p className='mb-4 text-base'>{comment.content}</p>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
            {!showAll && comments.length > initialVisibleCount && (
              <CollapsibleTrigger onClick={toggleShowAll} asChild>
                <div className='cursor-pointer text-center font-bold text-primary'>
                  {showAll ? `(${comments.length - initialVisibleCount})` : `顯示全部 (${comments.length - initialVisibleCount})`}
                </div>
              </CollapsibleTrigger>
            )}
          </Collapsible>
        )}

      </div>
      <div className='flex gap-2 border-t-2 border-grey-200 px-[18px] py-5'>
        {
          isLogin ? (
            <>
              <UserAvatar userName={auth?.profile.displayName || ''} avatarImgUrl={auth?.profile.avatarImageUrl} />
              <Form {...form}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    debounceSubmit();
                  }}
                  className='flex w-full gap-2'>
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
