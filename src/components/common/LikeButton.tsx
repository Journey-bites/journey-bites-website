'use client';

import { HeartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import useArticle from '@/hook/useArticle';
import { cn } from '@/lib/utils';
import ProtectedComponent from './ProtectedComponent';

type LikeButtonProps = {
  articleId: string;
  count: number;
  withBackground?: boolean;
};

export default function LikeButton({
  articleId,
  count,
  withBackground,
}: LikeButtonProps) {
  const { isLiked, article, likeArticleMutate, unlikeArticleMutate, isMutating } =
    useArticle(articleId);

  const handleLikeArticle = () => {
    if (isMutating) {
      toast({
        title: '你的手速太快了',
        description: '請稍後再試',
        variant: 'warning',
      });
      return;
    }

    if (isLiked) {
      unlikeArticleMutate();
    } else {
      likeArticleMutate();
    }
  };

  return (
    <ProtectedComponent onClick={handleLikeArticle}>
      <Button
        variant={withBackground ? 'icon' : 'clean'}
        className={cn('group size-auto items-center justify-center gap-1', {
          ['bg-grey-100 p-2 hover:bg-grey-100']: withBackground,
        })}
      >
        <HeartIcon
          className={cn('size-6 stroke-danger group-hover:fill-danger', {
            ['fill-danger']: isLiked,
          })}
        />
        <span className='text-danger'>{article?.status.likes ?? count}</span>
      </Button>
    </ProtectedComponent>
  );
}
