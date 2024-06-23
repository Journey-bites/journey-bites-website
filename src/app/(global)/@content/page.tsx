import { getArticles } from '@/lib/nextApi';
import ArticlesContainer from '@/components/ArticlesContainer';
// import ArticleWrapper from '@/components/ArticleWrapper';

export default async function Content() {
  const hotArticles = await getArticles({ page: 1, pageSize: 4, type: 'hot' });

  return (
    <>
      <div className='mb-9'>
        <ArticlesContainer articles={hotArticles} showBtn color='secondary' type='hot' />
      </div>
      {/* <ArticlesContainer showBtn={false} color='primary' type='recommend' /> */}
      {/* TODO: Wait for random articles API to be ready and will planning refactor this Component */}
      {/* <ArticleWrapper posts={posts} /> */}
    </>
  );
}
