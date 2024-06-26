'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { cn, handleApiError, storeRedirectPath } from '@/lib/utils';
import ProtectedComponent from './ProtectedComponent';
import { likeArticle, unlikeArticle } from '@/lib/authApi';
import StatusCode from '@/types/StatusCode';
import { toast } from '../ui/use-toast';

type LikeButtonProps = {
  articleId: string;
  count: number;
  withBackground?: boolean;
}

export default function LikeButton({ articleId, count, withBackground }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(count);
  const router = useRouter();
  const pathname = usePathname();

  // Not the best way to do it, but currently don't know is Already liked or not, optimize in the future
  const { mutate: likeArticleMutate } = useMutation({
    mutationFn: likeArticle,
    onMutate: () => {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    },
    onError: (error) => {
      handleApiError(error, {
        [StatusCode.BAD_REQUEST]: () => {
          // Already liked, so unlike it
          unlikeArticleMutate({ articleId });
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
    }
  });

  const { mutate: unlikeArticleMutate } = useMutation({
    mutationFn: unlikeArticle,
    onMutate: () => {
      setIsLiked(false);
      setLikesCount((prev) => prev > 0 ? prev - 1 : 0);
    },
    onError: (error) => {
      handleApiError(error, {
        [StatusCode.BAD_REQUEST]: () => {
          // Not liked yet, so like it
          likeArticleMutate({ articleId });
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
    },
  });

  return (
    <ProtectedComponent onClick={() => likeArticleMutate({ articleId })}>
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
