import 'client-only';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getArticles } from '@/lib/nextApi';
import { QUERY_KEY } from '@/constants';

export default function useGetPosts(queryKey?: string, type?: 'hot') {
  return useInfiniteQuery({
    queryKey: [queryKey || QUERY_KEY.newArticle],
    queryFn: (page) => getArticles({ pageSize: 4, type: type === 'hot' ? 'hot' : undefined, page: page.pageParam }),
    initialPageParam: 2,
    getNextPageParam(lastPage, _, lastPageParam) {
      return lastPage.length > 0 ? lastPageParam + 1 : undefined;
    },
  });
}
