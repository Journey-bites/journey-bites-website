'use client';

import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import ProtectedComponent from './ProtectedComponent';
import { likeArticle } from '@/lib/authApi';

type LikeButtonProps = {
  articleId: string;
  count: number;
  withBackground?: boolean;
}

export default function LikeButton({ articleId, count, withBackground }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(count);

  // Not the best way to do it, but currently don't know is Already liked or not, optimize in the future
  const { mutate: likeArticleMutate } = useMutation({
    mutationFn: likeArticle,
    onMutate: () => {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          // Already liked, so unlike it
          unlikeArticleMutate({ articleId });
        } else {
          setIsLiked(false);
        }
      }
      setIsLiked(false);
    }
  });

  const { mutate: unlikeArticleMutate } = useMutation({
    mutationFn: likeArticle,
    onMutate: () => {
      setIsLiked(false);
      setLikesCount((prev) => prev > 0 ? prev - 1 : 0);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          // not liked already, so like it
          likeArticleMutate({ articleId });
        } else {
          setIsLiked(false);
        }
      }
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
