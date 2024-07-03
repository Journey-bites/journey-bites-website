import { TentTreeIcon, MapPinnedIcon } from 'lucide-react';
import LargeArticleCard from '@/components/article/LargeArticleCard';
import NoResults from '@/components/dashboard/NoResults';
import { getArticles, getCategories } from '@/lib/nextApi';
import { notFound } from 'next/navigation';

export default async function CategoryArticles({ params }: { params: { category: string } }) {
  const categories = await getCategories();
  const validCategory = categories.find((category) => category.path === `/${params.category}`);
  if (!validCategory) return notFound();

  const articles = await getArticles({ category: validCategory.name });

  return (
    <div>
      <section className='bg-primary-100 py-12 text-center'>
        <h2 className='flex items-center justify-center gap-3 font-semibold text-grey-400'>
          <MapPinnedIcon size={28} className='stroke-primary' />
          分類：{validCategory.name}
        </h2>
        <p className='mt-4 text-lg text-grey-300'>總共 {articles.length} 篇文章</p>
      </section>
      <section className='mx-auto mt-14 flex flex-col gap-6 px-6 lg:w-container'>
        {
          articles.length ? (
            articles.map((article) => (
              <LargeArticleCard key={article.id} article={article} showReadTime showCreator />
            ))
          ): (
            <NoResults title='此分類目前沒有文章' icon={TentTreeIcon} />
          )
        }
      </section>
    </div>
  );
}
