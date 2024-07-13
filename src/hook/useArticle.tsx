import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { QUERY_KEY } from '@/constants';
import { getArticleById } from '@/lib/nextApi';
import { likeArticle, unlikeArticle } from '@/lib/authApi';
import { handleApiError, storeRedirectPath } from '@/lib/utils';
import { useUserStore } from '@/providers/userProvider';
import { Article } from '@/types/article';
import StatusCode from '@/types/StatusCode';

const useArticle = (articleId: string) => {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { auth, setAuth } = useUserStore((state) => state);

  useEffect(() => {
    setIsLiked(!!auth?.likedArticles.includes(articleId));
  }, [auth, articleId]);

  const queryKey = [QUERY_KEY.article, articleId];

  const errorHandlers = () => ({
    [StatusCode.PERMISSION_DENIED]: () => {
      toast({
        title: '請重新登入',
        description: '三秒後將跳轉至登入頁面',
        variant: 'error',
      });
      storeRedirectPath(pathname);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    },
  });

  const optimisticUpdateLikeStatus = (isLiked: boolean) => {
    if (!article) return;

    const newLikedCount = article.status.likes + (isLiked ? 1 : -1);
    const status = { ...article.status, likes: newLikedCount };
    queryClient.setQueryData(queryKey, {
      ...article,
      status,
    });
    setIsLiked(isLiked);
  };

  const {
    data: article,
    isPending,
    isFetching,
  } = useQuery({
    queryKey,
    queryFn: () => getArticleById(articleId),
  });

  const { mutate: likeArticleMutate, isPending: likePending } = useMutation({
    mutationFn: () => likeArticle({ articleId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<Article | undefined>(queryKey);

      optimisticUpdateLikeStatus(true);

      return { previousData };
    },
    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      handleApiError(error, { ...errorHandlers });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      setAuth();
    },
  });

  const { mutate: unlikeArticleMutate, isPending: unLikePending } = useMutation({
    mutationFn: () => unlikeArticle({ articleId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<Article | undefined>(queryKey);

      optimisticUpdateLikeStatus(false);

      return { previousData };
    },
    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      handleApiError(error, { ...errorHandlers });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      setAuth();
    },
  });

  return {
    isLiked,
    article,
    isPending,
    isFetching,
    likeArticleMutate,
    unlikeArticleMutate,
    isMutating: likePending || unLikePending || isFetching,
  };
};

export default useArticle;
