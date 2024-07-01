import { PartyPopperIcon, ThumbsUpIcon } from 'lucide-react';
import LargeArticleCard from '@/components/article/LargeArticleCard';
import { getArticles } from '@/lib/nextApi';

export default async function ArticlesPage({ searchParams }:
  {
    searchParams: { type?: 'hot' | 'new' | unknown }
  }) {
  const type = ['hot', 'new'].some((type) => type === searchParams.type) ? searchParams.type : 'hot';
  const articles = await getArticles({ type: type === 'hot' ? 'hot' : undefined });
  const isHotType = type === 'hot';
  // TODO: infinite scroll to get more articles
  return (
    <div>
      <section className='bg-primary-100 py-12'>
        <div className='mx-auto flex w-container items-center gap-4 text-grey-400'>
          {isHotType ? <PartyPopperIcon className='stroke-primary' size={28} /> : <ThumbsUpIcon className='stroke-primary' size={28} />}
          <h2 className='font-semibold'>{isHotType ? '熱門文章' : '最新文章'}</h2>
        </div>
      </section>
      <section className='mx-auto mt-14 flex flex-col gap-6 px-6 lg:w-container'>
        {articles.map((article) => (
          <LargeArticleCard key={article.id} article={article} showCreator showReadTime />
        ))}
      </section>
    </div>
  );
}
