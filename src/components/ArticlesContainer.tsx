import Link from 'next/link';
import { PartyPopper, ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Article } from '@/types/article';
import SmallArticleCard from '@/components/article/SmallArticleCard';

type ArticlesContainerProps = {
  type: 'hot' | 'new';
  color: 'primary' | 'secondary';
  articles: Article[]
  showBtn?: boolean,
}

export default async function ArticlesContainer({
  type,
  color,
  showBtn,
  articles
}: ArticlesContainerProps) {
  const isHotType = type === 'hot';

  return (
    <div className={cn('relative rounded-lg md:p-9 py-2 px-3', color === 'primary' ? 'bg-primary-100' : 'bg-secondary-100')}>
      <div className={cn('flex justify-center items-center gap-3 rounded-tl-lg md:border-b-10 md:border-r-10 md:border-white py-3 md:py-4 px-8 text-white absolute left-0 top-0', `bg-${color}`)}>
        {isHotType ? <PartyPopper className='size-5 md:size-6' /> : <ThumbsUp />}
        <h1 className='text-xl md:text-2xl'>{isHotType ? '熱門文章' : '最新文章'}</h1>
      </div>
      <div className='flex justify-end'>
        <Button asChild variant='outline' className={cn('rounded-lg px-4 py-2 md:px-5 md:py-3', {
            ['md:hidden']: !showBtn,
        })}>
          <Link href='/articles?type=hot'>查看更多</Link>
        </Button>
      </div>
      <div className={cn('mt-7 grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2', {
        ['md:mt-20']: !showBtn,
      })}>
        {articles.map((item) => (
          <SmallArticleCard key={item.id} article={item} />
        ))}
      </div>
    </div>
  );
}
