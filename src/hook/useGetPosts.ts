'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { Articles } from '@/types/article';
import { getArticles } from '@/lib/nextApi';

export default function useGetPosts(initialData: Articles[]) {
  return useInfiniteQuery<Articles[], Error>({
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
