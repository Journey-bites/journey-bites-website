'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TentTreeIcon, BookHeartIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getArticlesLikedByUser } from '@/lib/authApi';
import { QUERY_KEY } from '@/constants';
import { OrderBy } from '@/types/enum';
import { sortDataByCreatedAt } from '@/lib/utils';
import TitleWithIcon from '@/components/dashboard/TitleWithIcon';
import NoResults from '@/components/dashboard/NoResults';
import LargeArticleCard from '@/components/article/LargeArticleCard';
import Loader from '@/components/custom/Loader';
import OrderBySelect from '@/components/article/OrderBySelect';

export default function FavoriteArticlesPage() {
  const [orderBy, setOrderBy] = useState(OrderBy.DESC);

  const { data: articles, isPending, error, isFetched } = useQuery({
    queryKey: [QUERY_KEY.userLikedArticles],
    queryFn: getArticlesLikedByUser,
    select: (data) => sortDataByCreatedAt(data, orderBy),
  });

  if (isPending) return <Loader />;
  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <TitleWithIcon title='我最愛的文章' icon={BookHeartIcon} />
      {isFetched && !articles?.length ? (
        <NoResults title='目前沒有喜歡的文章，趕緊去逛逛吧！' icon={TentTreeIcon}>
          <Link href='/articles?type=hot' className='text-primary-200 underline'>去逛逛熱門文章</Link>
        </NoResults>
      ) : (
        <>
          <div className='flex gap-4'>
            <OrderBySelect orderBy={orderBy} setOrderBy={setOrderBy} />
          </div>
          <p className='my-5 text-grey-300'>共 {articles?.length} 篇文章</p>
          <div className='flex flex-col gap-6'>
            {articles?.map((article) => (
              <LargeArticleCard key={article.id} article={article} showCreator showCreatedAt />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
