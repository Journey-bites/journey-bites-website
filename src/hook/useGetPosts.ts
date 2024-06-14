'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { Article } from '@/types/article';
import getArticles from '@/lib/actions';

export default function useGetPosts(initialData: Article[]) {
  return useInfiniteQuery<Article[], Error>({
    queryKey: ['recommendArticles'],
    queryFn: getArticles,
    initialData: { pages: [initialData], pageParams: [1] },
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
