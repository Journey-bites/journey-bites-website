'use client';

import Link from 'next/link';
import { SendIcon } from 'lucide-react';
import { useForm, type FieldValues } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LoginLinkWithStorePathname from '@/components/common/LoginLinkWithStorePathname';
import UserAvatar from '@/components/common/UserAvatar';
import InputField from '@/components/custom/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { useUserStore } from '@/providers/userProvider';
import { addCommentToArticle } from '@/lib/authApi';
import { debounce } from '@/lib/utils';
import { QUERY_KEY } from '@/constants';

type Props = {
  articleId: string;
};

const formSchema = z.object({
  commentText: z
    .string()
    .min(1, { message: '請輸入內容' })
    .max(100, { message: '最多只能輸入 100 個字' }),
});

const AddCommentForm = ({ articleId }: Props) => {
  const { auth } = useUserStore((state) => state);
  const queryClient = useQueryClient();

  const { mutate: addCommentMutate, isPending } = useMutation({
    mutationFn: addCommentToArticle,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, articleId] });
    },
    onError: () => {
      toast({
        title: '新增留言失敗',
        description: '請聯繫客服，或稍後再試',
        variant: 'error',
      });
    },
  });

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      commentText: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = form;

  const debounceSubmit = debounce(
    handleSubmit((data) => {
      addCommentMutate({ articleId, content: data.commentText });
    }),
    500,
  );

  if (!auth) {
    return (
      <p className='flex-1 py-2 text-center [&>a]:text-secondary'>
        如果需要留言，請先 <LoginLinkWithStorePathname /> 或{' '}
        <Link href='/register'>註冊會員</Link>
      </p>
    );
  }

  return (
    <>
      <UserAvatar
        userName={auth.profile.displayName || ''}
        avatarImgUrl={auth.profile.avatarImageUrl}
      />
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            debounceSubmit();
          }}
          className='flex w-full gap-2'
        >
          <div className='grow'>
            <InputField
              control={control}
              name='commentText'
              placeholder='留言...'
            />
          </div>
          <Button
            disabled={!isValid || isPending}
            type='submit'
            variant='icon'
            className='group shrink-0'
          >
            <SendIcon className='stroke-primary group-hover:stroke-primary-100' />
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddCommentForm;
