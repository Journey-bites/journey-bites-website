import { getArticles } from '@/lib/nextApi';
import ArticleCard from '@/components/ArticleCard';
import ArticleWrapper from '@/components/ArticleWrapper';

export default async function Content() {
  const posts = await getArticles({ pageParam: 1 });

  return (
    <>
      <ArticleCard color='secondary' type='hot' />
      <ArticleWrapper posts={posts} />
    </>
  );
}
