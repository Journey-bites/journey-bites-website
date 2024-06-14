// import { getArticles } from '@/lib/nextApi';
import ArticlesContainer from '@/components/ArticlesContainer';
// import ArticleWrapper from '@/components/ArticleWrapper';

export default async function Content() {
  // const posts = await getArticles({ pageParam: 1 });

  return (
    <>
      <div className='mb-9'>
        <ArticlesContainer showBtn color='secondary' type='hot' />
      </div>
      <ArticlesContainer showBtn={false} color='primary' type='recommend' />
      {/* TODO: Wait for random articles API to be ready and will planning refactor this Component */}
      {/* <ArticleWrapper posts={posts} /> */}
    </>
  );
}
