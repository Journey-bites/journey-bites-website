import { getArticles } from '@/lib/nextApi';
import ArticlesContainer from '@/components/ArticlesContainer';

export default async function Content() {
  const hotArticles = await getArticles({ type: 'hot' });

  return (
    <div className='mb-9'>
      <ArticlesContainer articles={hotArticles} showBtn color='secondary' type='hot' />
    </div>
  );
}
