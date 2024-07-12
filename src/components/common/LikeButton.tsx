'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn, debounce, handleApiError, storeRedirectPath } from '@/lib/utils';
import ProtectedComponent from './ProtectedComponent';
import { likeArticle, unlikeArticle } from '@/lib/authApi';
import StatusCode from '@/types/StatusCode';
import { toast } from '@/components/ui/use-toast';
import { useUserStore } from '@/providers/userProvider';

type LikeButtonProps = {
  articleId: string;
  count: number;
  withBackground?: boolean;
}

const unlikeArticleAbortController = new AbortController();
const likeArticleAbortController = new AbortController();

export default function LikeButton({ articleId, count, withBackground }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(count);
  const { auth } = useUserStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: likeArticleMutate, isPending: likePending } = useMutation({
    mutationFn: likeArticle,
    onMutate: () => {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    },
    onError: (error) => {
      handleApiError(error, {
        [StatusCode.BAD_REQUEST]: () => {
          // Already liked, so unlike it
          unlikeArticleMutate({ articleId, signal: unlikeArticleAbortController.signal });
          toast({ title: '已經按過讚囉！', description: '已幫您自動收回讚', variant: 'warning' });
        },
        [StatusCode.RESOURCE_NOT_FOUND]: () => {
          toast({ title: '文章已被刪除', description: '有緣再相見QQ', variant: 'error' });
        },
        [StatusCode.PERMISSION_DENIED]: () => {
          toast({ title: '請重新登入', description: '三秒後將跳轉至登入頁面', variant: 'error' });
          storeRedirectPath(pathname);
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      });
      setIsLiked(false);
      setLikesCount((prev) => prev > 0 ? prev - 1 : 0);
    }
  });
  const { mutate: unlikeArticleMutate, isPending: unlikePending } = useMutation({
    mutationFn: unlikeArticle,
    onMutate: () => {
      setIsLiked(false);
      setLikesCount((prev) => prev > 0 ? prev - 1 : 0);
    },
    onError: (error) => {
      handleApiError(error, {
        [StatusCode.BAD_REQUEST]: () => {
          // Not liked yet, so like it
          likeArticleMutate({ articleId, signal: likeArticleAbortController.signal });
        },
        [StatusCode.RESOURCE_NOT_FOUND]: () => {
          toast({ title: '文章已被刪除', description: '有緣再相見QQ', variant: 'error' });
        },
        [StatusCode.PERMISSION_DENIED]: () => {
          toast({ title: '請重新登入', description: '三秒後將跳轉至登入頁面', variant: 'error' });
          storeRedirectPath(pathname);
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      });
      setIsLiked(false);
      setLikesCount((prev) => prev + 1);
    },
  });

  const handleLike = likePending ? () => likeArticleAbortController.abort() : debounce(() => likeArticleMutate({ articleId, signal: likeArticleAbortController.signal }));

  const handleUnlike = unlikePending ? () => unlikeArticleAbortController.abort() : debounce(() => unlikeArticleMutate({ articleId, signal: unlikeArticleAbortController.signal }));

  useEffect(() => {
    if (!auth) return;
    const alreadyLikedByUser = auth?.likedArticles.includes(articleId) || false;
    setIsLiked(alreadyLikedByUser);
  }, [auth, articleId]);

  return (
    <ProtectedComponent onClick={isLiked ? handleUnlike : handleLike}>
      <Button
        variant={withBackground ? 'icon' : 'clean'}
        className={cn('group size-auto items-center justify-center gap-1', { ['bg-grey-100 p-2 hover:bg-grey-100']: withBackground })}
      >
        <HeartIcon className={cn('size-6 stroke-danger group-hover:fill-danger', {
          ['fill-danger']: isLiked
        })} />
        <span className='text-danger'>{likesCount}</span>
      </Button>
    </ProtectedComponent>
  );
}
