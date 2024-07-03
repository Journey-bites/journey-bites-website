import 'client-only';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getArticles } from '@/lib/nextApi';
import { QUERY_KEY } from '@/constants';

export default function useGetPosts() {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.newArticle],
    queryFn: (page) => getArticles({ page: page.pageParam, pageSize: 4 }),
    initialPageParam: 2,
    getNextPageParam(lastPage, allpages, lastPageParam) {
      return lastPage.length > 0 ? lastPageParam + 1 : undefined;
    },
  });
}
